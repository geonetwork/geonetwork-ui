# Data Platform API

This is a NestJs backend to serve a REST API for geonetwork data platform.

# Dev environment

## Database

Create a Postgres database which to belongs to a user.
Default connexion params are:

```js
type: 'postgres',
host: 'localhost',
port: 5432,
username: 'geonetwork',
password: 'geonetwork',
database: 'gn-data-platform',
```

You can change database settings by editing the project `.env` file.

If the user is not superuser, then you need to add an extension within the database:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

## Run

Run `nx serve data-platform`

This will generate the database and run the API on developement mode.
A swagger is available at http://localhost:3333/api/

# Docker

## Build

Build the docker image with

```shell
nx run data-platform:docker-build
```

## Run

Prerequisites: You must have a database reachable from your docker network.

Run the docker image with database configuration

```shell
docker run \
  -e DB_HOST=db \
  -e DB_PORT=55432 \
  -e DB_USER=geonetwork \
  -e DB_PASSWORD=geonetwork \
  -e DB_DATABASE=gn-data-platform \
  -e DB_SCHEMA=public \
  geonetwork/geonetwork-ui-data-platform
```

# Contributing

## Generate a new resource

```
nx g @nx/nest:resource dataviz --project=data-platform --directory=app --type=rest --crud=true
```

## Generate Angular API client

1. Run http://localhost:3333/api-json and copy the content in `libs/data-access/gn-data-platform/spec.json`
2. `npm run generate-api -- gn-data-platform json`
