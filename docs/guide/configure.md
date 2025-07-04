---
outline: deep
---

# Configuration of a GeoNetwork-UI application

Each application can rely on its own system for configuration. This page lists the main ones.

## TOML file

### Introduction

Most applications such as the [Datahub](../apps/datahub.md) rely on a file called `default.toml` which is part of its available assets. **This file is loaded and read before anything else is done**, e.g. bootstrapping the application.

This file uses the [TOML format](https://toml.io/en/), which is an easy-to-read format composed of sections, each of them containing key-value pairs. Comments are also present in the default file to help customizing it.

Some additional notes:

- Languages in the configuration are specified using [two-letters ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) unless noted otherwise
- Tokens in URL templates are specified using the `${token_name}` syntax

### Sections

#### `[global]`

- `geonetwork4_api_url`

  This URL (relative or absolute) must point to the API endpoint of a GeoNetwork 4.x instance, such as "/geonetwork/srv/api".

- `proxy_path` (optional)

  This should point to a proxy to avoid CORS errors on some requests (data preview, OGC capabilities etc.). The actual URL will be appended after this path, e.g. : https://my.proxy/?url=http%3A%2F%2Fencoded.url%2Fservice.

  This is an optional parameter: leave empty to disable proxy usage. See [this section of the run guide](./run#proxy) for more information.

- `languages` (optional)

  This optional parameter defines the languages that will be provided in the UI language switcher. Available languages are listed [in this file](https://github.com/geonetwork/geonetwork-ui/blob/1533e02e24258814ef19f21e991a45e01fd06f36/libs/util/i18n/src/lib/i18n.constants.ts#L25).

  Languages should be provided as an array, for instance:

  ```toml
  languages = ['en', 'fr', 'de']
  ```

  More information about the translation can be found in the [relevant documentation](../developers/i18n.md)

- `metadata_language` (optional)

  This optional parameter lets you specify which language to use when searching in the catalog connected to GeoNetwork-UI. This might improve the search experience by showing results relevant to your users' language.

  Use [ISO three-letter codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) to indicate the language used in the search (e.g. "fre" or "ger"). Alternatively, setting to "current" will use the current language of the User Interface.

  If not indicated, the search will be done across all localized values for each record, potentially showing more results that expected or unrelated results.

  ::: tip
  Indicating a language in `metadata_language` according to the queried catalog will make the search more efficient.
  :::

- `login_url` (optional)

  This optional URL should point to the login page that allows authentication to the GeoNetwork-UI backend (e.g. GeoNetwork).

  If not indicated, a default GeoNetwork login link is used.

  The following three placeholders can be part of this URL:

  - `${current_url}`: indicates where the current location should be injected in the constructed login URL

  - `${lang2}`, `${lang3}`: indicates if and where the current language should be part of the login URL in 2- or 3-letters ISO format

  Example for a platform relying on CAS:

  ```toml
  login_url = "/cas/login?service=${current_url}"
  ```

- `web_component_embedder_url` (optional)

  This optional URL should point to the static html page [`wc-embedder.html`](https://github.com/geonetwork/geonetwork-ui/blob/1533e02e24258814ef19f21e991a45e01fd06f36/tools/webcomponent/wc-embedder.html) which allows displaying any GeoNetwork-UI web component (e.g. chart or table) via a permalink.

  URLs can be indicated from the root of the same server starting with a "/" or as an external URL. Be conscious of potential CORS issues when using an external URL.

  The default location in the dockerized Datahub app is for example "/datahub/wc-embedder.html".

  If the URL is not indicated, no permalinks will show up in the UI.

- `contact_email` (optional)

  Enables displaying a "contact block" wherever relevant in applications.

- `datahub_url` (optional)

  (WIP)

#### `[theme]`

::: tip
All parameters in this section are expressed using CSS formats; references:

- for color: https://developer.mozilla.org/en-US/docs/Web/CSS/color
- for font families: https://developer.mozilla.org/en-US/docs/Web/CSS/font-family
- for background: https://developer.mozilla.org/en-US/docs/Web/CSS/background
  :::

* `primary_color`, `secondary_color`, `main_color` and `background_color`

  These colors constitute the building blocks of the visual theme of an application. Color scales will be derived from them automatically to offer relevant contrasts and engaging visuals.

  Note that `main_color` is the all-purpose text color, usually very close to black. `background_color` is the general page background, usually very cloe to white.

* `header_background` and `header_foreground_color` (optional)

  These optional parameters indicate which background should be used for the main header and the text color used on top of the background. The color should be chosen to contrast well with the background (defaults to white).

* `thumbnail_placeholder` (optional)

  This optional parameter allows overriding the fallback image that should be used for thumbnails in case the metadata record has no thumbnail image URL or it fails to load.

* `main_font` and `title_font` (optional)

  These optional parameters allow changing fonts used in the app.

* `fonts_stylesheet_url` (optional)

  If using custom fonts, specify a URL pointing to a stylesheet defining these fonts. Default fonts are available locally in the application assets. Fonts can also be loaded from third-party services, for instance:

  ```toml
  fonts_stylesheet_url = "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Permanent+Marker&display=swap"
  ```

  ::: warning Potential GDPR implications
  Using fonts coming from third-party services (e.g. Google Fonts) might require asking for explicit user consent as the user's IP address might be shared with said service
  :::

- `favicon` (optional)

  Use this setting to set a custom URL for the favicon; by default, "/favicon.ico" will be used.

#### `[search]`

- `record_kind_quick_filter` (optional)

Indicates whether the quick filter (by record kind dataset, service or reuse) below the search filters is displayed or not. Defaults to `true`.

- `filter_geometry_url` or `filter_geometry_data` (optional)

Specify a GeoJSON object to be used as filter: all records contained inside the geometry will be **boosted on top**, all records which do not intersect with the geometry will be **shown with lower priority**.

The GeoJSON geometry can be specified either as URL or inline data.

Note: if the GeoJSON object contains multiple features, only the geometry of the first one will be kept!

- `advanced_filters` (optional)

The advanced search filters available to the user can be customized with this setting.
For a list of supported search fields, see [this documentation page](../guide/search-fields.md). Any unknown field will be ignored.

The filters should be provided as an array, for instance:

```toml
advanced_filters = ['organization', 'inspireKeyword', 'keyword', 'topic']
```

⚠️ **WARNING**: `'resourceType'` filter has been deprecated, please use `'recordKind'` instead. Using both filters is not recommended as it may imply some inconsistencies in the page results. `'resourceType'` filter will fetch records of all type (instead of `featureCatalog`), whereas `'recordKind'` filter will fetch `datasets` (wich are `datasets`, `featureCatalog` that are `datasets`, and `series`), `services` and `reuse` (`application` and all kind of `map`).

⚠️ **Breaking change**: Record of type featureCatalog are not retrieved anymore.

- `[[search_preset]]` (multiple, optional)

  Search presets are shown in a prominent way to the user and can be used to showcase certain records in the catalog or offer shortcuts to frequent search criteria.

  Every search preset is composed of:

  - a name for the preset, which can be a translation key (mandatory)
  - a sort criteria: either `createDate`, `userSavedCount` or `_score` (prepend with `-` for descending sort) (optional)
  - a set of filters, each of them being a key-value pair where the key is a [known search field](../guide/search-fields.md) and the value is an array of strings (optional)
  - additionally, `filters.q` can be used to specify a full text search query

  Multiple search presets can be defined like so:

  ```toml
  [[search_preset]]
  name = 'filterByName'
  filters.q = 'full text search'
  filters.organization = ['Org 1', 'Org 2']
  filters.format = ['format 1', 'format 2']
  filters.documentStandard = ['iso19115-3.2018']
  filters.inspireKeyword = ['keyword 1', 'keyword 2']
  filters.topic = ['boundaries']
  filters.publicationYear = ['2023', '2022']
  filters.isSpatial = ['yes']
  filters.license = ['unknown']
  sort = 'createDate'

  [[search_preset]]
  name = 'otherFilter'
  filters.q = 'full text search'
  ```

#### `[metadata-quality]`

This section contains settings related to the Metadata Quality system.

::: info How to enable the Metadata Quality system
To show Metadata Quality scores on records and allow sorting, enabling the setting below is not enough. An ElasticSearch pipeline also has to be registered; please refer to [this section](../guide/deploy.md#enabling-improved-search-fields) for more information.
:::

- `enabled` (optional)

  By default, the widget is not activated; to enable it, just set this parameter to "true".

#### `[map]`

The map section lets you customize how maps appear and behave across GeoNetwork-UI applications.

- `max_zoom` (optional)

  Will limit the possibility to zoom in past a certain zoom level.

- `max_extent` (optional)

  Will limit the possibility to pan or zoom outside of an extent. Expressed as an array of _minX_, _minY_, _maxX_ and _maxY_ numerical components in the map view projection (EPSG:3857 by default), e.g.:

  ```toml
  max_extent = [-418263.418776, 5251529.591305, 961272.067714, 6706890.609855]
  ```

- `max_feature_count` (optional)

  Will remove WFS from map layers if its features exceed the indicated number. Data preview chart will also be disabled. A notification will inform the user that features will not be displayed on the map.
  ::: info
  However, the table view will always display the features and, if supported by the service (should be WFS 2.0.0), will handle pagination.
  :::

- `do_not_tile_wms` (optional)

  Will not use tiling when requesting WMS services. Defaults to `false` (WMS are tiled). Not using tiles for WMS might incur performance loss since the client will not benefit from an eventual tile cache anymore. On the other hand, visual quality might improve in case a map tile server does not handle neighbouring tiles correctly, e.g. symbols or text being cropped at tile boundaries. This can be set true to prevent visual conflicts on tile borders, if the WMS server does not add a gutter, for example. gn-ui does not add a gutter on the client side, in order to allow server-side caching.

- `do_not_use_default_basemap` (optional)

  If set to `true`, the default basemap will not be added to the map. Defaults to `false` (base map is shown).
  Use `[[map_layer]]` sections to define your own custom layers (see below)

- `[[map_layer]]` (multiple, optional)

  One or several layers (as background or overlay) can be added to the map with the following properties:

  - `type` (mandatory): Indicates the layer type. Possible values are "xyz", "wms", "wfs", "geojson".
  - `url` (mandatory for "xyz", "wms" and "wfs" types): Layer endpoint URL.
  - `name` (mandatory for "wms" and "wfs" types): indicates the layer name or feature type.
  - `data` (for "geojson" type only): inline GeoJSON data as string.
  - `styleUrl` (mandatory for "maplibre-style" type only): Maplibre style URL.
  - `accessToken` (optional for "maplibre-style" type only): credential to access the basemap styles service

  Layer order in the config is the same as in the map, the foreground layer being the last defined one.

  Each layer is defined in its own `[[map_layer]]` section. For instance:

  ```toml
  [[map_layer]]
  type = "xyz"
  url = "https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"

  [[map_layer]]
  type = "wfs"
  url = "https://www.geo2france.fr/geoserver/cr_hdf/ows"
  name = "masque_hdf_ign_carto_latin1"

  [[map_layer]]
  type = "geojson"
  data = """
  {
  "type": "FeatureCollection",
  "features": [{"type": "Feature", "geometry": {"type": "Point", "coordinates": [125.6, 10.1]}}]
  }
  """

  [[map_layer]]
  type = "maplibre-style"
  styleUrl = "https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/gris.json"
  accessToken = "token_if_needed" # optional
  ```

- `external_viewer_url_template` (optional)

  URL template allowing opening map layers in an external viewer; if set, applications such as the Datahub will offer a button next to the map viewer tp open the currently-viewed layers in an external viewer.

  The template must include the following placeholders, which allow applications to inject the correct values when generating the final URL:

  - `${service_url}`: URL of the data file or web service providing the layer
  - `${service_type}`: Type of layer; currently supported types are WMS, WFS, GEOJSON
  - `${layer_name}`: Name of the layer

  Example for an integration with MapStore viewer:

  ```toml
  external_viewer_url_template = 'https://my.sdi.org/mapstore/#/?actions=[{"type":"CATALOG:ADD_LAYERS_FROM_CATALOGS","layers":["${layer_name}"],"sources":[{"url":"${service_url}","type":"${service_type}"}]}]'
  ```

- `external_viewer_open_new_tab` (optional)

  If set to "true", the external viewer will open in a new tab when adding layers to it; if set to "false" (default), the external viewer will open in the same tab. Requires `external_viewer_url_template` to have any effect.

#### `[translations.xy]`

To override translations in a specific language, use a "translations.xy" section where "xy" is a two-letter language code.

Example:

```toml
[translations.en]
results.sortBy.dateStamp = "Last time someone changed something"
[translations.fr]
results.sortBy.dateStamp = "Dernière fois que quelqu'un a modifié quelque chose"
```

::: tip Using HTML in translations
Translation keys ending with ".html" _can_ contain HTML markup, including inline CSS:

```toml
[translations.en]
catalog.welcome.html = """
Welcome to <span class="text-primary">Organization</span>'s<br>
wonderful <span style="font-size: 1.2em;">data catalogue</span>
"""
```

:::

::: tip Displaying translation keys in the UI
Including the `?debugTranslations=true` query parameter in the URL will display all translation keys instead of their translated values. This is useful when customizing translations keys in the configuration.

:::

### Backwards compatibility

A `default.toml` file authored for a previous release of GeoNetwork-UI _should_ always work when using a more recent version. There are two caveats:

- if upgrading to a higher major version (e.g. from 1.2.0 to 2.0.0), some breaking changes might occur; these changes and how to migrate the file will be documented in the release notes
- if some settings of the file become obsolete, a warning will be printed in the browser console when loading the app; this _should not_ break functionalities, but fixing those warnings by the administrator is recommended

As for translation keys, these are subject to change outside of major version bumps, so any overridden translation key in the configuration file might become obsolete between versions. Please refer to the release notes to get a list of obsolete translation keys and their replacements.

## Platform Service

### Introduction

Texts and translations are configured within Geonetwork, enabling users to easily update content through translation keys in the Geonetwork backoffice. GeoNetwork-UI takes advantage of this feature to translate or display specific content.

#### Application banner

If the translation key `application-banner` is available (not empty), the Geonetwork-UI will display a banner for the home page, catalog page, and organisation page.

- `application-banner` (optional)

  To configure your banner content, go to the Geonetwork backoffice > Settings > Languages & translations page, and add a new translation key `application-banner`. To remove/deactivate the banner, you need to remove the translation key in the Geonetwork backoffice.
