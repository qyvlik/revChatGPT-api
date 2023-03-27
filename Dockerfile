FROM node:18

WORKDIR /home/www/revChatGPT-api

COPY package.json .

RUN npm install

COPY . .

EXPOSE 7777

CMD [ "node", "src/main.js" ]
