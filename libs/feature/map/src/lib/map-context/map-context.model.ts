import type { FeatureCollection } from 'geojson'
import { Coordinate } from 'ol/coordinate'
import type { Extent } from 'ol/extent'

export enum MapContextLayerTypeEnum {
  XYZ = 'xyz',
  WMS = 'wms',
  WFS = 'wfs',
  GEOJSON = 'geojson',
}

export interface MapContextModel {
  layers: MapContextLayerModel[]
  view?: MapContextViewModel
}

export interface MapContextLayerModel {
  type: MapContextLayerTypeEnum
  url?: string
  urls?: string[]
  name?: string
  data?: FeatureCollection
}

export interface MapContextViewModel {
  center?: Coordinate //expressed in map projection (EPSG:3857)
  zoom?: number
  extent?: Extent //expressed in map projection (EPSG:3857)
  maxZoom?: number
}
