FROM node:18.17.1-alpine3.17 as trasnpiledApi
WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn

COPY . .
RUN yarn build

EXPOSE 3000
ENTRYPOINT ["yarn", "start:prod"]
