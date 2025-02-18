![Workflow status](https://github.com/geonetwork/geonetwork-ui/actions/workflows/checks.yml/badge.svg) &nbsp;&nbsp; ![Workflow status](https://github.com/geonetwork/geonetwork-ui/actions/workflows/snyk-security.yml/badge.svg) &nbsp;&nbsp; ![Workflow status](https://github.com/geonetwork/geonetwork-ui/actions/workflows/artifacts.yml/badge.svg) &nbsp;&nbsp; [![Coverage Status](https://coveralls.io/repos/github/geonetwork/geonetwork-ui/badge.svg?branch=main)](https://coveralls.io/github/geonetwork/geonetwork-ui?branch=main)

# GeoNetwork UI

GeoNetwork-UI provides several applications to improve the user experience of your GeoNetwork catalog.

It also provides Web Components to embed various parts of your data catalog in third party websites.

End users are [invited](https://discourse.osgeo.org/t/about-the-geonetwork-ui-category/59280) to join us on the GeoNetwork-UI forum on OsGeo Discourse: https://discourse.osgeo.org/c/geonetwork/ui

Developers should check out the [GitHub discussions](https://github.com/geonetwork/geonetwork-ui/discussions).

To learn more about the project, visit the [GeoNetwork-UI website](https://geonetwork.github.io/geonetwork-ui/main/docs/)

## Getting started

Install first GeoNetwork 4 [from source](https://geonetwork-opensource.org/manuals/4.0.x/eng/users/install-guide/installing-from-source-code.html#building-running)
or using [docker](https://github.com/geonetwork/docker-geonetwork/tree/master/4.0.1).

Install [Node](https://nodejs.org/): using an LTS is recommended, the minimum required version is 14.17.0. Using [nvm](https://github.com/nvm-sh/nvm) makes this much simpler.

Run `npm install` to fetch all dependencies of the project.

Run `npm start` to start the datahub app in a dev server.

Once started the application is available at `http://localhost:4200/`.

[The contributing guide](CONTRIBUTING.md) explains the structure of the project and how to work with it.

If you would like to contribute code, please follow our [style guide](STYLEGUIDE.md).

[Storybook](https://storybook.js.org) is a tool for exploring individual features of the application in an interactive way.
You can start it with `npm run storybook`.

## Live demo

You can either try complete applications or showcases of components using the following links:

- [Storybook of UI components](https://geonetwork.github.io/geonetwork-ui/main/storybook/demo/)
- [Metadata Converter app](https://geonetwork.github.io/geonetwork-ui/main/apps/metadata-converter/)
- [Web Components demo](https://geonetwork.github.io/geonetwork-ui/main/demo/webcomponents/)

## More information

### Running GeoNetwork UI applications

To run a specific application using a development server, use:

```shell script
npx nx serve (app_name)
```

And navigate to `http://localhost:4200/`.

If you're using the standard dev configuration then you should head to the [support-services](support-services) folder and
run `docker compose up -d` to have the required support services running locally (such as GeoNetwork).

Otherwise, you can adjust the GeoNetwork instance used as a backend in the [proxy-config.js](proxy-config.js) file like so:

```diff
@@ -1,6 +1,6 @@
 module.exports = {
   '/geonetwork': {
-    target: 'http://localhost:8080',
+    target: 'https://my.catalogue.org',
     secure: true,
```

### Build GeoNetwork-UI applications

To build a specific application, use:

```shell script
npx nx build (app_name)
```

The build artifacts will be stored in the `dist/` directory. Note: this always produces a production build.

### Tests

#### Unit tests

Run `npm test` to execute the affected unit tests via Jest.
Affected code is compared to origin/main.

You can test

- affected code
- all modules
- specific lib or app
- specific test suite

```shell script
npm run test
npm run test:all
npx nx test (lib_name)
npx nx test --test-match=/data/dev/gn/ui/libs/common/src/lib/services/bootstrap.service.spec.ts
```

#### End-to-end-tests

##### To run the tests with the interface:

Start docker from 'support-services', and then in the project root folder :

```shell script
npx nx e2e (app_name) --watch
```

Then select the file(s) you want to test in the interface.

##### To run the tests without interface :

Start docker from 'support-services', and then in the project root folder :

--> ALl tests :

```shell script
npx nx e2e  (app_name)
```

### Application Configuration

GeoNetwork UI provides a standard way of configuring applications using the [conf/default.toml](conf/default.toml) file.

This file can be used to:

- customize the URL used to reach the GeoNetwork 4 API
- indicate an optional proxy path to the application
- indicate a metadata language to be used when searching
- customize the theme used in the application (colors, fonts...)
- define custom translations for the different languages

Please refer to the embedded comments in the file for more information.

> Note: as of now, only the Datahub application relies on this file

**Important**: In order for the search to be efficient, please indicate the `metadata_language` of the queried catalog.

### Internationalization

Every label visible to the user in the different applications must be translated. All labels are identified using keys, for example:

- `table.object.count`
- `results.layout.selectOne`
- `datafeeder.summarizePage.illustration`
- `catalog.title.welcome.html`

A repository of _all translations_ is available in the [translations](translations) folder. **These are the
translations used in the different applications of the geonetwork-ui project.**

> Please note that **only the translations whose key end in `.html`** can accept HTML markup.

## To document

How to build and run web components

- Explain unit test setup & architecture with jest
