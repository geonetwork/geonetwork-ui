import { FeatureCollection } from 'geojson'

export enum MapContextLayerTypeEnum {
  XYZ = 'xyz',
  WMS = 'wms',
  GEOJSON = 'geojson',
}

export interface MapContextModel {
  layers: MapContextLayerModel[]
  view?: MapContextViewModel
}

export interface MapContextLayerModel {
  type: MapContextLayerTypeEnum
  url?: string
  name?: string
  data?: FeatureCollection
}

export interface MapContextViewModel {
  center: [number, number]
  zoom: number
}
