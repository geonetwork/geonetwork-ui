import type {
  Feature,
  FeatureCollection,
  Geometry,
  Polygon,
  Position,
} from 'geojson'
import type { DatasetSpatialExtent } from '@geonetwork-ui/common/domain/model/record'

/**
 * @returns The geometry if available, otherwise null.
 */
export function getGeometryFromGeoJSON(
  data: FeatureCollection | Feature | Geometry
): Geometry | null {
  if (data.type === 'FeatureCollection') {
    return data?.features?.[0]?.geometry || null
  }
  if (data.type === 'Feature') {
    return data?.geometry || null
  }
  if (data.type === 'GeometryCollection') {
    return data?.geometries?.[0] || null
  }
  if (
    data.type === 'Polygon' ||
    data.type === 'Point' ||
    data.type === 'LineString' ||
    data.type === 'MultiPolygon' ||
    data.type === 'MultiPoint' ||
    data.type === 'MultiLineString'
  ) {
    return data || null
  }
  return null
}

// FIXME: this type should be more generic across the project
export type BoundingBox = [number, number, number, number]

export function getGeometryBoundingBox(geometry: Geometry): BoundingBox {
  // use the bounding box if specified in the GeoJSON object
  if (geometry.bbox) {
    return geometry.bbox.length > 4
      ? [geometry.bbox[0], geometry.bbox[1], geometry.bbox[3], geometry.bbox[4]]
      : (geometry.bbox as BoundingBox)
  }

  const coordinatesReducer = (prev: BoundingBox, coords: Position) =>
    [
      Math.min(prev[0], coords[0]),
      Math.min(prev[1], coords[1]),
      Math.max(prev[2], coords[0]),
      Math.max(prev[3], coords[1]),
    ] as BoundingBox
  const coordinatesArrayReducer = (
    prev: BoundingBox,
    coordsArray: Position[]
  ) => {
    const bbox = coordsArray.reduce(coordinatesReducer, emptyExtent)
    return [
      Math.min(prev[0], bbox[0]),
      Math.min(prev[1], bbox[1]),
      Math.max(prev[2], bbox[2]),
      Math.max(prev[3], bbox[3]),
    ] as BoundingBox
  }
  const emptyExtent = [Infinity, Infinity, -Infinity, -Infinity] as BoundingBox

  switch (geometry.type) {
    case 'MultiPolygon':
      return geometry.coordinates.reduce((prev, polygonCoords) => {
        const bbox = polygonCoords.reduce(coordinatesArrayReducer, emptyExtent)
        return [
          Math.min(prev[0], bbox[0]),
          Math.min(prev[1], bbox[1]),
          Math.max(prev[2], bbox[2]),
          Math.max(prev[3], bbox[3]),
        ] as BoundingBox
      }, emptyExtent)
    case 'GeometryCollection':
      return geometry.geometries.reduce((prev, geom) => {
        const bbox = getGeometryBoundingBox(geom)
        return [
          Math.min(prev[0], bbox[0]),
          Math.min(prev[1], bbox[1]),
          Math.max(prev[2], bbox[2]),
          Math.max(prev[3], bbox[3]),
        ] as BoundingBox
      }, emptyExtent)
    case 'Polygon':
    case 'MultiLineString':
      return geometry.coordinates.reduce(coordinatesArrayReducer, emptyExtent)
    case 'LineString':
    case 'MultiPoint':
      return geometry.coordinates.reduce<BoundingBox>(
        coordinatesReducer,
        emptyExtent
      )
    case 'Point':
      return coordinatesReducer(emptyExtent, geometry.coordinates)
  }
}

/**
 * Builds the closed GeoJSON Polygon matching the given bounding box.
 */
export function bboxToPolygon(bbox: BoundingBox): Polygon {
  const [minX, minY, maxX, maxY] = bbox
  return {
    type: 'Polygon',
    coordinates: [
      [
        [minX, minY],
        [minX, maxY],
        [maxX, maxY],
        [maxX, minY],
        [minX, minY],
      ],
    ],
  }
}

/**
 * Returns the geometry carried by a spatial extent, falling back to the polygon
 * derived from its bounding box. Returns null when the extent has neither.
 */
export function spatialExtentToGeometry(
  extent: DatasetSpatialExtent
): Geometry | null {
  if (extent.geometry) return extent.geometry
  if (extent.bbox) return bboxToPolygon(extent.bbox)
  return null
}

/**
 * Converts a list of dataset spatial extents into a GeoJSON FeatureCollection,
 * e.g. to be used as the data source of a map layer.
 */
export function spatialExtentsToFeatureCollection(
  extents: DatasetSpatialExtent[]
): FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: extents.reduce<Feature[]>((features, extent) => {
      const geometry = spatialExtentToGeometry(extent)
      if (geometry) {
        features.push({ type: 'Feature', properties: {}, geometry })
      }
      return features
    }, []),
  }
}
