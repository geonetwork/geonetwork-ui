import { Feature, FeatureCollection, Geometry } from 'geojson'

export function getGeometryFromGeoJSON(
  data: FeatureCollection | Feature | Geometry
): Geometry {
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
