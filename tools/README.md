# GeoNetwork-UI Tools

This directory contains various tools used in the development and deployment phases of GeoNetwork-UI.

## [`docker` folder](./docker)

Contains a generic Dockerfile that can be used for any applications provided by GeoNetwork-UI, as well as the corresponding entrypoing and NGINX configuration file.

## [`i18n` folder](./i18n)

Contains utilities related to translation files used in GeoNetwork-UI.

## [`pipelines` folder](./pipelines)

Contains utilities related to [registering pipelines on ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/ingest.html). Pipelines are used to preprocess records during the indexation process, thus
offering greater control over the values returned by ElasticSearch and giving an improved user experience when searching records.

A CLI is provided to let you register or clear GeoNetwork-UI-related pipelines on an ES instance. For example:

```shell
node pipelines/register-es-pipelines.js register --host=http://localhost:9200 --records-index=gn-records
```

A docker image can also be built to register the pipelines automatically in a docker environment:

```shell
npm run pipelines:docker-build
# once image is built, use it like so:
docker run --rm --env ES_HOST=http://localhost:9200 --env RECORDS_INDEX=gn-records --network host geonetwork/geonetwork-ui-tools-pipelines
```

## [`webcomponent` folder](./webcomponent)

Contains utilities related to Web Components provided by the GeoNetwork-UI project.

## Other tools

- `generate-api.sh`: regenerates API clients automatically from existing OpenAPI YAML files
- `make-archive.sh`: bundles directories in `dist` and names it appropriately for releases
- `print-docker-tag.sh`: outputs a docker tag based on the current git tag/branch
