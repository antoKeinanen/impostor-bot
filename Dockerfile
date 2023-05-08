FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY dist ./dist

RUN npm install

CMD ["node", "dist/index.js"]
