import type { FeatureCollection } from 'geojson'

export enum MapContextLayerTypeEnum {
  XYZ = 'xyz',
  WMS = 'wms',
  WFS = 'wfs',
  GEOJSON = 'geojson',
}

export interface MapContextModel {
  layers: MapContextLayerModel[]
  view?: MapContextViewModel
  extent?: MapContextExtentModel
}

export interface MapContextLayerModel {
  type: MapContextLayerTypeEnum
  url?: string
  urls?: string[]
  name?: string
  data?: FeatureCollection
}

export interface MapContextViewModel {
  center: number[] //expressed in map projection (EPSG:3857)
  zoom: number
  maxZoom?: number
}
export type MapContextExtentModel = number[] //expressed in map projection (EPSG:3857)
