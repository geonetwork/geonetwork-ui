import { FEATURE_COLLECTION_POLYGON_FIXTURE_4326 } from '@geonetwork-ui/common/fixtures'
import { Extent } from 'ol/extent'
import {
  MapContextLayerGeojsonModel,
  MapContextLayerModel,
  MapContextLayerTypeEnum,
  MapContextModel,
  MapContextViewModel,
} from '../map-context/map-context.model'

export const MAP_CTX_LAYER_XYZ_FIXTURE: MapContextLayerModel = {
  type: MapContextLayerTypeEnum.XYZ,
  url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
}
export const MAP_CTX_LAYER_WMS_FIXTURE: MapContextLayerModel = {
  type: MapContextLayerTypeEnum.WMS,
  url: 'https://www.geograndest.fr/geoserver/region-grand-est/ows?REQUEST=GetCapabilities&SERVICE=WMS',
  name: 'commune_actuelle_3857',
}
export const MAP_CTX_LAYER_WFS_FIXTURE: MapContextLayerModel = {
  type: MapContextLayerTypeEnum.WFS,
  url: 'https://www.geograndest.fr/geoserver/region-grand-est/ows?REQUEST=GetCapabilities&SERVICE=WFS&VERSION=1.1.0',
  name: 'ms:commune_actuelle_3857',
}
export const MAP_CTX_LAYER_GEOJSON_FIXTURE: MapContextLayerGeojsonModel = {
  type: MapContextLayerTypeEnum.GEOJSON,
  data: FEATURE_COLLECTION_POLYGON_FIXTURE_4326,
}
export const MAP_CTX_LAYER_GEOJSON_REMOTE_FIXTURE: MapContextLayerGeojsonModel =
  {
    type: MapContextLayerTypeEnum.GEOJSON,
    url: 'https://my.host.com/data/regions.json',
  }

export const MAP_CTX_VIEW_FIXTURE: MapContextViewModel = {
  center: [7.75, 48.6],
  zoom: 9,
}

export const MAP_CTX_FIXTURE: MapContextModel = {
  layers: [
    MAP_CTX_LAYER_XYZ_FIXTURE,
    MAP_CTX_LAYER_WMS_FIXTURE,
    MAP_CTX_LAYER_GEOJSON_FIXTURE,
  ],
  view: MAP_CTX_VIEW_FIXTURE,
}

export const MAP_CTX_EXTENT_FIXTURE: Extent = [
  171083.69713494915, 6246047.945419401, 476970.39956295764, 6631079.362882684,
]
