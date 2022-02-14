import { FEATURE_COLLECTION_POLYGON_FIXTURE_4326 } from '@geonetwork-ui/util/shared'
import { Extent } from 'ol/extent'
import {
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
  url: 'https://www.geograndest.fr/geoserver/region-grand-est/ows?',
  name: 'commune_actuelle_3857',
}
export const MAP_CTX_LAYER_GEOJSON_FIXTURE: MapContextLayerModel = {
  type: MapContextLayerTypeEnum.GEOJSON,
  data: FEATURE_COLLECTION_POLYGON_FIXTURE_4326,
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
