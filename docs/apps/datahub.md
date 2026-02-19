---
outline: deep
---

# Datahub

The **Datahub** application offers a very intuitive and easy-to-use search interface to let people explore a GeoNetwork catalogue and the data it contains.

## Features

- Powerful search experience using full-text search, advanced filters, sorting
- Marking records as favorite to find them more easily later
- [Metadata Quality](../guide/metadata-quality.md) system to help find data well documented
- Grouping records by organization
- Data visualization using maps, tables and charts
  - Ability to customize basemap in map visualization in [configuration](../guide/configure.md#map)
  - Ability to limit maximum requested features in [configuration](../guide/configure.md#map)
  - Attribute definition instead of technical names if defined in [feature catalog](../apps/datahub-sections-fields.md#feature-catalog)
  - Warning when the source is [restricted](../guide/online-resource-restricted.md)
- Improved record data fetching through cache-based requests, using OGC-client's built-in caching and record's update frequency awareness [developer's guide](../developers/caching.md)
- Using protocols such as WFS and OGC API - Features to offer a list of formats for download, as well as a tool for generating download URLs based on given parameters
- Ability for users to leave feedbacks on catalog record and for administrators to respond
- Powerful theming system allowing custom colors, fonts and background images, see [configure guide](../guide/configure.md#theme)
- Support both geo- and non-geo datasets
- Ability to show a welcome or maintenance message to users, which can be configured as needed, see [configure guide](../guide/configure.md#application-banner)

## Run & deploy

The Datahub application is available as a docker image or as a ZIP archive.

### Using docker

The docker image is `geonetwork/geonetwork-ui-datahub`.

See the [run guide](../guide/run#with-docker) for more information.

### Using the ZIP archive

A `datahub-VERSION.zip` archive is available on every GeoNetwork-UI release: https://github.com/geonetwork/geonetwork-ui/releases

See the [run guide](../guide/run#from-the-zip-archive) for more information.

### Deployment

Please refer to the [general deploy guide](../guide/deploy.md) to learn how to deploy GeoNetwork-UI applications.

## Pages

### Home page - News

This page provides general information on the catalog, and displays the latest changes on the catalog.

### Catalog - Search

This is where the users will find the search features:

- full-text search
- advanced filters
- toggles on record kind

Then the search results are displayed as a list of cards.
Each cards presents various informations to help find the wanted record.

### Dataset, Service, Reuse

The **Datahub** includes record of three different types : datasets, services and reuses.
Each type has its own 'page-type' with fixed sections (if the related data is available in the record) :

- Common sections : General information about the record (abstract, keywords, licensing, update date...), Point of contact, External links, Linked records, User feedbacks and Related datasets

- Specificities by page :
  - Dataset : Preview (Map, Table and Chart), Download and API links, Feature catalog
  - Service : Capabilities
  - Reuse : Main link to reuse

For more details on the dataset/service/reuse classification, see the [classification system](../guide/record-kind.md)
For more details on sections and fields, see [Datahub - sections and fields](../apps/datahub-sections-fields.md)

### Organisations

The **Datahub** also supports records classification by organization.
A record is associated to an organization by its contacts, and a list of the oraganizations available in the catalog is displayed in its own tab.
When viewing the page of one organization in particular, it's then easy to see all the records of this organization.
