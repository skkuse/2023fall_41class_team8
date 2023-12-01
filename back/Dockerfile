FROM python:latest AS build-app

WORKDIR /src

COPY . /src

RUN pip install -r /src/requirements.txt

ENTRYPOINT [ "python3", "/src/main_with_judge0.py" ]

EXPOSE 5000