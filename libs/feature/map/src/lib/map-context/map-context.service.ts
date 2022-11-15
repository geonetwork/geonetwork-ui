import { Injectable } from '@angular/core'
import { MapStyleService } from '../style/map-style.service'
import { MapUtilsService } from '../utils/map-utils.service'
import { LayerConfig, MapConfig } from '@geonetwork-ui/util/app-config'
import {
  MapContextLayerModel,
  MapContextModel,
  MapContextViewModel,
} from '@geonetwork-ui/feature/map'

export const DEFAULT_VIEW: MapContextViewModel = {
  center: [0, 15],
  zoom: 2,
}

@Injectable({
  providedIn: 'root',
})
export class MapContextModelService {
  constructor(
    private mapUtils: MapUtilsService,
    private styleService: MapStyleService
  ) {}

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
