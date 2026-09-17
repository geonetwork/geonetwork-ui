import pointer from 'jsonpointer'
import { GeocodingResult } from '@geospatial-sdk/geocoding'
import { Geometry } from 'geojson'

export interface SpatialExtentJsonPointers {
  mainLabel?: string
  secondaryLabel?: string
  tertiaryLabel?: string
  geometry?: string
}

export interface SpatialExtentResult extends GeocodingResult {
  secondaryLabel?: string
  tertiaryLabel?: string
}

const DEFAULT_MAIN_LABEL_POINTER = '/label'
const DEFAULT_GEOMETRY_POINTER = '/geom'

function resolveJsonPointerAsString(
  json: object,
  path?: string
): string | undefined {
  if (!path) return undefined
  const value = pointer.get(json, path)
  return typeof value === 'string' && value ? value : undefined
}

export function parseSpatialExtentResult(
  result: GeocodingResult,
  pointers: SpatialExtentJsonPointers
): SpatialExtentResult {
  const label = pointer.get(
    result,
    pointers.mainLabel ?? DEFAULT_MAIN_LABEL_POINTER
  )
  const geom = pointer.get(
    result,
    pointers.geometry ?? DEFAULT_GEOMETRY_POINTER
  )
  return {
    ...result,
    label: typeof label === 'string' && label ? label : result.label,
    geom: (geom as Geometry) ?? result.geom,
    secondaryLabel: resolveJsonPointerAsString(result, pointers.secondaryLabel),
    tertiaryLabel: resolveJsonPointerAsString(result, pointers.tertiaryLabel),
  }
}
