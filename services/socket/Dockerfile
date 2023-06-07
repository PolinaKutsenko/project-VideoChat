FROM node:18.15.0-alpine

RUN apk update
RUN apk upgrade
RUN apk add --no-cache git

RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm ci
COPY . /app

ENTRYPOINT ["npm", "run", "start"]
