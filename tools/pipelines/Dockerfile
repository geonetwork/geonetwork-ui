FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY ./pipelines/register-es-pipelines.js ./
COPY ./package.json ./
COPY ./package-lock.json ./

ENV ES_HOST="http://elasticsearch:9200"
ENV ES_USERNAME=""
ENV ES_PASSWORD=""
ENV RECORDS_INDEX="gn-records"

RUN npm ci

#ENTRYPOINT ["node", "./register-es-pipelines.js", "register", "--host", "echo $ES_HOST", "--records-index", "echo $RECORDS_INDEX"]
ENTRYPOINT node ./register-es-pipelines.js register --host $ES_HOST --records-index $RECORDS_INDEX --username $ES_USERNAME --password $ES_PASSWORD

# OCI image labels (https://github.com/opencontainers/image-spec/blob/main/annotations.md)
LABEL org.opencontainers.image.title="GeoNetwork-UI - Elasticsearch pipelines"
LABEL org.opencontainers.image.description="Registers the Elasticsearch ingest pipelines used by GeoNetwork-UI"
LABEL org.opencontainers.image.source="https://github.com/geonetwork/geonetwork-ui"
LABEL org.opencontainers.image.url="https://github.com/geonetwork/geonetwork-ui"
LABEL org.opencontainers.image.documentation="https://geonetwork.github.io/geonetwork-ui"
LABEL org.opencontainers.image.vendor="GeoNetwork"
LABEL org.opencontainers.image.licenses="GPL-2.0"
