from flask import Flask, request, session
import os
import uuid
import subprocess
import time
import requests
app = Flask(__name__)

judge0_url = "https://exec.skew.ch/"
pattern_json_file_path = "./pattern_json"
patterns_json_file_path = "./patterns_json"

def generate_uuid():
    return str(uuid.uuid4())
def request_to_judge0(code : str):
    request_json = { "source_code": code,
    "language_id": 62,
    "stdin": "Judge0",
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
    
@app.route("/runjava", methods=["POST"])
def runCode():
    code = request.get_data(as_text=True)
    token = request_to_judge0(code)
    while True:
        time.sleep(0.2)
        result = check_submission(token)
        if result.json()["status"]["id"]!=2:
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
    

if __name__ == "__main__":
    app.run(debug=True)

