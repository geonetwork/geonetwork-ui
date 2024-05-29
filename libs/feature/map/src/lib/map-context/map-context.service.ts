import { Injectable } from '@angular/core'
import { MapStyleService } from '../style/map-style.service'
import {
  MapContextLayerModel,
  MapContextLayerTypeEnum,
  MapContextLayerXyzModel,
  MapContextModel,
  MapContextViewModel,
} from './map-context.model'
import Map from 'ol/Map'
import View from 'ol/View'
import Layer from 'ol/layer/Base'
import VectorLayer from 'ol/layer/Vector'
import TileWMS from 'ol/source/TileWMS'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { MapUtilsService } from '../utils/map-utils.service'
import { bbox as bboxStrategy } from 'ol/loadingstrategy'
import { LayerConfig, MapConfig } from '@geonetwork-ui/util/app-config'
import { FeatureCollection } from 'geojson'
import { fromLonLat } from 'ol/proj'
import WMTS from 'ol/source/WMTS'
import { Geometry } from 'ol/geom'
import Feature from 'ol/Feature'
import { WfsEndpoint, WmtsEndpoint } from '@camptocamp/ogc-client'
import OGCVectorTile from 'ol/source/OGCVectorTile.js'
import { MVT } from 'ol/format'
import VectorTileLayer from 'ol/layer/VectorTile'
import OGCMapTile from 'ol/source/OGCMapTile.js'

export const DEFAULT_BASELAYER_CONTEXT: MapContextLayerXyzModel = {
  type: MapContextLayerTypeEnum.XYZ,
  urls: [
    `https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png`,
    `https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png`,
    `https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png`,
  ],
  attributions: `<span>© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="https://carto.com/">Carto</a></span>`,
}

export const DEFAULT_VIEW: MapContextViewModel = {
  center: [0, 15],
  zoom: 2,
}

export const WFS_MAX_FEATURES = 10000

@Injectable({
  providedIn: 'root',
})
export class MapContextService {
  constructor(
    private mapUtils: MapUtilsService,
    private styleService: MapStyleService
  ) {}

  resetMapFromContext(
    map: Map,
    mapContext: MapContextModel,
    mapConfig?: MapConfig
  ): Map {
    if (mapConfig) {
      mapContext = this.mergeMapConfigWithContext(mapContext, mapConfig)
    } else {
      mapContext.layers = this.addDefaultBaselayerContext(mapContext.layers)
    }
    if (
      !mapContext.view?.extent &&
      (!mapContext.view?.center || !mapContext.view?.zoom)
    ) {
      mapContext.view = this.getFallbackView(mapConfig)
    }
    map.setView(this.createView(mapContext.view, map))
    map.getLayers().clear()
    mapContext.layers.forEach((layer) => map.addLayer(this.createLayer(layer)))
    return map
  }

  createLayer(layerModel: MapContextLayerModel): Layer {
    const { type } = layerModel
    const style = this.styleService.styles.default
    switch (type) {
      case MapContextLayerTypeEnum.OGCAPI:
        if (layerModel.layerType === 'vectorTiles') {
          return new VectorTileLayer({
            source: new OGCVectorTile({
              url: layerModel.url,
              format: new MVT(),
              attributions: layerModel.attributions,
            }),
          })
        } else if (layerModel.layerType === 'mapTiles') {
          return new TileLayer({
            source: new OGCMapTile({
              url: layerModel.url,
              attributions: layerModel.attributions,
            }),
          })
        } else {
          return new VectorLayer({
            source: new VectorSource({
              format: new GeoJSON(),
              url: layerModel.url,
              attributions: layerModel.attributions,
            }),
            style,
          })
        }
      case MapContextLayerTypeEnum.XYZ:
        return new TileLayer({
          source: new XYZ({
            url: 'url' in layerModel ? layerModel.url : undefined,
            urls: 'urls' in layerModel ? layerModel.urls : undefined,
            attributions: layerModel.attributions,
          }),
        })
      case MapContextLayerTypeEnum.WMS:
        return new TileLayer({
          source: new TileWMS({
            url: layerModel.url,
            params: { LAYERS: layerModel.name },
            gutter: 20,
            attributions: layerModel.attributions,
          }),
        })
      case MapContextLayerTypeEnum.WMTS: {
        // TODO: isolate this in utils service
        const olLayer = new TileLayer({})
        const endpoint = new WmtsEndpoint(layerModel.url)
        endpoint.isReady().then(async (endpoint) => {
          const layerName = endpoint.getSingleLayerName() ?? layerModel.name
          const layer = endpoint.getLayerByName(layerName)
          const matrixSet = layer.matrixSets[0]
          const tileGrid = await endpoint.getOpenLayersTileGrid(layer.name)
          const resourceUrl = layer.resourceLinks[0]
          const dimensions = endpoint.getDefaultDimensions(layer.name)
          olLayer.setSource(
            new WMTS({
              layer: layer.name,
              style: layer.defaultStyle,
              matrixSet: matrixSet.identifier,
              format: resourceUrl.format,
              url: resourceUrl.url,
              requestEncoding: resourceUrl.encoding,
              tileGrid,
              projection: matrixSet.crs,
              dimensions,
              attributions: layerModel.attributions,
            })
          )
        })
        return olLayer
      }
      case MapContextLayerTypeEnum.WFS: {
        const olLayer = new VectorLayer({
          style,
        })
        new WfsEndpoint(layerModel.url).isReady().then((endpoint) => {
          const featureType =
            endpoint.getSingleFeatureTypeName() ?? layerModel.name
          olLayer.setSource(
            new VectorSource({
              format: new GeoJSON(),
              url: function (extent: [number, number, number, number]) {
                return endpoint.getFeatureUrl(featureType, {
                  maxFeatures: WFS_MAX_FEATURES,
                  asJson: true,
                  outputCrs: 'EPSG:3857',
                  extent,
                  extentCrs: 'EPSG:3857',
                })
              },
              strategy: bboxStrategy,
              attributions: layerModel.attributions,
            })
          )
        })
        return olLayer
      }
      case MapContextLayerTypeEnum.GEOJSON: {
        if ('url' in layerModel) {
          return new VectorLayer({
            source: new VectorSource({
              format: new GeoJSON(),
              url: layerModel.url,
            }),
            style,
          })
        } else {
          let geojson = layerModel.data
          if (typeof geojson === 'string') {
            try {
              geojson = JSON.parse(geojson)
            } catch (e) {
              console.warn('A layer could not be created', layerModel, e)
              geojson = { type: 'FeatureCollection', features: [] }
            }
          }
          const features = this.mapUtils.readFeatureCollection(
            geojson as FeatureCollection
          ) as Feature<Geometry>[]
          return new VectorLayer({
            source: new VectorSource({
              features,
            }),
            style,
          })
        }
      }
      default:
        throw new Error(`Unrecognized layer type: ${layerModel.type}`)
    }
  }

  createView(viewModel: MapContextViewModel, map?: Map): View {
    const { center: centerInViewProj, zoom, maxZoom, maxExtent } = viewModel
    const center = centerInViewProj
      ? fromLonLat(centerInViewProj, 'EPSG:3857')
      : [0, 0]
    const view = new View({
      center,
      zoom,
      maxZoom,
      extent: maxExtent,
      multiWorld: false,
      constrainResolution: true,
    })
    if (viewModel.extent && map) {
      view.fit(viewModel.extent, {
        size: map.getSize(),
      })
    }
    return view
  }

  addDefaultBaselayerContext(
    layers: MapContextLayerModel[]
  ): MapContextLayerModel[] {
    return layers.includes(DEFAULT_BASELAYER_CONTEXT)
      ? layers
      : [DEFAULT_BASELAYER_CONTEXT, ...layers]
  }

  mergeMapConfigWithContext(
    mapContext: MapContextModel,
    mapConfig: MapConfig
  ): MapContextModel {
    return {
      ...mapContext,
      view: {
        ...mapContext.view,
        ...(mapConfig.MAX_ZOOM && {
          maxZoom: mapConfig.MAX_ZOOM,
        }),
        ...(mapConfig.MAX_EXTENT && {
          maxExtent: mapConfig.MAX_EXTENT,
        }),
      },
      layers: [
        ...(mapConfig.DO_NOT_USE_DEFAULT_BASEMAP
          ? []
          : [DEFAULT_BASELAYER_CONTEXT]),
        ...mapConfig.MAP_LAYERS.map(this.getContextLayerFromConfig),
        ...mapContext.layers,
      ],
    }
  }

  getFallbackView(mapConfig: MapConfig): MapContextViewModel {
    return mapConfig?.MAX_EXTENT
      ? { extent: mapConfig.MAX_EXTENT }
      : DEFAULT_VIEW
  }

  getContextLayerFromConfig(config: LayerConfig): MapContextLayerModel {
    switch (config.TYPE) {
      case 'wms':
        return {
          type: 'wms',
          url: config.URL,
          name: config.NAME,
        }
      case 'wfs':
        return {
          type: 'wfs',
          url: config.URL,
          name: config.NAME,
        }
      case 'xyz':
        return {
          type: config.TYPE,
          url: config.URL,
          name: config.NAME,
        }
      case 'geojson':
        return {
          type: config.TYPE,
          ...(config.DATA ? { data: config.DATA } : { url: config.URL }),
        }
    }
  }
}
