FROM node:alpine
WORKDIR /app
COPY package.json /app/package.json

RUN npm install

copy data.js /app/
copy makeup.json /app/

CMD ['npm','start']