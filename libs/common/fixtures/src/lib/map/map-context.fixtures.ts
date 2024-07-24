import { FEATURE_COLLECTION_POLYGON_FIXTURE_4326 } from '@geonetwork-ui/common/fixtures'
import { Extent } from 'ol/extent'
import {
  MapContext,
  MapContextLayer,
  MapContextLayerGeojson,
  MapContextView,
} from '@geospatial-sdk/core'
import { deepFreeze } from '../utils'

export const MAP_CTX_LAYER_XYZ_FIXTURE: MapContextLayer = {
  type: 'xyz',
  url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attributions: '<a href="https://www.openstreetmap.org/copyright">',
}
export const MAP_CTX_LAYER_WMS_FIXTURE: MapContextLayer = {
  type: 'wms',
  url: 'https://www.geograndest.fr/geoserver/region-grand-est/ows?REQUEST=GetCapabilities&SERVICE=WMS',
  name: 'commune_actuelle_3857',
}
export const MAP_CTX_LAYER_WFS_FIXTURE: MapContextLayer = {
  type: 'wfs',
  url: 'https://www.geograndest.fr/geoserver/region-grand-est/ows?REQUEST=GetCapabilities&SERVICE=WFS&VERSION=1.1.0',
  featureType: 'ms:commune_actuelle_3857',
}
export const MAP_CTX_LAYER_GEOJSON_FIXTURE: MapContextLayerGeojson = {
  type: 'geojson',
  data: FEATURE_COLLECTION_POLYGON_FIXTURE_4326,
}
export const MAP_CTX_LAYER_GEOJSON_REMOTE_FIXTURE: MapContextLayerGeojson = {
  type: 'geojson',
  url: 'https://my.host.com/data/regions.json',
}

export const MAP_CTX_VIEW_FIXTURE: MapContextView = {
  center: [7.75, 48.6],
  zoom: 9,
}

export const MAP_CTX_FIXTURE: MapContext = deepFreeze({
  layers: [
    MAP_CTX_LAYER_XYZ_FIXTURE,
    MAP_CTX_LAYER_WMS_FIXTURE,
    MAP_CTX_LAYER_GEOJSON_FIXTURE,
  ],
  view: MAP_CTX_VIEW_FIXTURE,
})

export const MAP_CTX_EXTENT_FIXTURE: Extent = [
  171083.69713494915, 6246047.945419401, 476970.39956295764, 6631079.362882684,
]
