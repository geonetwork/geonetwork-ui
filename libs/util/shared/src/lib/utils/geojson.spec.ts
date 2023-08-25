import { getGeometryFromGeoJSON } from './geojson'
import { GeometryCollection } from 'geojson'
import { FEATURE_COLLECTION_POLYGON_FIXTURE_4326 } from '@geonetwork-ui/common/fixtures'

describe('geojson utils', () => {
  describe('getGeometryFromGeoJSON', () => {
    let input
    const output = FEATURE_COLLECTION_POLYGON_FIXTURE_4326.features[0].geometry
    describe('from a feature collection', () => {
      beforeEach(() => {
        input = FEATURE_COLLECTION_POLYGON_FIXTURE_4326
      })
      it('returns the geometry of the first feature', () => {
        expect(getGeometryFromGeoJSON(input)).toBe(output)
      })
    })
    describe('from a feature', () => {
      beforeEach(() => {
        input = FEATURE_COLLECTION_POLYGON_FIXTURE_4326.features[0]
      })
      it('returns the feature geometry', () => {
        expect(getGeometryFromGeoJSON(input)).toBe(output)
      })
    })
    describe('from a geometry collection', () => {
      beforeEach(() => {
        input = {
          type: 'GeometryCollection',
          geometries: [output],
        } as GeometryCollection
      })
      it('returns the first geometry', () => {
        expect(getGeometryFromGeoJSON(input)).toBe(output)
      })
    })
    describe('from a geometry', () => {
      beforeEach(() => {
        input = FEATURE_COLLECTION_POLYGON_FIXTURE_4326.features[0].geometry
      })
      it('returns the geometry', () => {
        expect(getGeometryFromGeoJSON(input)).toBe(output)
      })
    })
    describe('from anything else', () => {
      beforeEach(() => {
        input = { type: 'Something', props: {} }
      })
      it('returns null', () => {
        expect(getGeometryFromGeoJSON(input)).toBe(null)
      })
    })
  })
})
