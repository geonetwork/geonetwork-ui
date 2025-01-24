# Support services

This folder contains a docker composition which can simulate an actual GeoNetwork 4 instance to be used
for testing and development on GeoNetwork-UI.

The instance is already prepared with a few sample records and offers a reproducible development and testing environment.

## Requirements

[Docker Compose version 2+](https://docs.docker.com/compose/)

## Start

```shell
$ docker compose up -d
```

On the first run, the database will be populated with the settings and sample records.

A quicker startup can be obtained by only targeting the `init` service:

```shell
$ docker compose up init -d
```

To clear the volumes and let the database repopulate itself from scratch, run:

```shell
$ docker compose down -v
```

## Specifying a different GeoNetwork version

By default, the version of GeoNetwork used as a backend is 4.2.2. You can specify another version like so:

```shell
$ GEONETWORK_VERSION=4.2.5 docker compose up -d
```

## Access services

GeoNetwork can be accessed on http://localhost:8080/geonetwork.

Kibana can be used to inspect the ElasticSearch index and experiment with requests; it is accessible on http://localhost:5601.

## Regenerate the initial database state

Running the following command will extract the current state of the database and store it as the new initial state:

```shell
$ docker compose exec database pg_dump -U geonetwork -d geonetwork -Fp > docker-entrypoint-initdb.d/dump.sql
```

Please keep in mind that the initial state of the database should be as lightweight as possible and that changing it might break
integration tests relying on it.
