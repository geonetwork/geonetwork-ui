import { Injectable } from '@angular/core'
import { LayerConfig } from '@geonetwork-ui/util/app-config'
import { MapContextLayer } from '@geospatial-sdk/core'

@Injectable({
  providedIn: 'root',
})
export class MapContextService {
  // mergeMapConfigWithContext(
  //   mapContext: MapContextModel,
  //   mapConfig: MapConfig
  // ): MapContextModel {
  //   return {
  //     ...mapContext,
  //     view: {
  //       ...mapContext.view,
  //       ...(mapConfig.MAX_ZOOM && {
  //         maxZoom: mapConfig.MAX_ZOOM,
  //       }),
  //       ...(mapConfig.MAX_EXTENT && {
  //         maxExtent: mapConfig.MAX_EXTENT,
  //       }),
  //     },
  //     layers: [
  //       ...(mapConfig.DO_NOT_USE_DEFAULT_BASEMAP
  //         ? []
  //         : [DEFAULT_BASELAYER_CONTEXT]),
  //       ...mapConfig.MAP_LAYERS.map(this.getContextLayerFromConfig),
  //       ...mapContext.layers,
  //     ],
  //   }
  // }

  // getFallbackView(mapConfig: MapConfig): MapContextViewModel {
  //   return mapConfig?.MAX_EXTENT
  //     ? { extent: mapConfig.MAX_EXTENT }
  //     : DEFAULT_VIEW
  // }

  getContextLayerFromConfig(config: LayerConfig): MapContextLayer {
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
          featureType: config.NAME,
        }
      case 'xyz':
        return {
          type: config.TYPE,
          url: config.URL,
        }
      case 'geojson':
        return {
          type: config.TYPE,
          ...(config.DATA ? { data: config.DATA } : { url: config.URL }),
        }
    }
  }
}
