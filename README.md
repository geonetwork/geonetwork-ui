![Workflow status](https://github.com/geonetwork/geonetwork-ui/workflows/Build/badge.svg?branch=master)


# GeoNetwork UI

GeoNetwork UI is a library of UI and Web Components to embed your catalogue in third party website or to build custom application on top of it. It relies on the GeoNetwork 4 OpenAPI.

The target audience is: 
* GeoNetwork developers
* Developers of SDI, portals 
* Website and CMS maintainers


## Getting started

Install first GeoNetwork 4 [from source](https://geonetwork-opensource.org/manuals/4.0.x/eng/users/install-guide/installing-from-source-code.html#building-running) 
or using [docker](https://github.com/geonetwork/docker-geonetwork/tree/master/4.0.1).

Run `npm install` to fetch all dependencies of the project.

Run `npm run start` to start the default app.

Run `ng serve app-search` to start the search app in a dev server.

Once started the application is available at `http://localhost:4200/`. 

[The contributing guide](CONTRIBUTING.md) explains the structure of the project and how to work with it.

If you would like to contribute code, please follow our [style guide](STYLEGUIDE.md).

[Storybook](https://storybook.js.org) is a tool for exploring individual features of the application in an interactive way.
You can start it with `npm run storybook`.

## Demo
You can test current master components with storybook and demo pages
- [Demo](https://geonetwork.github.io/geonetwork-ui/master/demo/)
- [Storybook Angular components](https://geonetwork.github.io/geonetwork-ui/master/storybook/?path=/story/ui--auto-complete-story)
- [Storybook Web components](https://geonetwork.github.io/geonetwork-ui/master/storybook-wc/) (custom elements)

## More information

The GeoNetwork UI project was generated using [Nx](https://nx.dev) and is composed of:
* **libraries** containing components and services
* **applications** using said components
* **web components** using also said components

### Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

There are also many [community plugins](https://nx.dev/nx-community) you could add.

### Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

### Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@geonetwork-ui/mylib`.

### Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

### Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

### Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

### Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

### Project structure

#### `libs/search`: Smart search-related components

These components are communicating with each other using a NgRx store. They rely on presentation components and hold very little
presentation information.

#### `libs/ui`: Presentation components

Presentation components are styled using [TailwindCSS](https://tailwindcss.com/) utilities. Many colors are using CSS variables,
meaning they can be changed at runtime. A custom configuration for TailwindCSS has been created to provide this feature.

#### `libs/common`: Shared library

Holds shared models, fixtures and utility services.

#### `libs/gn-api`: Geonetwork API Client

Library generated dynamically from the GeoNetwork 4 API description. Use `npm run generate-api` to re-generate.

#### `webcomponents`: Embeddable webcomponents

See [the specific README file](webcomponents).

## To document

- How to specify the GN url to use (currently hardcoded in the dev proxy: https://apps.titellus.net/geonetwork)
- How to build and run web components
- Explain unit test setup & architecture with jest
