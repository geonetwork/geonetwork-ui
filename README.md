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

The GeoNetwork UI project is built using Angular 10 and is composed of:
* **libraries** containing components and services
* **applications** using said components
* **web components** using also said components

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
