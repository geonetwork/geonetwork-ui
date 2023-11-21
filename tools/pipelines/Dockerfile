FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY ./pipelines/register-es-pipelines.js ./
COPY ./package.json ./
COPY ./package-lock.json ./

ENV ES_HOST="http://elasticsearch:9200"
ENV RECORDS_INDEX="gn-records"

RUN npm ci

#ENTRYPOINT ["node", "./register-es-pipelines.js", "register", "--host", "echo $ES_HOST", "--records-index", "echo $RECORDS_INDEX"]
ENTRYPOINT node ./register-es-pipelines.js register --host $ES_HOST --records-index $RECORDS_INDEX
