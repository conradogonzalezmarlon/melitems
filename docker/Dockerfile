FROM node:18.17.1-alpine3.17

COPY . /root/melitems/

WORKDIR /root/melitems/

RUN yarn && \
    yarn build


FROM node:18.17.1-alpine3.17

WORKDIR /root/melitems/

COPY . /root/melitems/

EXPOSE 3000

ENTRYPOINT ["yarn", "start:prod"]
