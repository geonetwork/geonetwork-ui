import { polygonFeatureCollectionFixture } from '@geonetwork-ui/common/fixtures'
import { Extent } from 'ol/extent'
import {
  MapContextLayerGeojsonModel,
  MapContextLayerModel,
  MapContextLayerTypeEnum,
  MapContextModel,
  MapContextViewModel,
} from '../map-context/map-context.model'

export const mapCtxLayerXyzFixture = (): MapContextLayerModel => ({
  type: MapContextLayerTypeEnum.XYZ,
  url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
})

export const mapCtxLayerWmsFixture = (): MapContextLayerModel => ({
  type: MapContextLayerTypeEnum.WMS,
  url: 'https://www.geograndest.fr/geoserver/region-grand-est/ows?REQUEST=GetCapabilities&SERVICE=WMS',
  name: 'commune_actuelle_3857',
})

export const mapCtxLayerWfsFixture = (): MapContextLayerModel => ({
  type: MapContextLayerTypeEnum.WFS,
  url: 'https://www.geograndest.fr/geoserver/region-grand-est/ows?REQUEST=GetCapabilities&SERVICE=WFS&VERSION=1.1.0',
  name: 'ms:commune_actuelle_3857',
})

export const mapCtxLayerGeojsonFixture = (): MapContextLayerGeojsonModel => ({
  type: MapContextLayerTypeEnum.GEOJSON,
  data: polygonFeatureCollectionFixture(),
})

export const mapCtxLayerGeojsonRemoteFixture =
  (): MapContextLayerGeojsonModel => ({
    type: MapContextLayerTypeEnum.GEOJSON,
    url: 'https://my.host.com/data/regions.json',
  })

export const mapCtxViewFixture = (): MapContextViewModel => ({
  center: [7.75, 48.6],
  zoom: 9,
})

export const mapCtxFixture = (): MapContextModel => ({
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
