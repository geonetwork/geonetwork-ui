import type { FeatureCollection } from 'geojson'
import { Coordinate } from 'ol/coordinate'
import type { Extent } from 'ol/extent'
import { Options } from 'ol/source/WMTS'

export enum MapContextLayerTypeEnum {
  XYZ = 'xyz',
  WMS = 'wms',
  WMTS = 'wmts',
  WFS = 'wfs',
  GEOJSON = 'geojson',
}

export interface MapContextModel {
  layers: MapContextLayerModel[]
  view?: MapContextViewModel
}

export interface MapContextLayerWmsModel {
  type: 'wms'
  url: string
  name: string
}

export interface MapContextLayerWmtsModel {
  type: 'wmts'
  options: Options
}

interface MapContextLayerWfsModel {
  type: 'wfs'
  url: string
  name: string
}

interface LayerXyzModel {
  type: 'xyz'
  name?: string
}
interface LayerXyzModelWithUrl extends LayerXyzModel {
  url: string
  urls?: never
}
interface LayerXyzModelWithUrls extends LayerXyzModel {
  urls: string[]
  url?: never
}
export type MapContextLayerXyzModel =
  | LayerXyzModelWithUrl
  | LayerXyzModelWithUrls

interface LayerGeojson {
  type: 'geojson'
}
interface LayerGeojsonWithUrl extends LayerGeojson {
  url: string
  data?: never
}
interface LayerGeojsonWithData extends LayerGeojson {
  data: FeatureCollection | string
  url?: never
}
export type MapContextLayerGeojsonModel =
  | LayerGeojsonWithUrl
  | LayerGeojsonWithData

export type MapContextLayerModel =
  | MapContextLayerWmsModel
  | MapContextLayerWmtsModel
  | MapContextLayerWfsModel
  | MapContextLayerXyzModel
  | MapContextLayerGeojsonModel

export interface MapContextViewModel {
  center?: Coordinate // expressed in long/lat (EPSG:4326)
  zoom?: number
  extent?: Extent // expressed in long/lat (EPSG:4326)
  maxZoom?: number
  maxExtent?: Extent // expressed in long/lat (EPSG:4326)
}
