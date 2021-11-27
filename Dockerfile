FROM node:alpine3.14

WORKDIR /code

COPY package.json /code

RUN npm install

ADD ./ /code

#RUN npm run typeorm migration:run