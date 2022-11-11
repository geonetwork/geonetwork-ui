import {
  MapContext,
  MapContextLayer,
  MapContextLayerGeojson,
  MapContextLayerWfs,
  MapContextLayerWms,
  MapContextLayerWmts,
  MapContextLayerXyz,
  MapContextView,
} from 'native-map'

export enum MapContextLayerTypeEnum {
  XYZ = 'xyz',
  WMS = 'wms',
  WMTS = 'wmts',
  WFS = 'wfs',
  GEOJSON = 'geojson',
}

export type MapContextModel = MapContext

export type MapContextLayerWmsModel = MapContextLayerWms

export type MapContextLayerWmtsModel = MapContextLayerWmts

export type MapContextLayerWfsModel = MapContextLayerWfs

export type MapContextLayerXyzModel = MapContextLayerXyz

export type MapContextLayerGeojsonModel = MapContextLayerGeojson

export type MapContextLayerModel = MapContextLayer

export type MapContextViewModel = MapContextView
