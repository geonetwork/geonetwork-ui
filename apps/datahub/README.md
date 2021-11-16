# Datahub

UI of the web application `datahub`.

`datahub` is an application to provide a default, pure and simple UI for metadata and dataset search.

Inspire by Opendata catalogs (CKAN, Opendatasoft), the Hub will host geo and non-geo dataset. It will provide dataviz tool and focuses the experience on the dataset instead of on the metadata.

## Dev

```
ng serve datahub
```

will run `datahub` as an Angular application available on localhost:4200.

## Configuration

### API url

By default it uses GN4 API `/geonetwork/srv/api`.

You can override this URL with the ENV variable `${GN4_API_URL}`.

### Proxy

The Datahub app can use a reverse proxy for querying WMS and WFS capabilities (thus working around
CORS limitations).

By default it is disabled in order not to hide those issues to the user.

You can specify a custom proxy path using the ENV variable `${PROXY_PATH}`. The proxy is disabled when
no path is defined.

Please note that during development a proxy is provided by webpack on the `/dev-proxy?` url path. **It is
not used by default in the Datahub app, you will have to set it up yourself.**

### Applying configuration

Once you have set up the above parameters using environment variables, you can then automatically
generate an `assets/env.js` file using the following commands from the app directory:

```
# Set environment variable
export GN4_API_URL="https://my.gn4.instance/geonetwork/srv/api"
export PROXY_PATH="https://my.gn4.instance/proxy?url="
# Replace variables in env.js
envsubst < src/assets/env.template.js > src/assets/env.js
```

## Using with Docker

You can build a docker image of the Datahub application like so:

```bash
$ nx run datahub:docker-build --tag=geonetwork-ui/datahub
```

This will build a docker image with the tag `geonetwork-ui/datahub:latest`.

To run it on the 8080 port with a custom GN4 API url, use:

```bash
$ docker run -p 8080:80 -e GN4_API_URL=https://gn4.custom/geonetwork/srv/api geonetwork-ui/datahub
```

The application will be available on http://localhost:8080/datahub/.
