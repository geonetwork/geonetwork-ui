![Workflow status](https://github.com/geonetwork/geonetwork-ui/workflows/Build/badge.svg?branch=master)

# GeoNetwork UI

GeoNetwork UI is a library of UI and Web Components to embed your catalogue in third party website or to build custom application on top of it. It relies on the GeoNetwork 4 OpenAPI.

The target audience is:

- GeoNetwork developers
- Developers of SDI, portals
- Website and CMS maintainers

## Getting started

Install first GeoNetwork 4 [from source](https://geonetwork-opensource.org/manuals/4.0.x/eng/users/install-guide/installing-from-source-code.html#building-running)
or using [docker](https://github.com/geonetwork/docker-geonetwork/tree/master/4.0.1).

Run `npm install` to fetch all dependencies of the project.

Run `ng serve app-search` to start the search app in a dev server.

Once started the application is available at `http://localhost:4200/`.

[The contributing guide](CONTRIBUTING.md) explains the structure of the project and how to work with it.

If you would like to contribute code, please follow our [style guide](STYLEGUIDE.md).

[Storybook](https://storybook.js.org) is a tool for exploring individual features of the application in an interactive way.
You can start it with `npm run storybook`.

## Live demo

You can either try complete applications or showcases of components using the following links:

- [Datahub app](https://geonetwork.github.io/geonetwork-ui/master/apps/datahub/)
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

Run `npm test` to execute the unit tests via Jest.

You can test a specific lib or app or file with

```shell script
npm test -- (lib_name)
npm test -- --test-match=/data/dev/gn/ui/libs/common/src/lib/services/bootstrap.service.spec.ts
```

## Project structure

The GeoNetwork UI project was generated using [Nx](https://nx.dev) and is composed of:

- **libraries** containing components and services in the `libs` folder
- **applications** using said components in the `apps` folder
- **web components** using also said components in the `apps/webcomponents` folder

#### `libs/search`: Smart search-related components

These components are communicating with each other using a NgRx store. They rely on presentation components and hold very little
presentation information.

#### `libs/ui`: Presentation components

Presentation components are styled using [TailwindCSS](https://tailwindcss.com/) utilities. Many colors are using CSS variables,
meaning they can be changed at runtime. A custom configuration for TailwindCSS has been created to provide this feature.

#### `libs/common`: Shared library

Holds shared models, fixtures and utility services.

#### `libs/gn-api`: GeoNetwork API Client

Library generated dynamically from the GeoNetwork 4 API description.

#### `webcomponents`: Embeddable webcomponents

See [the specific README file](apps/webcomponents).

## To document

- How to specify the GN url to use (currently hardcoded in the dev proxy: https://apps.titellus.net/geonetwork)
- How to build and run web components
- Explain unit test setup & architecture with jest
