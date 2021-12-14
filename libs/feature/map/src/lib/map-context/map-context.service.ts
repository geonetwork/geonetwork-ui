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

@Injectable({
  providedIn: 'root',
})
export class MapContextService {
  private style = this.styleService.createDefaultStyle()
  constructor(
    private mapUtils: MapUtilsService,
    private styleService: MapStyleService
  ) {}

  resetMapFromContext(map: Map, mapContext: MapContextModel): Map {
    if (mapContext.view) {
      map.setView(this.createView(mapContext.view))
    }
    map.getLayers().clear()
    mapContext.layers.forEach((layer) => map.addLayer(this.createLayer(layer)))
    return map
  }

  createLayer(layerModel: MapContextLayerModel): Layer {
    const { type, url, name } = layerModel
    const style = this.style
    switch (type) {
      case MapContextLayerTypeEnum.XYZ:
        return new TileLayer({
          source: new XYZ({
            url,
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

  createView(viewModel: MapContextViewModel): View {
    const { center, zoom } = viewModel
    return new View({
      center,
      zoom,
      multiWorld: true,
      constrainResolution: true,
    })
  }
}
