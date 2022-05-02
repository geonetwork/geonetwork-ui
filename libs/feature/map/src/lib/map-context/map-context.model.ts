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

export interface MapContextLayerWmsModel {
  type: 'wms'
  url: string
  name: string
}

interface MapContextLayerWfsModel {
  type: 'wfs'
  url: string
  name: string
}

interface LayerXyzModel {
  type: 'xyz'
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
  | MapContextLayerWfsModel
  | MapContextLayerXyzModel
  | MapContextLayerGeojsonModel

export interface MapContextViewModel {
  center?: Coordinate //expressed in map projection (EPSG:3857)
  zoom?: number
  extent?: Extent //expressed in map projection (EPSG:3857)
  maxZoom?: number
  maxExtent?: Extent //expressed in map projection (EPSG:3857)
}
