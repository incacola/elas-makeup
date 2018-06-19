FROM node:10-alpine
LABEL maintainer="felipe.gil.dev@gmail.com"
RUN apk add --update tini && mkdir -p /usr/src/app 
WORKDIR /usr/src/app
COPY package.json package.json 
RUN npm install
copy . .
EXPOSE 3000
CMD ["tini","--","node","./bin/www"]

