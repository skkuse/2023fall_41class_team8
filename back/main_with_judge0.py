from flask import Flask, request, session, jsonify, Response
from flask_cors import CORS, cross_origin
import json
import os
import uuid
import threading
import time
import requests
import queue
from queue import Queue
import base64

app = Flask(__name__)

judge0_url = "https://exec.skew.ch/"
pattern_json_file_path = "./pattern_json"
patterns_json_file_path = "./patterns_json"
category_json_file_path = "./category_json"


def generate_uuid():
    return str(uuid.uuid4())


def request_to_judge0(code: str, stdin: str):
    request_json = {
        "source_code": base64.b64encode(bytes(code, 'utf-8')).decode('utf-8'),
        "language_id": 62,
        "stdin": stdin,
        # "cpu_time_limit": null,
        # "cpu_extra_time": null,
        # "wall_time_limit": null,
        # "memory_limit": null,
        # "stack_limit": null,
        # "max_processes_and_or_threads": null,
        # "enable_network": null
    }
    result = requests.post(judge0_url + "submissions", json=request_json, params={"base64_encoded": "true"})
    print(result.text)
    return result.json()["token"]


def check_submission(token: str):
    result = requests.get(judge0_url + "submissions/" + token, params={"base64_encoded": "true"})
    print(result.text)
    return result


def delete_submission(token: str):
    result = requests.delete(judge0_url + "submissions/" + token)
    print(result.text)
    return result

def decode_base64(data):
    return "\n".join([base64.b64decode(t).decode('utf-8') for t in data.split("\n")])

def interact_judge0(code: str, stdin: str | None, output_queue: queue):
    token = request_to_judge0(code, stdin)
    while True:
        time.sleep(0.2)
        result = check_submission(token)
        if result.json()["status"]["id"] != 2:
            break
    delete_submission(token)
    if(result.json()["status"]["id"] == 6):
        return_result = dict()
        return_result["result"] = "failure"
        return_result["err_type"] = "compilation"
        return_result["error"] = decode_base64(result.json()["compile_output"])
        output_queue.put(return_result)
        return
    if(result.json()["status"]["id"] == 11):
        return_result = dict()
        return_result["result"] = "failure"
        return_result["err_type"] = "runtime"
        return_result["error"] = decode_base64(result.json()["stderr"])
        output_queue.put(return_result)
        return
    if(result.json()["status"]["id"] != 3):
        return_result = dict()
        return_result["result"] = "failure"
        return_result["err_type"] = "limited"
        output_queue.put(return_result)
        return
    cpu_time = result.json()["time"]
    memory = result.json()["memory"]
    calculation_result = calculate_energy_and_carbon(cpu_time, memory)
    return_result = dict()
    return_result["time"] = cpu_time
    return_result["energy"] = calculation_result["energy"]
    return_result["carbon"] = calculation_result["carbon_footprint"]
    return_result["result"] = "success"
    output_queue.put(return_result)


def calculate_energy_and_carbon(cpu_time: float, memory: int):
    n_core = int(1)  # number of processor
    tdp = 12.5  # TDP(W): Core type: AMD EPYC 7702P 64-core processor, 200W for 64 cores. Our server has 4 cores.
    u_core = int(
        1
    )  # Usage of core(%): when cannot identify use 1 for value, [0,1] : 1 = 100%
    p_memory = (
        memory * 0.0000003752
    )  #  power consume per memory usage(W): 0.3725W/1GB memory usage
    pue = int(1)  # Power Usage Effectiveness(%), when cannot identify use 1 for value
    carbon_intensity = 0.41130  # CI(gCO2e/kWh): Use 2023 stat of S.Korea

    energy = (
        float(cpu_time) * int(3600) * (n_core * tdp * u_core + p_memory) * pue * 0.001
    )  # (kWh), Energy consumption when used for 1 hour
    carbon_footprint = (
        energy * carbon_intensity
    )  # (gCO2e), CO2e Emission on 1h with energy source of S.Korea

    return {"energy": energy, "carbon_footprint": carbon_footprint}


running_judge0_IP = list()
output_queue_dict = dict()


@app.route("/api/runjava", methods=["POST"])
@cross_origin()
def runCode():
    global output_queue_dict
    data = request.get_json()
    code = data["code"]
    stdin = data["stdin"]
    if request.remote_addr in running_judge0_IP:
        return 401
    output_queue_dict[request.remote_addr] = Queue()
    user_thread = threading.Thread(
        target=interact_judge0,
        args=(code, stdin, output_queue_dict[request.remote_addr]),
    )
    user_thread.daemon = True
    user_thread.start()
    running_judge0_IP.append(request.remote_addr)
    result = output_queue_dict[request.remote_addr].get()
    running_judge0_IP.remove(request.remote_addr)
    print(result)
    print(type(result))
    return json.dumps(result)


# @app.route("/patterns")
# def get_patterns():
#     with open(patterns_json_file_path, 'r') as file:
#         data = json.load(file)

#     	return data

# @app.route("/pattern")
# def get_pattern():
#     id = request.args["id"]

#     with open(pattern_json_file_path, 'r') as file:
#     	data = json.load(file)

#     	return data[id]

# #전달받은 카테고리 아이디로 카데고리값 전달
# @app.route('/get_category_string', methods=['POST'])
# def get_category_string():
#     data = request.get_json()
#     with open(patterns_json_file_path, 'r') as file:
#     	categories = json.load(file)
#         # 전달받은 카테고리 ID 확인
#         category_id = data.get('category_id')

#         # 카테고리 ID에 해당하는 문자열 반환
#         category_string = categories.get(category_id, "해당하는 카테고리가 없습니다.")

#     return jsonify({'category_string': category_string})

if __name__ == "__main__":
    app.run(debug=True)
