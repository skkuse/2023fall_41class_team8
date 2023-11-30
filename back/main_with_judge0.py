from flask import Flask, request, session, jsonify
import json
import os
import uuid
import subprocess
import time
import requests
app = Flask(__name__)

judge0_url = "https://exec.skew.ch/"
pattern_json_file_path = "./pattern_json"
patterns_json_file_path = "./patterns_json"
category_json_file_path = "./category_json"

def generate_uuid():
    return str(uuid.uuid4())
def request_to_judge0(code : str):
    request_json = { "source_code": code,
    "language_id": 62,
    "stdin": "Judge0",
    "number_of_runs" : 10,  # defalut : 1
    # "cpu_time_limit": null,
    # "cpu_extra_time": null,
    # "wall_time_limit": null,
    # "memory_limit": null,
    # "stack_limit": null,
    # "max_processes_and_or_threads": null,
    # "enable_network": null
    }
    result = requests.post(judge0_url+"submissions", json = request_json)
    print(result.text)
    return result.json()["token"]

def check_submission(token : str):
    result = requests.get(judge0_url+"submissions/"+token)
    print(result.text)
    return result
def delete_submission(token : str):
    result = requests.delete(judge0_url+"submissions/"+token)
    print(result.text)
    return result

def calculate_energy_and_carbon(cpu_time: float, memory: int):
    n_core = 1  # number of processor
    tdp = 12.5  # TDP(W): Core type: AMD EPYC 7702P 64-core processor, 200W for 64 cores. Our server has 4 cores.
    u_core = 1  # Usage of core(%): when cannot identify use 1 for value, [0,1] : 1 = 100%
    p_memory = memory * 0.0000003752  #  power consume per memory usage(W): 0.3725W/1GB memory usage
    pue = 1  # Power Usage Effectiveness(%), when cannot identify use 1 for value
    carbon_intensity = 0.41130 # CI(gCO2e/kWh): Use 2023 stat of S.Korea

    energy = time * 3600 * (n_core * tdp * u_core + p_memory) * pue * 0.001  # (kWh), Energy consumption when used for 1 hour 
    carbon_footprint = energy * carbon_intensity  # (gCO2e), CO2e Emission on 1h with energy source of S.Korea

    return {
        "energy": energy,
        "carbon_footprint": carbon_footprint
    }

@app.route("/runjava", methods=["POST"])
def runCode():
    code = request.get_data(as_text=True)
    token = request_to_judge0(code)
    while True:
        time.sleep(0.2)
        result = check_submission(token)
        if result.json()["status"]["id"]!=2:  # if Processing, continue
            if result.json()["status"]["id"]==3:  # Accepted
                cpu_time = result.json()["cpu_time"]
                memory = result.json()["memory"]
                calculation_result = calculate_energy_and_carbon(cpu_time, memory)

                result['energy'] = calculation_result['energy']
                result['carbon_footprint'] = calculation_result['carbon_footprint']
            break
    delete_submission(token)
    return result.text

@app.route("/patterns")
def get_patterns():
    with open(patterns_json_file_path, 'r') as file:
    	data = json.load(file)
    	
    	return data

@app.route("/pattern")
def get_pattern():
    id = request.args["id"]
    
    with open(pattern_json_file_path, 'r') as file:
    	data = json.load(file)
    	
    	return data[id]
    
#전달받은 카테고리 아이디로 카데고리값 전달
@app.route('/get_category_string', methods=['POST'])
def get_category_string():
    data = request.get_json()
    with open(patterns_json_file_path, 'r') as file:
    	categories = json.load(file)
        # 전달받은 카테고리 ID 확인
        category_id = data.get('category_id')

        # 카테고리 ID에 해당하는 문자열 반환
        category_string = categories.get(category_id, "해당하는 카테고리가 없습니다.")

    return jsonify({'category_string': category_string})

if __name__ == "__main__":
    app.run(debug=True)

