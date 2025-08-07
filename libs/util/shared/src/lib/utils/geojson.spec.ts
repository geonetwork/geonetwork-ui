import { getGeometryBoundingBox, getGeometryFromGeoJSON } from './geojson'
import {
  GeometryCollection,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from 'geojson'
import { polygonFeatureCollectionFixture } from '@geonetwork-ui/common/fixtures'

describe('geojson utils', () => {
  describe('getGeometryFromGeoJSON', () => {
    let input
    const output = polygonFeatureCollectionFixture().features[0].geometry
    describe('from a feature collection', () => {
      beforeEach(() => {
        input = polygonFeatureCollectionFixture()
      })
      it('returns the geometry of the first feature', () => {
        expect(getGeometryFromGeoJSON(input)).toEqual(output)
      })
    })
    describe('from a feature', () => {
      beforeEach(() => {
        input = polygonFeatureCollectionFixture().features[0]
      })
      it('returns the feature geometry', () => {
        expect(getGeometryFromGeoJSON(input)).toEqual(output)
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
        input = polygonFeatureCollectionFixture().features[0].geometry
      })
      it('returns the geometry', () => {
        expect(getGeometryFromGeoJSON(input)).toEqual(output)
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

  describe('getGeometryBoundingBox', () => {
    const polygon: Polygon = {
      type: 'Polygon',
      coordinates: [
        [
          [1, 1],
          [1, 4],
          [4, 4],
          [4, 1],
          [1, 1],
        ],
        [
          [2, 2],
          [2, 3],
          [130, 3],
          [130, 2],
          [2, 2],
        ],
      ],
    }
    const lineString: LineString = {
      type: 'LineString',
      coordinates: [
        [10, 20],
        [20, 20],
        [50, 10],
        [100, -5],
        [-100, -100],
      ],
    }
    const point: Point = {
      type: 'Point',
      coordinates: [50, -200],
    }

    it('computes the bounding box correctly for a Polygon', () => {
      const bbox = getGeometryBoundingBox(polygon)
      expect(bbox).toEqual([1, 1, 130, 4])
    })
    it('computes the bounding box correctly for a LineString', () => {
      const bbox = getGeometryBoundingBox(lineString)
      expect(bbox).toEqual([-100, -100, 100, 20])
    })
    it('computes the bounding box correctly for a Point', () => {
      const bbox = getGeometryBoundingBox(point)
      expect(bbox).toEqual([50, -200, 50, -200])
    })
    it('computes the bounding box correctly for a MultiPolygon', () => {
      const multiPolygon: MultiPolygon = {
        type: 'MultiPolygon',
        coordinates: [
          polygon.coordinates,
          [
            [
              [-20, -20],
              [-20, 30],
              [20, 30],
              [20, -20],
              [-20, -20],
            ],
          ],
        ],
      }
      const bbox = getGeometryBoundingBox(multiPolygon)
      expect(bbox).toEqual([-20, -20, 130, 30])
    })
    it('computes the bounding box correctly for a MultiLineString', () => {
      const multiLineString: MultiLineString = {
        type: 'MultiLineString',
        coordinates: [
          lineString.coordinates,
          [
            [-2, -2],
            [2, 3],
            [150, 200],
            [100, 10],
          ],
        ],
      }
      const bbox = getGeometryBoundingBox(multiLineString)
      expect(bbox).toEqual([-100, -100, 150, 200])
    })
    it('computes the bounding box correctly for a MultiPoint', () => {
      const multiPoint: MultiPoint = {
        type: 'MultiPoint',
        coordinates: [point.coordinates, [200, 300]],
      }
      const bbox = getGeometryBoundingBox(multiPoint)
      expect(bbox).toEqual([50, -200, 200, 300])
    })
    it('computes the bounding box correctly for a GeometryCollection', () => {
      const geom: GeometryCollection = {
        type: 'GeometryCollection',
        geometries: [lineString, polygon, point],
      }
      const bbox = getGeometryBoundingBox(geom)
      expect(bbox).toEqual([-100, -200, 130, 20])
    })
  })
})
