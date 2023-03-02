# Data Platform API

This is a NestJs backend to serve a REST API for geonetwork data platform.

# Setup

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

If the user is not superuser, then you need to add an extension within the database:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

## API

Run `nx serve data-platform`

This will generate the database and run the API on developement mode.
A swagger is available at http://localhost:3333/api/

# Contributing

## Generate a new resource

```
nx g @nrwl/nest:resource dataviz --project=data-platform --directory=app --type=rest --crud=true
```
