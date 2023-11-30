FROM node:latest AS build-app

WORKDIR /website

COPY package.json package.json

COPY tsconfig.json tsconfig.json

# COPY package-lock.json package-lock.json

COPY ./public/ ./public/

COPY ./src/ ./src/

RUN npm install --legacy-peer-deps

RUN npm run build

# RUN npm install -g serve

# RUN serve -s build

FROM nginx:alpine

COPY --from=build-app /website/build/ /usr/share/nginx/html

EXPOSE 80