FROM node:13-alpine

WORKDIR /app
COPY package*.json .env index.js ./
RUN npm i

CMD [ "node", "index.js" ]
