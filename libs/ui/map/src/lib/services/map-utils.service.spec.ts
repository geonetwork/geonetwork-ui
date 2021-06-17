import { TestBed } from '@angular/core/testing'
import { FEATURE_COLLECTION_POLYGON_FIXTURE_4326 } from '../fixtures/geojson.fixtures'

import { MapUtilsService } from './map-utils.service'
import Feature from 'ol/Feature'

describe('MapUtilsService', () => {
  let service: MapUtilsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(MapUtilsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#readFeatureCollection', () => {
    const collection = FEATURE_COLLECTION_POLYGON_FIXTURE_4326
    let olFeatures, featureSample: Feature
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
})
