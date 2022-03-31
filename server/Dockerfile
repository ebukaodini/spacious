# pull base image
FROM node:17-alpine3.12

# install global packages
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i -g --unsafe-perm knex@1.0.4 koa@2.13.4

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . /app

EXPOSE 3000

CMD [ "npm", "run", "start" ]