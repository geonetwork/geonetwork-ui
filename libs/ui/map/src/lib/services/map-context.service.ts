import { Injectable } from '@angular/core'
import {
  MapContextLayerModel,
  MapContextLayerTypeEnum,
  MapContextModel,
  MapContextViewModel,
} from '../models/map-context.model'
import Map from 'ol/Map'
import View from 'ol/View'
import Layer from 'ol/layer/Base'
import VectorLayer from 'ol/layer/Vector'
import TileWMS from 'ol/source/TileWMS'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import VectorSource from 'ol/source/Vector'
import { MapUtilsService } from './map-utils.service'

@Injectable({
  providedIn: 'root',
})
export class MapContextService {
  constructor(private mapUtils: MapUtilsService) {}

  createMap(mapContext: MapContextModel): Map {
    const map = this.createEmptyMap()
    map.setView(this.createView(mapContext.view))
    mapContext.layers.forEach((layer) => map.addLayer(this.createLayer(layer)))
    return map
  }

  createLayer(layerModel: MapContextLayerModel): Layer {
    const { type, url } = layerModel
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
            params: { LAYERS: layerModel.name },
          }),
        })
      case MapContextLayerTypeEnum.GEOJSON:
        const { data } = layerModel
        const features = this.mapUtils.readFeatureCollection(data)
        return new VectorLayer({
          source: new VectorSource({
            features,
          }),
        })
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

  private createEmptyMap(): Map {
    const map = new Map({
      controls: [],
      pixelRatio: 1,
    })
    return map
  }
}
