# pull base image
FROM node:17-alpine3.12

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json ./

RUN npm set timeout=100000

RUN npm install

RUN npm install knex@1.0.4 koa@2.13.4 -g --unsafe-perm

COPY . /app

EXPOSE 3000

CMD [ "npm", "run", "start" ]
