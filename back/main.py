from flask import Flask, request, session
import os
import uuid
import subprocess
import time

app = Flask(__name__)


def generate_uuid():
    return str(uuid.uuid4())


# file name에 .java포함해서 써야함
def create_java_file(code: str, filename: str, folder_name: str):
    path = os.path.join("./back/JavaSource", folder_name)
    try:
        os.mkdir(path)
    except:
        print("failed mkdir")
    path = os.path.join("./back/JavaSource", folder_name, filename)
    with open(path, "w") as file:
        file.write(code)


# file name에 .java포함해서 써야함
def compile_and_run_java(file_name: str, folder_name: str):
    path = os.path.join("./back/JavaSource", folder_name, file_name)

    # compile java
    compile_process = subprocess.Popen(
        ["javac", path], stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )
    compile_output, compile_error = compile_process.communicate()
    if compile_error:
        print(f"Compilation Error: {compile_error.decode('utf-8')}")
        return compile_error.decode("utf-8")

    start_time = time.time()
    # Run Java code
    run_process = subprocess.Popen(
        ["java", path], stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )
    run_output, run_error = run_process.communicate()
    end_time = time.time()

    if run_error:
        print("--------run error---------")
        print(run_error.decode("utf-8", errors="ignore"))
        print("------------------------")
        return run_error.decode("utf-8", errors="ignore")
    runtime = end_time - start_time
    return runtime


@app.route("/runjava", methods=["POST"])
def runCode():
    code = request.get_data(as_text=True)
    # if "request_id" in session:
    #     request_id = session["request_id"]
    # else:
    #     # generate new user_id and store
    #     request_id = generate_uuid()
    #     session["request_id"] = request_id
    #     print(f"process got request id of : {request_id}")
    #     print(f"new session for request : {request_id}")
    request_id = generate_uuid()
    create_java_file(code, "Main.java", request_id)
    result = compile_and_run_java("Main.java", request_id)
    if type(result) == str:
        return result, 500
    return f"runtime: {result}"


if __name__ == "__main__":
    app.run(debug=True)
