import { Injectable } from '@angular/core'
import { MapStyleService } from '../style/map-style.service'
import {
  MapContextLayerModel,
  MapContextLayerTypeEnum,
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
import { MapUtilsService } from '../utils/map-utils.service'
import { bbox as bboxStrategy } from 'ol/loadingstrategy'
import GeoJSON from 'ol/format/GeoJSON'
import { MapConfig } from '@geonetwork-ui/util/app-config'

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
    }
    if (mapContext.view) {
      map.setView(this.createView(mapContext.view, map))
    }
    map.getLayers().clear()
    mapContext.layers.forEach((layer) => map.addLayer(this.createLayer(layer)))
    return map
  }

  createLayer(layerModel: MapContextLayerModel): Layer {
    const { type, url, urls, name } = layerModel
    const style = this.styleService.styles.default
    switch (type) {
      case MapContextLayerTypeEnum.XYZ:
        return new TileLayer({
          source: new XYZ({
            url,
            urls,
          }),
        })
      case MapContextLayerTypeEnum.WMS:
        return new TileLayer({
          source: new TileWMS({
            url,
            params: { LAYERS: name },
          }),
        })
      case MapContextLayerTypeEnum.WFS:
        return new VectorLayer({
          source: new VectorSource({
            format: new GeoJSON(),
            url: function (extent) {
              return `${url}?service=WFS&version=1.1.0&request=GetFeature&outputFormat=application/json&typename=${name}&srsname=EPSG:3857&bbox=${extent.join(
                ','
              )},EPSG:3857`
            },
            strategy: bboxStrategy,
          }),
          style,
        })
      case MapContextLayerTypeEnum.GEOJSON: {
        const { data } = layerModel
        const features = this.mapUtils.readFeatureCollection(data)
        return new VectorLayer({
          source: new VectorSource({
            features,
          }),
          style,
        })
      }
    }
  }

  createView(viewModel: MapContextViewModel, map?: Map): View {
    if (viewModel.extent && map) {
      const { center, zoom } = this.mapUtils.getViewFromExtent(
        viewModel.extent,
        map
      )
      viewModel = { ...viewModel, center, zoom }
    }
    const { center, zoom, maxZoom, maxExtent } = viewModel
    return new View({
      center,
      zoom,
      maxZoom,
      extent: maxExtent,
      multiWorld: false,
      constrainResolution: true,
    })
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
    }
  }
}
