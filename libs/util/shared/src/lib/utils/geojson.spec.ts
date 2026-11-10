import {
  bboxToGeometry,
  getGeometryBoundingBox,
  getGeometryFromGeoJSON,
  getGeoJSONBoundingBox,
  isBoundingBox,
  isBoundingBoxWithinWorldExtent,
  spatialExtentsToFeatureCollection,
  spatialExtentToGeometry,
} from './geojson'
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

  describe('isBoundingBox', () => {
    it('returns true for a bounding box', () => {
      expect(isBoundingBox([0, 0, 1, 1])).toBe(true)
    })
    it('returns false for an array with the wrong length', () => {
      expect(isBoundingBox([0, 0, 1])).toBe(false)
    })
    it('returns false for an array containing non-numbers', () => {
      expect(isBoundingBox([0, 0, 1, '1'])).toBe(false)
    })
    it('returns false for a non-array value', () => {
      expect(isBoundingBox({ start: 0, end: 1 })).toBe(false)
    })
  })

  describe('getGeoJSONBoundingBox', () => {
    const point: Point = { type: 'Point', coordinates: [2, 3] }
    const polygon: Polygon = {
      type: 'Polygon',
      coordinates: [
        [
          [5, 40],
          [5, 45],
          [10, 45],
          [10, 40],
          [5, 40],
        ],
      ],
    }
    const lineString: LineString = {
      type: 'LineString',
      coordinates: [
        [-4, 42],
        [1, 50],
      ],
    }

    it('covers every feature of a feature collection, whatever its geometry type', () => {
      expect(
        getGeoJSONBoundingBox({
          type: 'FeatureCollection',
          features: [point, polygon, lineString].map((geometry) => ({
            type: 'Feature',
            properties: {},
            geometry,
          })),
        })
      ).toEqual([-4, 3, 10, 50])
    })
    it('skips the features without a geometry', () => {
      expect(
        getGeoJSONBoundingBox({
          type: 'FeatureCollection',
          features: [
            { type: 'Feature', properties: {}, geometry: null },
            { type: 'Feature', properties: {}, geometry: polygon },
          ],
        })
      ).toEqual([5, 40, 10, 45])
    })
    it('covers every geometry of a geometry collection', () => {
      expect(
        getGeoJSONBoundingBox({
          type: 'GeometryCollection',
          geometries: [point, polygon],
        })
      ).toEqual([2, 3, 10, 45])
    })
    it('covers the geometry of a feature', () => {
      expect(
        getGeoJSONBoundingBox({
          type: 'Feature',
          properties: {},
          geometry: lineString,
        })
      ).toEqual([-4, 42, 1, 50])
    })
    it('covers a single geometry', () => {
      expect(getGeoJSONBoundingBox(point)).toEqual([2, 3, 2, 3])
    })
    it('returns null for a feature collection without geometries', () => {
      expect(
        getGeoJSONBoundingBox({ type: 'FeatureCollection', features: [] })
      ).toBe(null)
    })
    it('returns null for a feature holding an empty geometry collection', () => {
      expect(
        getGeoJSONBoundingBox({
          type: 'Feature',
          properties: {},
          geometry: { type: 'GeometryCollection', geometries: [] },
        })
      ).toBe(null)
    })
    it('returns null for anything else', () => {
      expect(getGeoJSONBoundingBox({ type: 'Something' } as never)).toBe(null)
    })
  })

  describe('isBoundingBoxWithinWorldExtent', () => {
    it('returns true for a bounding box within world bounds', () => {
      expect(isBoundingBoxWithinWorldExtent([-180, -90, 180, 90])).toBe(true)
    })
    it('returns false when the longitude exceeds -180/180', () => {
      expect(isBoundingBoxWithinWorldExtent([-181, -10, 10, 10])).toBe(false)
    })
    it('returns false when the latitude exceeds -90/90', () => {
      expect(isBoundingBoxWithinWorldExtent([-10, -10, 10, 91])).toBe(false)
    })
  })

  describe('bboxToGeometry', () => {
    it('builds a closed polygon ring from a bounding box', () => {
      expect(bboxToGeometry([0, 0, 1, 1])).toEqual({
        type: 'Polygon',
        coordinates: [
          [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0],
            [0, 0],
          ],
        ],
      })
    })
    it('handles negative coordinates', () => {
      expect(bboxToGeometry([-10, -5, 10, 5])).toEqual({
        type: 'Polygon',
        coordinates: [
          [
            [-10, -5],
            [-10, 5],
            [10, 5],
            [10, -5],
            [-10, -5],
          ],
        ],
      })
    })
    it('builds a point from the first and second coordinates of a bounding box', () => {
      expect(bboxToGeometry([0, 1, 0, 1])).toEqual({
        type: 'Point',
        coordinates: [0, 1],
      })
    })
  })

  describe('spatialExtentToGeometry', () => {
    const geometry: Polygon = {
      type: 'Polygon',
      coordinates: [
        [
          [0, 0],
          [0, 2],
          [2, 2],
          [2, 0],
          [0, 0],
        ],
      ],
    }
    it('returns the geometry when present', () => {
      expect(spatialExtentToGeometry({ geometry })).toBe(geometry)
    })
    it('prefers the geometry over the bounding box', () => {
      expect(spatialExtentToGeometry({ geometry, bbox: [0, 0, 1, 1] })).toBe(
        geometry
      )
    })
    it('derives a polygon from the bounding box when no geometry', () => {
      expect(spatialExtentToGeometry({ bbox: [0, 0, 1, 1] })).toEqual(
        bboxToGeometry([0, 0, 1, 1])
      )
    })
    it('returns null when neither geometry nor bbox is set', () => {
      expect(spatialExtentToGeometry({})).toBeNull()
    })
  })

  describe('spatialExtentsToFeatureCollection', () => {
    const geometry: Polygon = {
      type: 'Polygon',
      coordinates: [
        [
          [0, 0],
          [0, 2],
          [2, 2],
          [2, 0],
          [0, 0],
        ],
      ],
    }
    it('returns an empty feature collection for an empty list', () => {
      expect(spatialExtentsToFeatureCollection([])).toEqual({
        type: 'FeatureCollection',
        features: [],
      })
    })
    it('builds one feature per usable extent (geometry or bbox)', () => {
      expect(
        spatialExtentsToFeatureCollection([
          { geometry },
          { bbox: [0, 0, 1, 1] },
        ])
      ).toEqual({
        type: 'FeatureCollection',
        features: [
          { type: 'Feature', properties: {}, geometry },
          {
            type: 'Feature',
            properties: {},
            geometry: bboxToGeometry([0, 0, 1, 1]),
          },
        ],
      })
    })
    it('skips extents that have neither geometry nor bbox', () => {
      const fc = spatialExtentsToFeatureCollection([
        { description: 'no shape' },
        { bbox: [0, 0, 1, 1] },
      ])
      expect(fc.features).toHaveLength(1)
      expect(fc.features[0].geometry).toEqual(bboxToGeometry([0, 0, 1, 1]))
    })
  })
})
