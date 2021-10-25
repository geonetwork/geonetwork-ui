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

You can override this URL with an ENV variable `${GN4_API_URL}`.
You can override this ENV from your docker entrypoint using the `assets/env.template.js`

```
# Set environment variable
export GN4_API_URL="https://gn4.georchestra/...";
# Replace variables in env.js
envsubst < assets/env.template.js > assets/env.js
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
