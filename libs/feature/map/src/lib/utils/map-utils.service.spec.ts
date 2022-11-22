import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { FEATURE_COLLECTION_POLYGON_FIXTURE_4326 } from '@geonetwork-ui/util/shared/fixtures'
import Feature from 'ol/Feature'
import { of } from 'rxjs'
import { MapUtilsWMSService } from './map-utils-wms.service'

import { MapUtilsService } from './map-utils.service'
import { readFirst } from '@nrwl/angular/testing'

const wmsUtilsMock = {
  getLayerLonLatBBox: jest.fn(() => of([1.33, 48.81, 4.3, 51.1])),
}

describe('MapUtilsService', () => {
  let service: MapUtilsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: MapUtilsWMSService,
          useValue: wmsUtilsMock,
        },
      ],
    })
    service = TestBed.inject(MapUtilsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
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
          -5.138001239929, 41.362164776515, 9.5592262719626, 51.08854370897,
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
          expect(extent).toEqual([1.33, 48.81, 4.3, 51.1])
        })
      })
    })
  })
})
