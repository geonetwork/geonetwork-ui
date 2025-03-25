---
outline: deep
---

# Application Configuration

## Principle

GeoNetwork UI provides a standard way of configuring applications using the [default.toml](https://github.com/geonetwork/geonetwork-ui/tree/main/conf/default.toml) file.

This file can be used to:

- customize the URL used to reach the GeoNetwork 4 API
- indicate an optional proxy path to the application
- indicate a metadata language to be used when searching
- customize the theme used in the application (colors, fonts...)
- define custom translations for the different languages
- customize filters for the search page

Please refer to [the configuration guide](../guide/configure.md) as well as embedded comments in the file for more information.

## The `util/app-config` library

This library is the one which should be used when parsing a configuration file. Using a configuration file is not mandatory, each application can decide whether this is relevant.

Only applications should rely on the `util/app-config` library! The other libraries should never assume that an application config is present, as this can very often not be the case (e.g. for web components).
