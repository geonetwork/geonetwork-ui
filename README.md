![Workflow status](https://github.com/geonetwork/geonetwork-ui/workflows/Build/badge.svg) &nbsp;&nbsp; [![Coverage Status](https://coveralls.io/repos/github/geonetwork/geonetwork-ui/badge.svg?branch=main)](https://coveralls.io/github/geonetwork/geonetwork-ui?branch=main)

# GeoNetwork UI

GeoNetwork UI is a suite of Applications made to provide a modern facade to your GeoNetwork 4 catalog.

It also provides Web Components to embed various parts of your data catalog in third party websites.

## Documentation

To check out docs, visit [geonetwork-ui website](https://geonetwork.github.io/geonetwork-ui/main/docs/)

## Requirements

- GeoNetwork version 4.2.2
- ElasticSearch version 7.11+

:warning: A bug currently in GeoNetwork 4.2.2 prevents the organizations of showing up correctly in the Datahub application.

As a temporary workaround, the following change is necessary in GeoNetwork data directory:

```diff
diff --git a/web/src/main/webResources/WEB-INF/data/config/index/records.json b/web/src/main/webResources/WEB-INF/data/config/index/records.json
index 1d7e499af7..78e682e3db 100644
--- a/web/src/main/webResources/WEB-INF/data/config/index/records.json
+++ b/web/src/main/webResources/WEB-INF/data/config/index/records.json
@@ -1317,7 +1317,7 @@
           "mapping": {
             "type": "nested",
             "properties": {
-              "org": {
+              "organisation": {
                 "type": "keyword"
               },
               "role": {
```

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
- [Storybook of Web components](https://geonetwork.github.io/geonetwork-ui/main/storybook-wc/)
- [Demo](https://geonetwork.github.io/geonetwork-ui/main/demo/)

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

### A word on authentication

GeoNetwork-UI applications rely on the GeoNetwork authentication mechanism. This means that if the user is authenticated in GeoNetwork, they will have access to authenticated features in the corresponding GeoNetwork-UI apps.

There are a few caveats, depending on the deployment scenario:

#### 1. GeoNetwork and GeoNetwork-UI are deployed on the same host, e.g. https://my.host/geonetwork and https://my.host/datahub

In this scenario, requests from the GeoNetwork-UI app to GeoNetwork are _not_ [cross-origin requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#what_requests_use_cors), so CORS rules do not apply.

GeoNetwork has an XSRF protection by default, which _will_ make authenticated requests fail unless the following is done:

- either make sure that the XSRF cookies sent by GeoNetwork have a `path` value of `/`; this is typically done like so in GeoNetwork:

  ```diff
  --- a/web/src/main/webapp/WEB-INF/config-security/config-security-core.xml
  +++ b/web/src/main/webapp/WEB-INF/config-security/config-security-core.xml
  @@ -361,6 +361,7 @@
     <bean class="org.fao.geonet.security.web.csrf.CookieCsrfTokenRepository"
           id="csrfTokenRepository">
       <property name="cookieHttpOnly" value="false"/>
  +    <property name="cookiePath" value="/"/>
     </bean>
  ```

  Also make sure that the GeoNetwork API URL used by the application is _not_ an absolute URL; a relative URL should be enough in that scenario:

  ```diff
  --- a/conf/default.toml
  +++ b/conf/default.toml
  @@ -5,7 +5,7 @@
  [global]
  -geonetwork4_api_url = "https://my.host/geonetwork/srv/api"
  +geonetwork4_api_url = "/geonetwork/srv/api"
  ```

- or disable the XSRF protection selectively for non-critical endpoints of GeoNetwork, e.g. https://my.host/geonetwork/srv/api/userSelections for marking records as favorites; this is typically done like so in GeoNetwork:

  ```diff
  --- a/web/src/main/webapp/WEB-INF/config-security/config-security-core.xml
  +++ b/web/src/main/webapp/WEB-INF/config-security/config-security-core.xml
  @@ -374,6 +374,9 @@
           <value>/[a-zA-Z0-9_\-]+/[a-z]{2,3}/csw!?.*</value>
           <value>/[a-zA-Z0-9_\-]+/api/search/.*</value>
           <value>/[a-zA-Z0-9_\-]+/api/site</value>
  +        <value>/[a-zA-Z0-9_\-]+/api/userselections.*</value>
         </set>
       </constructor-arg>
     </bean>
  ```

  :warning: Please do this responsibly as this could have security implications! :warning:

#### 2. GeoNetwork and GeoNetwork-UI are _not_ deployed on the same host, e.g. https://my.host/geonetwork and https://another.org/datahub

In this scenario, even if CORS settings are correctly set up on GeoNetwork side, most authenticated request will probably fail because by default they are not sent with the [`withCredentials: true`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials) option.

As such, **authenticated requests are not yet supported in GeoNetwork-UI in the case of a cross-origin deployment**; non-authenticated requests (e.g. public search) should still work provided CORS settings were correctly set up on the GeoNetwork side (see [CORS resonse headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#the_http_response_headers)).

Lastly, even if authenticated requests were cleared regarding CORS rules, it would still be needed to disable the XSRF mechanism for the endpoints that GeoNetwork-UI relies on; XSRF protections works by making the client read the content of an HTTP cookie, and that is forbidden in a cross-origin context

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

You can test the datahub app by page :

- home page
- search page
- organisations page
- dataset pages

##### To run the tests with the interface :

Start docker from 'support-services', and then in the 'geonetwork-ui' folder :

```shell script
npx nx e2e appname --watch
```

Then select the file(s) you want to test in the interface.

##### To run the tests without interface :

Start docker from 'support-services', and then in the 'geonetwork-ui' folder :

--> ALl tests :

```shell script
npx nx e2e appname
```

## Project structure

The GeoNetwork UI project was generated using [Nx](https://nx.dev) and is composed of:

- **libraries** containing components and services in the `libs` folder
- **applications** using said components in the `apps` folder
- **web components** using also said components in the `apps/webcomponents` folder

Other directories include:

- **conf**: configuration-related files
- **translations**: contains the translations of all keys used in GeoNetwork UI
- **tools**: various tools & utils for docker, internationalization etc.

### Libraries

Libraries are organized in the following fashion:

1. Presentation libraries are in the `ui` folder and are categorized by their forms:

   - `ui-inputs` for reusable components made to collect input from the user (e.g.: form fields, buttons...)
   - `ui-elements` for components focused on rendering specific types of information in an elaborate way, which may or may not be related to business usages;
     examples include download links, facet or selection tree, etc.
   - `ui-layout` for components which occupy a large part of the screen and might contain variable content or other components
   - `ui-map` for map-specific components (map container, controls, etc.)
   - `ui-widgets` for reusable, small, self-contained components which show information in a visual way, similar to icons but more elaborate (e.g.: icon with tooltip, status indicator, progress bar...)

   > Note: presentation components contain mainly HTML and CSS code, and should contain very little logic

2. Libraries providing business or data logic and state management are in the `feature` folder and are categorized by their intended use:

   - `feature-auth` for logic and components related to authentication
   - `feature-catalog` for logic and components related to general catalog topics (title, logo, etc.)
   - `feature-dataviz` for logic and components related to data visualization
   - `feature-record` for logic and components related to displaying a catalog record's information (metadata, data preview, exports, APIs...)
   - `feature-editor` for logic and components related to editing metadata
   - `feature-map` for logic and components related to interactive maps
   - `feature-search` for logic and components related to searching through the catalog

   > Note: these libraries provide "smart components" which are communicating with each other using a NgRx store.  
   > They rely on presentation components and as such hold very little HTML or CSS code.

3. Libraries used for interacting with backend services are in the `data-access` folder:

   - `data-access-gn4` contains an auto-generated API client for the GeoNetwork 4 backend
   - `data-access-datafeeder` contains an auto-generated API client for the Datafeeder backend

4. Libraries providing various utilities in the `util` folder:

   - `util-data-fetcher` for fetching and querying datasets
   - `util-app-config` for parsing and validating application configurations
   - `util-shared` for shared models and types, test fixtures, app-wide settings etc.
   - `util-i18n` for translation and internationalization

5. Libraries providing common services or shared models are in the `util` folder:

   - `common-domain` contains many definitions used across the whole project
   - `common-fixtures` contains test fixtures

6. Libraries providing low-level functionalities that can be used both in front and backend are in the `api` folder:
   - `api-metadata-converter` for providing a pivot metadata model and conversion to interoperable formats

#### `webcomponents`: Embeddable webcomponents

See [the specific README file](apps/webcomponents).

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
