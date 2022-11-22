import { Injectable } from '@angular/core'
import { LayerConfig } from '@geonetwork-ui/util/app-config'
import {
  MapContextLayerModel,
  MapContextViewModel,
} from '@geonetwork-ui/feature/map'

export const DEFAULT_VIEW: MapContextViewModel = {
  center: [0, 15],
  zoom: 2,
}

@Injectable({
  providedIn: 'root',
})
export class MapContextService {
  constructor() {}

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
