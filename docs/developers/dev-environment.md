---
outline: deep
---

# How to set up a development environment

This guide will help you set up the most appropriate development environment for your needs and objectives.

## Overview

A typical development environment on GeoNetwork-UI looks like this:

- All **backend services** (GeoNetwork, ElasticSearch, database...) are run using the `support-services` docker composition
- The **GeoNetwork-UI application** in development is run using `nx serve`

## Backend services

The easiest way to have backend services running is to head to the [support-services](https://github.com/geonetwork/geonetwork-ui/tree/main/support-services) folder and
run

```shell
$ docker compose up -d
```

to have all the required support services running locally (such as GeoNetwork).

Alternatively, you can also adjust the GeoNetwork instance used as a backend in the [proxy-config.js](https://github.com/geonetwork/geonetwork-ui/blob/main/proxy-config.js) file like so:

```diff
@@ -1,6 +1,6 @@
 module.exports = {
   '/geonetwork': {
-    target: 'http://localhost:8080',
+    target: 'https://my.catalogue.org',
     secure: true,
```

### Specifying a different GeoNetwork version

By default, the version of GeoNetwork used as a backend is 4.2.2. You can specify another version like so:

```shell
$ GEONETWORK_VERSION=4.2.5 docker compose up -d
```

### Remote debugging of GeoNetwork

When using an IDE that supports Java remote debugging (e.g. IntelliJ IDEA), it is possible to connect to the running GeoNetwork instance by creating a "Remote JVM Debug" configuration pointing on the `5005` port; This can be done in IntelliJ like so:

1. Open the "Edit Configurations" dialog  
   ![intellij-edit-configs.png](..%2Fassets%2Fintellij-edit-configs.png)

2. Create a new "Remote JVM Debug" configuration  
   ![intellij-create-debug-config.png](..%2Fassets%2Fintellij-create-debug-config.png)

3. Set the port to `5005`  
   ![intellij-remote-debug.png](..%2Fassets%2Fintellij-remote-debug.png)

Then, the remote debugger will be able to attach to GeoNetwork once it's running and you will be able to create breakpoints and inspect the running code.

## GeoNetwork-UI code

### Applications

When working on a GeoNetwork-UI application, you can start it in development mode by running:

```shell
$ npx nx serve <app-name>
# <app-name> is e.g. datahub or metadata-editor
```

The application is then available at http://localhost:4200.

Any changes to the code will be recompiled immediately and the browser will refresh automatically.

### Smart components & services

When working on smart components & services (usually sitting in `feature` libs), it might not be necessary to
start the whole stack of backend services and GeoNetwork-UI application from the start.

You can most likely simply **iterate over unit tests** to achieve the desired result. Starting the application can be done at a later stage for verification
purposes.

### Presentation components

Presentation components are typically very encapsulated, and mainly rely on inputs without any complex dependencies.

As such, the quickest and easiest way to develop presentation components is often simply to rely on [Storybook](https://storybook.js.org) which offers:

- Automatic hot reloading of the component
- Many options for adjusting inputs and controlling outputs
- Isolated rendering of the component

To start Storybook, run:

```shell
$ npm run storybook
```

For a guide on how to write Angular component stories, see: https://storybook.js.org/docs/angular/writing-stories/introduction

### Users

For development purposes, three users have been created :

- username : admin, password : admin
- username: johndoe, password: p4ssworD\_
- username: barbie, password: p4ssworD\_
