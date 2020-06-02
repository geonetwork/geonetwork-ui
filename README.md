# GeoNetwork UI

GeoNetwork UI is a client application to browse your GeoNetwork catalogue.
GeoNetwork UI is based on [Node](https://nodejs.org/en/)/NPM and [Angular]().

Work on this project started as a UI pilot in the scope of a [UI codesprint](https://github.com/geonetwork/core-geonetwork/wiki/GeoNetwork-client-pp-building-blocks-codesprint-1st-and-2nd-June-2020).

## Getting started

- Install first GeoNetwork 4 [from source](https://geonetwork-opensource.org/manuals/trunk/en/maintainer-guide/installing/installing-from-source-code.html#the-quick-way) and Elasticsearch or run both using [docker](https://github.com/geonetwork/docker-geonetwork/tree/master/4.0.0-alpha.1).

- Install Node from https://nodejs.org/en/

- In console install angular client and angular devtools

```
npm install -g @angular/cli
npm install --save-dev @angular-devkit/build-angular
```

- Clone the repository 

```
git clone https://github.com/geonetwork/geonetwork-ui.git
cd geonetwork-ui
```

- If GeoNetwork does not run on http://localhost:8080/geonetwork, then configure the proper url in ...

- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 



## Documentation 

* See the story book.
* [The contributing guide](CONTRIBUTING.md) will help you get Kibana up and running
* If you would like to contribute code, please follow our [style guide](STYLEGUIDE.md)
