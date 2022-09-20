# Datafeeder

UI of the web application `datafeeder`.

`datafeeder` is for now a georchestra web application. Its purpose is to ease data and metadata publication.

Basically, it invites the user to upload a SHP file and ask few questions about the data.

At the end, the data is published in GeoServer, and an INSPIRE compliant metadata is published in GeoNetwork.

## Dev

```
npm start datafeeder
```

will run `datafeeder` as an Angular application available on localhost:4200.

## Configuration

### API url

By default the api url is `/datafeeder`.

A proxy configuration in dev mode redirects to `localhost:8080/import`

You can override this URL with an ENV variable `${DATAFEEDER_API_URL}`.
You can override this ENV from your docker entrypoint using the `assets/env.template.js`

```
# Set environment variable
export DATAFEEDER_API_URL="/my-datafeeder";
# Replace variables in env.js
envsubst < assets/env.template.js > assets/env.js
```

### Other settings

Other settings are fetched as a second step from the API `/datafeeder/config/frontend`

## Building with Docker

You can build a docker image of the Datafeeder application like so:

```bash
$ npx nx run datafeeder:docker-build
```

This will build a docker image with the tag `geonetwork/geonetwork-ui-datafeeder`.
