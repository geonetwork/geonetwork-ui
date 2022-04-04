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

interface MapContextLayerWmsModel {
  type: 'wms'
  url: string
  name: string
}

interface MapContextLayerWfsModel {
  type: 'wfs'
  url: string
  name: string
}

type MapContextLayerXyzModel = {
  type: 'xyz'
} & ({ url: string } | { urls: string[] })

type MapContextLayerGeojsonModel = {
  type: 'geojson'
} & ({ url: string } | { data: FeatureCollection | string })

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
