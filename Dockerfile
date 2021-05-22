FROM node:10

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

ENV HOST 0.0.0.0

CMD [ "npm", "run", "dev" ]