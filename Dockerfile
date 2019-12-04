FROM node:13-alpine

WORKDIR /app
COPY package*.json .env src ./
RUN npm i && npm run build

CMD [ "node", "build/index.js" ]
