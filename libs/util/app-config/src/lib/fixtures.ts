import { MapConfig } from './model'

export const okAppConfigFixture = () => `
[global]
geonetwork4_api_url = "/geonetwork/srv/api"
proxy_path = "/proxy/?url="
metadata_language = "fre"
login_url = "/cas/login?service="
logout_url = "/geonetwork/signout"
settings_url = "/geonetwork/settings"
web_component_embedder_url = "/datahub/wc-embedder.html"

[map]
max_zoom = 10
max_extent = [-418263.418776, 5251529.591305, 961272.067714, 6706890.609855]
do_not_use_default_basemap = false
external_viewer_url_template = 'https://example.com/myviewer?'
external_viewer_open_new_tab = true
[[map_layer]]
type = "wms"
url = "https://www.geo2france.fr/geoserver/cr_hdf/ows"
name = "masque_hdf_ign_carto_latin1"
[[map_layer]]
type = "wfs"
url = "https://www.geo2france.fr/geoserver/cr_hdf/ows"
name = "masque_hdf_ign_carto_latin1"

[theme]
primary_color = "#093564"
secondary_color = "#c2e9dc"
main_color = "#212029" # All-purpose text color
background_color = "#fdfbff"
thumbnail_placeholder = 'assets/img/placeholder.svg'
header_background = 'teal'
header_foreground_color = "#872e2e"
main_font = 'sans-serif'
title_font = 'serif'
fonts_stylesheet_url = "https://fonts.googleapis.com/css2?family=Open+Sans"

[search]
record_kind_quick_filter = false
filter_geometry_url = 'https://my.domain.org/geom.json'
advanced_filters = ['publicationYear', 'documentStandard', 'inspireKeyword', 'topic', 'license']

[[search_preset]]
sort = "-createDate"
name = 'filterByOrgs'
filters.q = 'Carto'
filters.organisation = ['Org1', 'Org2']
filters.format = ['ESRI Shapefile']
filters.topic = ['boundaries']
filters.publicationYear = ['2023', '2022']
filters.spatial = ['yes']

[translations.en]
"my.first.key" = 'First label.'
"my.second.key" = """
Second label,
on two lines."""

[translations.de]
my.first.key = 'Erste Etikett.'

[translations.fr]
my.sample.text = "Un bon exemple de texte."
"my.quoted.text" = 'du texte entre guillements.'
`

export const appConfigWithTranslationFixture = () => okAppConfigFixture()

export const minimalAppConfigFixture = () => `
[global]
geonetwork4_api_url = "/geonetwork/srv/api"
proxy_path = "/proxy/?url="

[theme]
primary_color = "#093564"
secondary_color = "#c2e9dc"
main_color = "#212029" # All-purpose text color
background_color = "#fdfbff"
`

export const mapConfigFixture = (): MapConfig => ({
  MAX_ZOOM: 10,
  MAX_EXTENT: [-418263.418776, 5251529.591305, 961272.067714, 6706890.609855],
  DO_NOT_USE_DEFAULT_BASEMAP: false,
  DO_NOT_TILE_WMS: false,
  EXTERNAL_VIEWER_URL_TEMPLATE:
    'https://example.com/myviewer/#/?actions=[{"type":"CATALOG:ADD_LAYERS_FROM_CATALOGS","layers":["${layer_name}"],"sources":[{"url":"${service_url}","type":"${service_type}"}]}]',
  EXTERNAL_VIEWER_OPEN_NEW_TAB: true,
  MAP_LAYERS: [
    {
      TYPE: 'xyz',
      URL: 'https://some-basemap-server',
    },
    {
      TYPE: 'wms',
      URL: 'https://some-wms-server',
      NAME: 'some_layername',
    },
    {
      TYPE: 'wfs',
      URL: 'https://some-wfs-server',
      NAME: 'some_layername',
    },
  ],
})

export const malformedConfigFixture = () => `
{
  "I thought": "we were still doing json"
}
`

export const missingMandatoryConfigFixture = () => `
[theme]
primary_color = "#093564"
secondary_color = "#c2e9dc"
background_color = "#fdfbff"
main_font = 'sans-serif'
`

export const wrongLanguageCodeConfigFixture = () => `
[global]
geonetwork4_api_url = "/geonetwork/srv/api"
proxy_path = "/proxy/?url="
metadata_language = "fra"

[map]

[theme]
primary_color = "#093564"
secondary_color = "#c2e9dc"
main_color = "#212029" # All-purpose text color
background_color = "#fdfbff"
`

export const unrecognizedKeysConfigFixture = () => `
[global]
geonetwork4_api_url = "/geonetwork/srv/api"
proxy_path = "/proxy/?url="
metadata_language = "fre"
another_path = '/whatever'

[map]
max_zoom = 10
max_extent = [-418263.418776, 5251529.591305, 961272.067714, 6706890.609855]
do_not_use_default_basemap = false
external_viewer_url_template = 'https://example.com/myviewer?'
external_viewer_open_new_tab = true
another_zoom = 15
[[map_layer]]
type = "wms"
url = "https://www.geo2france.fr/geoserver/cr_hdf/ows"
name = "masque_hdf_ign_carto_latin1"
[[map_layer]]
type = "wfs"
url = "https://www.geo2france.fr/geoserver/cr_hdf/ows"
name = "masque_hdf_ign_carto_latin1"
another_layer = "wrong layer definition"

[theme]
primary_color = "#093564"
secondary_color = "#c2e9dc"
main_color = "#212029" # All-purpose text color
background_color = "#fdfbff"
thumbnail_placeholder = 'assets/img/placeholder.svg'
header_background = 'teal'
header_foreground_color = "#872e2e"
main_font = 'sans-serif'
title_font = 'serif'
another_color = 'red'
`
