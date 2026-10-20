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

## Custom loading

`loadAppConfig()` loads every section and requires the `[global]` and `[theme]` sections. Applications that only need part of the configuration (e.g. custom applications built with the `geonetwork-ui` NPM package) can compose their own loader from the same building blocks:

- `fetchConfig(url)` fetches and parses the TOML file
- `parseGlobalSection`, `parseThemeSection`, `parseMapSection`, `parseSearchSection`, `parseMetadataQualitySection`, `parseEditingSection` and `parseTranslationsSection` each read one section and collect warnings and errors
- `reportConfigIssues(issues)` throws if errors were collected, otherwise logs the warnings
- `setAppConfig(config)` stores the sections so that the usual getters (`getThemeConfig()`, `getCustomTranslations()`, etc.) can be used

```ts
import { ConfigIssues, fetchConfig, parseThemeSection, parseTranslationsSection, reportConfigIssues, setAppConfig } from '@geonetwork-ui/util/app-config'

export async function loadMyAppConfig() {
  const parsed = await fetchConfig()
  const issues: ConfigIssues = { warnings: [], errors: [] }
  const theme = parseThemeSection(parsed, issues)
  const translations = parseTranslationsSection(parsed)
  reportConfigIssues(issues)
  setAppConfig({ theme, translations })
}
```

Sections which are not given to `setAppConfig` are considered absent: `getGlobalConfig()` and `getThemeConfig()` will throw, `getCustomTranslations()` returns an empty object, `getMetadataQualityConfig()` returns its default and the other getters return `null`.

An application which needs a section with different keys can implement its own `parse*Config` and `get*Config` functions. The custom parser can use existing logic like `parseConfigSection()` from the gn-ui utils. The app's `load*AppConfig` function can then use these custom parsers and keep the result in its own state. An example for this could be a `[global]` section without the `geonetwork4_api_url` key, which is required in gn-ui's default `GlobalConfig`.
