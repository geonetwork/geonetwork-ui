import { TestBed } from '@angular/core/testing'
import { readFirst } from '@nx/angular/testing'

import { MapUtilsWMSService } from './map-utils-wms.service'

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

describe('MapUtilsWMSService', () => {
  let service: MapUtilsWMSService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(MapUtilsWMSService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#getLayerLonLatBBox', () => {
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
        const extent = await readFirst(service.getLayerLonLatBBox(layer))
        expect(extent).toEqual([1.33, 48.81, 4.3, 51.1])
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
          await readFirst(service.getLayerLonLatBBox(layer))
        } catch (e) {
          const error = e as Error
          expect(error.message).toEqual('Something went wrong')
        }
      })
    })
  })

  describe('#getLonLatBBox', () => {
    let wmsLayerFull
    describe('bbox in CRS:84', () => {
      beforeEach(() => {
        wmsLayerFull = {
          boundingBoxes: {
            'CRS:84': ['2.3', '50.6', '2.8', '50.9'],
            'EPSG:2154': ['650796.4', '7060330.6', '690891.3', '7090402.2'],
          },
        }
      })
      it('returns CRS:84 bbox', async () => {
        const extent = service.getLonLatBBox(wmsLayerFull)
        expect(extent).toEqual(['2.3', '50.6', '2.8', '50.9'])
      })
    })
    describe('bbox in EPSG:4326', () => {
      beforeEach(() => {
        wmsLayerFull = {
          boundingBoxes: {
            'EPSG:4326': ['1', '2.6', '3.3', '4.2'],
            'CRS:84': ['2.3', '50.6', '2.8', '50.9'],
          },
        }
      })
      it('returns EPSG:4326 bbox', async () => {
        const extent = service.getLonLatBBox(wmsLayerFull)
        expect(extent).toEqual(['1', '2.6', '3.3', '4.2'])
      })
    })
    describe('no lon lat bbox', () => {
      beforeEach(() => {
        wmsLayerFull = {
          boundingBoxes: {
            'EPSG:2154': ['650796.4', '7060330.6', '690891.3', '7090402.2'],
          },
        }
      })
      it('returns EPSG:4326 bbox', async () => {
        const extent = service.getLonLatBBox(wmsLayerFull)
        expect(extent).toBeUndefined()
      })
    })
  })
})
