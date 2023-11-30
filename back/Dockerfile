FROM python:latest AS build-app

WORKDIR /src

COPY . /src

RUN pip install -r /src/requirements.txt

EXPOSE 5000