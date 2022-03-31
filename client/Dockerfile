# pull base image
FROM node:17-alpine3.12

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json ./

RUN npm set timeout=100000

RUN npm install

RUN npm install react-scripts@5.0.0 serve@13.0.2 -g --unsafe-perm

COPY . /app

EXPOSE 4000

CMD [ "npm", "start" ]

# # install global packages
# ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
# ENV PATH /home/node/.npm-global/bin:$PATH
# RUN npm i -g --unsafe-perm serve@13.0.2

# WORKDIR /app

# COPY package.json /app

# RUN npm install

# RUN npm i -g npm-check

# COPY . /app

# EXPOSE 4000

# CMD [ "npm", "run", "start" ]