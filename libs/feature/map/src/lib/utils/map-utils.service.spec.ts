import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { FEATURE_COLLECTION_POLYGON_FIXTURE_4326 } from '@geonetwork-ui/util/shared'
import Feature from 'ol/Feature'
import { Polygon } from 'ol/geom'
import ImageLayer from 'ol/layer/Image'
import TileLayer from 'ol/layer/Tile'
import Map from 'ol/Map'
import ImageWMS from 'ol/source/ImageWMS'
import TileWMS from 'ol/source/TileWMS'
import XYZ from 'ol/source/XYZ'

import { MapUtilsService } from './map-utils.service'
import { readFirst } from '@nrwl/angular/testing'

jest.mock('@camptocamp/ogc-client', () => ({
  WmsEndpoint: class {
    constructor(private url) {}
    isReady() {
      return Promise.resolve({
        getLayerByName: (name) => {
          if (this.url.indexOf('error') > -1) {
            throw new Error('Something went wrong')
          }
          return {
            name,
            boundingBoxes: { 'EPSG:4326': [1.33, 48.81, 4.3, 51.1] },
          }
        },
      })
    }
  },
}))

const wmsTileLayer = new TileLayer({
  source: new TileWMS({
    url: 'url',
    params: { LAYERS: 'layerName' },
  }),
})

const wmsImageLayer = new ImageLayer({
  source: new ImageWMS({
    url: 'url',
    params: { LAYERS: 'layerName' },
  }),
})
const xyzLayer = new TileLayer({
  source: new XYZ({
    url: 'url',
  }),
})

describe('MapUtilsService', () => {
  let service: MapUtilsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(MapUtilsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#readFeatureCollection', () => {
    const collection = FEATURE_COLLECTION_POLYGON_FIXTURE_4326
    let olFeatures, featureSample: Feature<Polygon>
    describe('when no option', () => {
      beforeEach(() => {
        olFeatures = service.readFeatureCollection(collection)
        featureSample = olFeatures[0]
      })
      it('returns an array of ol Features', () => {
        expect(olFeatures).toBeInstanceOf(Array)
        expect(olFeatures.length).toBe(collection.features.length)
        expect(olFeatures.length).toBe(collection.features.length)
        expect(featureSample).toBeInstanceOf(Feature)
      })
      it('output data in 3857', () => {
        expect(
          featureSample.getGeometry().getLinearRing(0).getFirstCoordinate()
        ).toEqual([353183.8433283152, 6448353.725194501])
      })
    })
    describe('when featureProjection = 4326', () => {
      beforeEach(() => {
        olFeatures = service.readFeatureCollection(collection, 'EPSG:4326')
        featureSample = olFeatures[0]
      })
      it('output data in 4326', () => {
        expect(
          featureSample.getGeometry().getLinearRing(0).getFirstCoordinate()
        ).toEqual([3.172704445659, 50.011996744997])
      })
    })
  })

  describe('#isWMSLayer', () => {
    let layer
    describe('when WMS tile layer', () => {
      beforeEach(() => {
        layer = wmsTileLayer
      })
      it('returns true', () => {
        expect(service.isWMSLayer(layer)).toBe(true)
      })
    })
    describe('when WMS image layer', () => {
      beforeEach(() => {
        layer = wmsImageLayer
      })
      it('returns true', () => {
        expect(service.isWMSLayer(layer)).toBe(true)
      })
    })
    describe('when XYZ layer', () => {
      beforeEach(() => {
        layer = xyzLayer
      })
      it('returns false', () => {
        expect(service.isWMSLayer(layer)).toBe(false)
      })
    })
  })

  describe('#getGFIUrl', () => {
    let url
    const coordinate = [-182932.49329334166, 6125319.813853541]
    const viewMock = {
      getProjection: jest.fn(() => 'EPSG:3857'),
      getResolution: jest.fn(() => 30000),
    }
    const mapMock = {
      getView: jest.fn(() => viewMock),
    }
    beforeEach(() => {
      url = service.getGFIUrl(wmsImageLayer, mapMock, coordinate)
    })
    it('returns true', () => {
      expect(url).toEqual(
        'url?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=layerName&LAYERS=layerName&INFO_FORMAT=application%2Fjson&I=50&J=50&CRS=EPSG%3A3857&STYLES=&WIDTH=101&HEIGHT=101&BBOX=-1697932.4932933417%2C4610319.813853541%2C1332067.5067066583%2C7640319.813853541'
      )
    })
  })

  describe('#createEmptyMap', () => {
    let map
    beforeEach(() => {
      map = service.createEmptyMap()
    })
    it('creates map', () => {
      expect(map).toBeInstanceOf(Map)
    })
    it('with no control', () => {
      expect(map.getControls().getArray().length).toBe(0)
    })
    it('with no layer', () => {
      expect(map.getLayers().getArray().length).toBe(0)
    })
  })

  describe('#getLayerExtent', () => {
    describe('geojson layer', () => {
      let layer
      beforeEach(() => {
        layer = {
          type: 'geojson',
          data: FEATURE_COLLECTION_POLYGON_FIXTURE_4326,
        }
      })
      it('returns an observable emitting the aggregated extent', async () => {
        const extent = await readFirst(service.getLayerExtent(layer))
        expect(extent).toEqual([
          -571959.6817241046, 5065908.545923665, 1064128.2009725596,
          6636971.049871371,
        ])
      })
    })
    describe('geojson layer with invalid geometry', () => {
      let layer
      beforeEach(() => {
        layer = {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [NaN, NaN] },
                properties: { code: '02', nom: 'Aisne' },
              },
            ],
          },
        }
      })
      it('returns an observable emitting null', async () => {
        const extent = await readFirst(service.getLayerExtent(layer))
        expect(extent).toEqual(null)
      })
    })
    describe('WMS layer', () => {
      let layer
      describe('extent available in capabilities', () => {
        beforeEach(() => {
          layer = {
            type: 'wms',
            name: 'mock',
            url: 'http://mock/wms',
          }
        })
        it('returns an observable emitting the advertised extent', async () => {
          const extent = await readFirst(service.getLayerExtent(layer))
          expect(extent).toEqual([
            148054.92275505388, 6242683.64671384, 478673.81041107635,
            6639001.66376131,
          ])
        })
      })
      describe('extent not available in capabilities', () => {
        beforeEach(() => {
          layer = {
            type: 'wms',
            name: 'mock',
            url: 'http://error/wms',
          }
        })
        it('returns an observable that errors with a translatable error', async () => {
          try {
            await readFirst(service.getLayerExtent(layer))
          } catch (e) {
            expect(e.message).toEqual('Something went wrong')
          }
        })
      })
    })
  })
  describe('#getViewFromExtent', () => {
    const extent = [0, 0, 100, 100]
    const map = new Map({})
    map.setSize([100, 100])
    it('gets view for map from extent', () => {
      expect(service.getViewFromExtent(extent, map)).toEqual({
        center: [50, 50],
        zoom: 17.256199785269995,
      })
    })
  })
})
