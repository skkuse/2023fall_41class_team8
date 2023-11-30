from flask import Flask, request, session, jsonify
import json
import os
import uuid
import threading
import time
import requests
import queue
from queue import Queue

app = Flask(__name__)

judge0_url = "https://exec.skew.ch/"
pattern_json_file_path = "./pattern_json"
patterns_json_file_path = "./patterns_json"
category_json_file_path = "./category_json"


def generate_uuid():
    return str(uuid.uuid4())


def request_to_judge0(code: str, stdin: str):
    request_json = {
        "source_code": code,
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
    result = requests.post(judge0_url + "submissions", json=request_json)
    print(result.text)
    return result.json()["token"]


def check_submission(token: str):
    result = requests.get(judge0_url + "submissions/" + token)
    print(result.text)
    return result


def delete_submission(token: str):
    result = requests.delete(judge0_url + "submissions/" + token)
    print(result.text)
    return result


def interact_judge0(code: str, stdin: str | None, output_queue: queue):
    token = request_to_judge0(code, stdin)
    while True:
        time.sleep(0.2)
        result = check_submission(token)
        if result.json()["status"]["id"] != 2:
            break
    delete_submission(token)
    output_queue.put(result)


running_judge0_IP = list()
output_queue_dict = dict()


@app.route("/api/runjava", methods=["POST"])
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
