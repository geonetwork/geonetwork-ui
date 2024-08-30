import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { polygonFeatureCollectionFixture } from '@geonetwork-ui/common/fixtures'
import Feature from 'ol/Feature'
import { Polygon } from 'ol/geom'
import ImageLayer from 'ol/layer/Image'
import TileLayer from 'ol/layer/Tile'
import Map from 'ol/Map'
import ImageWMS from 'ol/source/ImageWMS'
import TileWMS from 'ol/source/TileWMS'
import XYZ from 'ol/source/XYZ'
import {
  dragPanCondition,
  MapUtilsService,
  mouseWheelZoomCondition,
} from './map-utils.service'
import {
  defaults,
  DragPan,
  DragRotate,
  MouseWheelZoom,
  PinchRotate,
} from 'ol/interaction'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import MapBrowserEvent from 'ol/MapBrowserEvent'
import * as olProjProj4 from 'ol/proj/proj4'
import * as olProj from 'ol/proj'
import { fromLonLat, get } from 'ol/proj'

jest.mock('@camptocamp/ogc-client', () => ({
  WmsEndpoint: class {
    constructor(private url) {}
    isReady() {
      return Promise.resolve({
        getLayerByName: (name) => {
          if (name.includes('error')) {
            throw new Error('Something went wrong')
          }
          let boundingBoxes
          if (name.includes('nobbox')) {
            boundingBoxes = {}
          } else if (name.includes('4326')) {
            boundingBoxes = {
              'EPSG:4326': [1, 2.6, 3.3, 4.2],
              'CRS:84': [2.3, 50.6, 2.8, 50.9],
            }
          } else if (name.includes('2154')) {
            boundingBoxes = {
              'EPSG:2154': [650796.4, 7060330.6, 690891.3, 7090402.2],
            }
          } else {
            boundingBoxes = {
              'CRS:84': [2.3, 50.6, 2.8, 50.9],
              'EPSG:2154': [650796.4, 7060330.6, 690891.3, 7090402.2],
            }
          }
          return {
            name,
            boundingBoxes,
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
    jest.clearAllMocks()
  })

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
    const collection = polygonFeatureCollectionFixture()
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
        'url?QUERY_LAYERS=layerName&INFO_FORMAT=application%2Fjson&REQUEST=GetFeatureInfo&SERVICE=WMS&VERSION=1.3.0&FORMAT=image%2Fpng&STYLES=&TRANSPARENT=true&LAYERS=layerName&I=50&J=50&WIDTH=101&HEIGHT=101&CRS=EPSG%3A3857&BBOX=-1697932.4932933417%2C4610319.813853541%2C1332067.5067066583%2C7640319.813853541'
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
      expect(map.getControls().getArray().length).toBe(3)
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
          data: polygonFeatureCollectionFixture(),
        }
      })
      it('returns an observable emitting the aggregated extent', async () => {
        const extent = await service.getLayerExtent(layer)
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
        const extent = await service.getLayerExtent(layer)
        expect(extent).toEqual(null)
      })
    })
    describe('WMS layer', () => {
      let layer
      beforeEach(() => {
        jest
          .spyOn(olProj, 'transformExtent')
          .mockImplementation((extent) => extent)
      })
      afterEach(() => {
        jest.restoreAllMocks()
      })

      describe('extent available in capabilities', () => {
        beforeEach(() => {
          layer = {
            type: 'wms',
            name: 'mock',
            url: 'http://mock/wms',
          }
        })
        it('returns the advertised extent (CRS 84)', async () => {
          const extent = await service.getLayerExtent(layer)
          expect(extent).toEqual([2.3, 50.6, 2.8, 50.9])
        })
      })

      describe('bbox in EPSG:4326', () => {
        beforeEach(() => {
          layer = {
            type: 'wms',
            name: 'mock_4326',
            url: 'http://mock/wms',
          }
        })
        it('returns EPSG:4326 bbox', async () => {
          const extent = await service.getLayerExtent(layer)
          expect(extent).toEqual([1, 2.6, 3.3, 4.2])
        })
      })
      describe('no lon lat bbox', () => {
        beforeEach(() => {
          layer = {
            type: 'wms',
            name: 'mock_2154',
            url: 'http://mock/wms',
          }
          jest
            .spyOn(olProjProj4, 'fromEPSGCode')
            .mockImplementation(async () => get('EPSG:4326'))
        })
        it('transforms to EPSG:4326 bbox', async () => {
          const extent = await service.getLayerExtent(layer)
          expect(olProjProj4.fromEPSGCode).toHaveBeenCalledWith('EPSG:2154')
          expect(extent).toEqual([650796.4, 7060330.6, 690891.3, 7090402.2])
        })
      })
      describe('no bbox at all', () => {
        beforeEach(() => {
          layer = {
            type: 'wms',
            name: 'mock_nobbox',
            url: 'http://mock/wms',
          }
        })
        it('returns the advertised extent', async () => {
          const extent = await service.getLayerExtent(layer)
          expect(extent).toEqual(null)
        })
      })
      describe('error while loading capabilities', () => {
        beforeEach(() => {
          layer = {
            type: 'wms',
            name: 'mock_error',
            url: 'http://mock/wms',
          }
        })
        it('returns a translatable error', async () => {
          try {
            await service.getLayerExtent(layer)
          } catch (e) {
            const error = e as Error
            expect(error.message).toEqual('Something went wrong')
          }
        })
      })
    })
  })

  describe('#getRecordExtent', () => {
    it('should return null if spatialExtents is not present or is an empty array', () => {
      const record1: Partial<CatalogRecord> = {}
      const record2: Partial<CatalogRecord> = { spatialExtents: [] }

      expect(service.getRecordExtent(record1)).toBeNull()
      expect(service.getRecordExtent(record2)).toBeNull()
    })

    it('should return the projected extent of included extents', () => {
      const record: Partial<CatalogRecord> = {
        spatialExtents: [
          {
            bbox: [1, 5, 3, 7],
          },
          {
            bbox: [2, 3, 5, 6],
          },
          {
            bbox: [6, 3, 8, 5],
          },
          {
            geometry: {
              coordinates: [
                [
                  [4, 4],
                  [7, 4],
                  [7, 8],
                  [4, 8],
                  [4, 4],
                ],
              ],
              type: 'Polygon',
            },
          },
        ],
      }
      expect(service.getRecordExtent(record)).toEqual([
        ...fromLonLat([1, 3]),
        ...fromLonLat([8, 8]),
      ])
    })
  })

  describe('#prioritizePageScroll', () => {
    const interactions = defaults()
    let dragRotate
    let pinchRotate
    beforeEach(() => {
      service.prioritizePageScroll(interactions)
    })
    it('adds condition to DragPan', () => {
      const dragPan = interactions
        .getArray()
        .find((interaction) => interaction instanceof DragPan)
      expect(dragPan.condition_).toEqual(dragPanCondition)
    })
    it('adds condition to MouseWheelZoom', () => {
      const mouseWheelZoom = interactions
        .getArray()
        .find((interaction) => interaction instanceof MouseWheelZoom)
      expect(mouseWheelZoom.condition_).toEqual(mouseWheelZoomCondition)
    })
    describe('interactions', () => {
      beforeEach(() => {
        interactions.forEach((interaction) => {
          if (interaction instanceof DragRotate) {
            dragRotate = interaction
          }
          if (interaction instanceof PinchRotate) {
            pinchRotate = interaction
          }
        })
      })
      it('with no DragRotate interaction', () => {
        expect(dragRotate).toBeFalsy()
      })
      it('with no PinchRotate interaction', () => {
        expect(pinchRotate).toBeFalsy()
      })
    })
  })

  describe('#dragPanCondition', () => {
    let interaction: DragPan
    beforeEach(() => {
      interaction = new DragPan()
      const map = new Map({})
      map.addInteraction(interaction)
    })

    it('returns true for a left click without modifier key', () => {
      const nativeEvent = {
        type: 'pointer',
        pointerType: 'mouse',
        isPrimary: true,
        button: 0,
      }
      const event = new MapBrowserEvent(
        'pointer',
        interaction.getMap(),
        nativeEvent as PointerEvent
      )

      expect(dragPanCondition.bind(interaction)(event)).toBe(true)
    })
    it('returns false for a left click with modifier key', () => {
      const nativeEvent = {
        type: 'pointer',
        pointerType: 'mouse',
        isPrimary: true,
        button: 0,
        shiftKey: true,
      }
      const event = new MapBrowserEvent(
        'pointer',
        interaction.getMap(),
        nativeEvent as PointerEvent
      )

      expect(dragPanCondition.bind(interaction)(event)).toBe(false)
    })
  })
})
