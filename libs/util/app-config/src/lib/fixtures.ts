import { MapConfig } from './app-config'

export const CONFIG_WITH_TRANSLATIONS = `
[global]
geonetwork4_api_url = "/geonetwork/srv/api"
proxy_path = "/proxy/?url="

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

export const CONFIG_MINIMAL = `
[global]
geonetwork4_api_url = "/geonetwork/srv/api"
proxy_path = "/proxy/?url="

[map]

[theme]
primary_color = "#093564"
secondary_color = "#c2e9dc"
main_color = "#212029" # All-purpose text color
background_color = "#fdfbff"
`

export const MAP_CONFIG_FIXTURE: MapConfig = {
  MAX_ZOOM: 10,
  MAX_EXTENT: [-418263.418776, 5251529.591305, 961272.067714, 6706890.609855],
  DO_NOT_USE_DEFAULT_BASEMAP: false,
  EXTERNAL_VIEWER_URL_TEMPLATE:
    'https://example.com/myviewer?url=${service_url}&name=${layer_name}&type=${service_type}',
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
}
