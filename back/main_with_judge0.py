from flask import Flask, request
import json
import threading
import time
import requests
import queue
from queue import Queue
import base64

app = Flask(__name__)

# Judge0 API URL
judge0_url = "http://judge:2358/"

# 패턴 리스트와 개별 패턴 정보를 저장하는 JSON 파일 경로
pattern_list_json_file_path = "./pattern_list.json"
patterns_json_file_path = "./patterns.json"

def request_to_judge0(code: str, stdin: str):
    request_json = {
        # Judge0가 UTF-8로 인코딩을 할 수 없을 경우 문제를 발생시키므로 데이터를 송수신할때는 base64로 인코딩하여 사용
        "source_code": base64.b64encode(bytes(code, 'utf-8')).decode('utf-8'),
        "language_id": 62,
        "stdin": stdin,
        "number_of_runs": 10,
        # "cpu_time_limit": null,
        # "cpu_extra_time": null,
        # "wall_time_limit": null,
        # "memory_limit": null,
        # "stack_limit": null,
        # "max_processes_and_or_threads": null,
        # "enable_network": null
    }
    result = requests.post(judge0_url + "submissions", json=request_json, params={"base64_encoded": "true"})
    return result.json()["token"]

# Judge0에게 결과를 요청
def check_submission(token: str):
    result = requests.get(
        judge0_url + "submissions/" + token,
        params={
            "base64_encoded": "true",
            "fields": "stdout,time,memory,stderr,token,compile_output,message,status,wall_time",
        },
    )
    #    print(result.text)
    return result

# 데이터가 쌓이지 않도록 Judge0에게 삭제 요청
def delete_submission(token: str):
    result = requests.delete(judge0_url + "submissions/" + token)
    return result

# base64로 인코딩된 문자열을 디코딩
def decode_base64(data):
    return "".join([base64.b64decode(t).decode("utf-8") for t in data.split("\n")])


def interact_judge0(code: str, stdin: str | None, output_queue: queue):
    # Judge0에게 코드 실행을 요청하고 접근 토큰을 받음
    token = request_to_judge0(code, stdin)
    while True:
        # 주기적으로 Judge0에게 결과를 요청
        time.sleep(0.2)
        result = check_submission(token)
        id = result.json()["status"]["id"]
        if id != 2 and id != 1:
            break
    delete_submission(token)
    # 6: 컴파일 에러
    if(result.json()["status"]["id"] == 6):
        return_result = dict()
        return_result["result"] = "failure"
        return_result["err_type"] = "compilation"
        return_result["error"] = decode_base64(result.json()["compile_output"])
        output_queue.put(return_result)
        return
    # 11: 런타임 에러
    if(result.json()["status"]["id"] == 11):
        return_result = dict()
        return_result["result"] = "failure"
        return_result["err_type"] = "runtime"
        return_result["error"] = decode_base64(result.json()["stderr"])
        output_queue.put(return_result)
        return
    # 3: 사용 가능 자원 한도 초과
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
    return_result["time"] = result.json()["wall_time"]
    return_result["energy"] = calculation_result["energy"]
    return_result["carbon"] = calculation_result["carbon_footprint"]
    return_result["result"] = "success"
    print(f"thread {threading.get_ident()} done")
    output_queue.put(return_result)

# 에너지와 탄소 발자국을 계산
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

# 코드를 실행하고 결과를 반환
@app.route("/api/runjava", methods=["POST"])
def runCode():
    global output_queue_dict
    data = request.get_json()
    code = data["code"]
    stdin = data["stdin"]
    ip = None
    if request.headers.getlist("X-Forwarded-For"):
        ip = request.headers.getlist("X-Forwarded-For")[0]
    else:
        ip = request.remote_addr
    # 동일 IP에서 동시에 실행되는 것을 방지
    if ip in running_judge0_IP:
        return 401
    output_queue_dict[ip] = Queue()
    # 새 스레드에서 코드 실행 완료를 감지
    user_thread = threading.Thread(
        target=interact_judge0,
        args=(code, stdin, output_queue_dict[ip]),
    )
    user_thread.daemon = True
    user_thread.start()
    # 보낸 IP를 저장
    running_judge0_IP.append(ip)
    result = output_queue_dict[ip].get()
    running_judge0_IP.remove(ip)
    del output_queue_dict[ip]
    return json.dumps(result)

# 패턴 리스트를 가져옴
@app.route("/api/patterns", methods=["GET"])
def getPatternList():
    with open(pattern_list_json_file_path, "r") as file:
        data = json.load(file)
    return json.dumps(data)

# 개별 패턴 정보를 가져옴
@app.route("/api/pattern", methods=["GET"])
def getPattern():
    # Query String으로 id를 받음
    id = request.args.get("id")
    with open(patterns_json_file_path, "r") as file:
        data = json.load(file)
    # id가 없으면 404 반환
    if(id not in data):
        return app.response_class(status=404)
    return app.response_class(response=json.dumps(data[id]), status=200, mimetype='application/json')

if __name__ == "__main__":
    app.run(host="0.0.0.0")
