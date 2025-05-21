---
outline: deep
---

# Datahub

The **Datahub** application offers a very intuitive and easy-to-use search interface to let people explore a GeoNetwork catalogue and the data it contains.

## Features

- Powerful search experience using full-text search, advanced filters, sorting
- Marking records as favorite to find them more easily later
- Data visualization using maps, tables and charts
  - Ability to customize basemap in map visualization with layers from 'xyz', 'wms' or 'wfs' service endpoint; or 'geojson'; or 'maplibre style' (see `map_layer` option in [configure guide](../guide/configure.md#map))
  - Ability to configure a max feature count for WFS, with pagination, for an optimized display in table dataviz (see `max_feature_count` option in [configure guide](../guide/configure.md#map))
- Improved record data fetching through cache-based requests, using OGC-client's built-in caching and records' update frequency awareness
- Using protocols such as WFS to offer a list of formats for download, as well as a tool for generating download URLs based on given parameters
- Ability for users to leave feedbacks on catalog record and for administrators to respond
- Powerful theming system allowing custom colors, fonts and background images
- Support both geo- and non-geo datasets
- Ability to show a welcome message to users, which can be configured as needed

## Run & deploy

The Metadata Editor application is available as a docker image or as a ZIP archive.

### Using docker

The docker image is `geonetwork/geonetwork-ui-datahub`.

See the [run guide](../guide/run#with-docker) for more information.

### Using the ZIP archive

A `datahub-VERSION.zip` archive is available on every GeoNetwork-UI release: https://github.com/geonetwork/geonetwork-ui/releases

See the [run guide](../guide/run#from-the-zip-archive) for more information.

### Deployment

Please refer to the [general deploy guide](../guide/deploy.md) to learn how to deploy GeoNetwork-UI applications.

## User feedbacks

Authenticated users can post feedbacks at the bottom of the record view as well as answer to existing feedbacks. User feedbacks can be moderated through the administration interface of GeoNetwork.
