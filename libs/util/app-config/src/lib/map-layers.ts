import { LayerConfig } from './model'
import { MapContextLayer } from '@geospatial-sdk/core'

export function getMapContextLayerFromConfig(
  config: LayerConfig
): MapContextLayer {
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
    case 'maplibre-style':
      return {
        type: config.TYPE,
        styleUrl: config.STYLE_URL,
        accessToken: config.ACCESS_TOKEN,
      }
  }
}
