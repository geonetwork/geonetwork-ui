![Workflow status](https://github.com/geonetwork/geonetwork-ui/workflows/Build/badge.svg?branch=master)

# GeoNetwork UI

GeoNetwork UI is a suite of Applications made to provide a modern facade to your GeoNetwork 4 catalog.

It also provides Web Components to embed your catalogue in third party websites. It relies on the GeoNetwork 4 OpenAPI.

The target audience is:

- GeoNetwork developers
- Developers of SDI, portals
- Website and CMS maintainers

## Getting started

Install first GeoNetwork 4 [from source](https://geonetwork-opensource.org/manuals/4.0.x/eng/users/install-guide/installing-from-source-code.html#building-running)
or using [docker](https://github.com/geonetwork/docker-geonetwork/tree/master/4.0.1).

Run `npm install` to fetch all dependencies of the project.

Run `npm start` to start the datahub app in a dev server.

Once started the application is available at `http://localhost:4200/`.

[The contributing guide](CONTRIBUTING.md) explains the structure of the project and how to work with it.

If you would like to contribute code, please follow our [style guide](STYLEGUIDE.md).

[Storybook](https://storybook.js.org) is a tool for exploring individual features of the application in an interactive way.
You can start it with `npm run storybook`.

## Live demo

You can either try complete applications or showcases of components using the following links:

- [Storybook of UI components](https://geonetwork.github.io/geonetwork-ui/master/storybook/demo/)
- [Storybook of Web components](https://geonetwork.github.io/geonetwork-ui/master/storybook-wc/)
- [Demo](https://geonetwork.github.io/geonetwork-ui/master/demo/) _(not functional yet, WIP)_

## More information

### Running GeoNetwork UI

To run a specific application using a development server, use:

```shell script
npm start -- (app_name)
```

And navigate to `http://localhost:4200/`.

### Build

To build a specific application, use:

```shell script
npm run build -- (app_name) (--prod)
```

The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Tests

Run `npm test` to execute the affected unit tests via Jest.
Affected code is compared to origin/master.

You can test

- affected code
- all modules
- specific lib or app
- specific test suite

```shell script
npm run test
npm run test:all
ng test (lib_name)
ng test --test-match=/data/dev/gn/ui/libs/common/src/lib/services/bootstrap.service.spec.ts
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

4. Libraries providing common services or shared models are in the `util` folder:
   - `util-i18n` for translation and internationalization
   - `util-shared` for shared models and types, test fixtures, app-wide settings etc.

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

- How to specify the GN url to use (currently hardcoded in the dev proxy: https://apps.titellus.net/geonetwork)
- How to build and run web components
- Explain unit test setup & architecture with jest
