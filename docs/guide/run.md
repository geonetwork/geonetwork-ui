---
outline: deep
---

# How to run GeoNetwork-UI applications

The following GeoNetwork-UI applications are available as docker images or ZIP archives:

- [Datahub](../apps/datahub)
- [Metadata Editor](../apps/editor)

## With docker

All docker images are named similarly: `geonetwork/geonetwork-ui-<application>`, and stored on Docker Hub: https://hub.docker.com/u/geonetwork

To run it on the 8080 port with a custom GN4 API url and proxy path, use:

```bash
$ docker run -p 8080:80 \
             -e GN4_API_URL=https://gn4.custom/geonetwork/srv/api \
             -e PROXY_PATH=/proxy?url= \
             geonetwork/geonetwork-ui-<application>
```

Notice how the `GN4_API_URL` and `PROXY_PATH` variables are used to override any values present in the app configuration file.
**This override will happen everytime the docker container is started.**

The application will be available on http://localhost:8080/application/.

### Specifying a custom configuration file

If the `GN4_API_URL` and `PROXY_PATH` environment variables are not enough and you want to specify a full configuration file,
you can do so like this:

```bash
# this assumes a file named `default.toml` is located in the /home/user/custom-conf directory:
$ docker run -p 8080:80 \
             -v /home/user/custom-conf:/conf \
             geonetwork/geonetwork-ui-<application>
```

If a file named `default.toml` is found in the `/conf` folder _of the app container_ at startup, it will be used by the application.

You can specify a different directory to look for the `default.toml` file using the `CONFIG_DIRECTORY_OVERRIDE` env variable, like so:

```bash
# this assumes a file named `default.toml` is located in the /home/user/custom-conf directory:
$ docker run -p 8080:80 \
             -v /home/user/custom-conf:/some/random/path \
             -e CONFIG_DIRECTORY_OVERRIDE=/some/random/path \
             geonetwork/geonetwork-ui-<application>
```

This can be useful when dealing with existing volumes having their own directory structure.

### Adding custom assets to the docker container

Any file found in the `/assets` folder _of the app container_ at startup will be copied along with the other assets already present. Existing assets with conflicting names will be
replaced. Directory structure in the `/assets` folder will be preserved.

For each image file present in the copied assets, a [preload link](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload) will be created in the `index.html` file of the application. This will help reducing the
time to first significant draw for new visitors, especially for header backgrounds and the like.

You can specify a different directory to look for the custom assets using the `ASSETS_DIRECTORY_OVERRIDE` env variable, like so:

```bash
# custom assets are located in the /home/user/my-assets directory:
$ docker run -p 8080:80 \
             -v /home/user/my-assets:/some/random/path \
             -e ASSETS_DIRECTORY_OVERRIDE=/some/random/path \
             geonetwork/geonetwork-ui-<application>
```

### Adding custom scripts when deploying an application

You can deploy custom executable "bash" scripts when deploying a container by setting the environment variable `CUSTOM_SCRIPTS_DIRECTORY` pointing to a mounted volume.

It can be used to deploy custom header by example.

```bash
$ docker run -p 8080:80 \
             -v /home/user/my-scripts:/some/random/path \
             -e CUSTOM_SCRIPTS_DIRECTORY=/some/random/path \
             geonetwork/geonetwork-ui-<application>
```

## From the ZIP archive

Each release of GeoNetwork-UI comes with ZIP archives of all applications: https://github.com/geonetwork/geonetwork-ui/releases

Download the application archive and simply serve its contents using an HTTP server like Apache or NGINX.

## Configuration

See the [configuration guide](./configure.md).

## Run an application in development mode

> For the following instructions, make sure you are using Node v18+ and that you ran `npm install` before anything else.

Executing:

```
npx nx serve <application>
```

will run the application in development mode on [localhost:4200](http://localhost:4200/).

## Proxy

GeoNetwork-UI applications can use a reverse proxy for querying WMS and WFS capabilities (thus working around CORS limitations).

By default it is disabled in order not to hide those issues to the user.

You can specify a custom proxy path using the `proxy_path` setting in the `[global]` section of the app configuration file. The proxy is disabled when
no path is defined.

Please note that during development a proxy is provided by webpack on the `/dev-proxy?` url path. **It is
not used by default in development mode, you will have to set it up yourself.**

## Building applications

### Building without Docker

You can build applications using the following command:

```shell script
npm install
npx nx build datahub
```

The build artifact will be stored in the `dist/apps/<application>` directory, that can be deployed on a common webserver. Use the `--prod` flag for a production build.

The build also includes the app configuration file (`dist/apps/<application>/assets/configuration`). Do not modify the configuration file here, as it is overwritten on each build.

### Building with Docker

You can build a docker image of the Datahub application like so:

```bash
npm install
npx nx run datahub:docker-build
```

This will build a docker image with the tag `geonetwork/geonetwork-ui-datahub`.
