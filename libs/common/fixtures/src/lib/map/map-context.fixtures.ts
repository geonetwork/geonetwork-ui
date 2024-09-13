import { polygonFeatureCollectionFixture } from '../geojson.fixtures'
import { Extent } from 'ol/extent'
import type {
  MapContext,
  MapContextLayer,
  MapContextView,
} from '@geospatial-sdk/core'

export const mapCtxLayerXyzFixture = (): MapContextLayer => ({
  type: 'xyz',
  url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attributions: '<a href="https://www.openstreetmap.org/copyright">',
})

export const mapCtxLayerWmsFixture = (): MapContextLayer => ({
  type: 'wms',
  url: 'https://www.geograndest.fr/geoserver/region-grand-est/ows?REQUEST=GetCapabilities&SERVICE=WMS',
  name: 'commune_actuelle_3857',
})

export const mapCtxLayerWfsFixture = (): MapContextLayer => ({
  type: 'wfs',
  url: 'https://www.geograndest.fr/geoserver/region-grand-est/ows?REQUEST=GetCapabilities&SERVICE=WFS&VERSION=1.1.0',
  featureType: 'ms:commune_actuelle_3857',
})

export const mapCtxLayerGeojsonFixture = (): MapContextLayer => ({
  type: 'geojson',
  data: polygonFeatureCollectionFixture(),
})

export const mapCtxLayerGeojsonRemoteFixture = (): MapContextLayer => ({
  type: 'geojson',
  url: 'https://my.host.com/data/regions.json',
})

export const mapCtxViewFixture = (): MapContextView => ({
  center: [7.75, 48.6],
  zoom: 9,
})

export const mapCtxFixture = (): MapContext => ({
  layers: [
    mapCtxLayerXyzFixture(),
    mapCtxLayerWmsFixture(),
    mapCtxLayerGeojsonFixture(),
  ],
  view: mapCtxViewFixture(),
})

export const mapCtxExtentFixture = (): Extent => [
  171083.69713494915, 6246047.945419401, 476970.39956295764, 6631079.362882684,
]
