import { JSONPath } from 'jsonpath-plus'
import { GeocodingResult } from '@geospatial-sdk/geocoding'
import { Geometry } from 'geojson'

export interface SpatialExtentJsonPaths {
  mainLabel?: string
  secondaryLabel?: string
  tertiaryLabel?: string
  geometry?: string
}

export interface SpatialExtentResult extends GeocodingResult {
  secondaryLabel?: string
  tertiaryLabel?: string
}

const DEFAULT_MAIN_LABEL_PATH = '$.label'
const DEFAULT_GEOMETRY_PATH = '$.geom'

function resolveJsonPath(json: object, path: string): unknown {
  return JSONPath({ path, json, wrap: false, eval: false })
}

function resolveJsonPathAsString(
  json: object,
  path?: string
): string | undefined {
  if (!path) return undefined
  const value = resolveJsonPath(json, path)
  return typeof value === 'string' && value ? value : undefined
}

export function parseSpatialExtentResult(
  result: GeocodingResult,
  paths: SpatialExtentJsonPaths
): SpatialExtentResult {
  const label = resolveJsonPath(
    result,
    paths.mainLabel ?? DEFAULT_MAIN_LABEL_PATH
  )
  const geom = resolveJsonPath(result, paths.geometry ?? DEFAULT_GEOMETRY_PATH)
  return {
    ...result,
    label: typeof label === 'string' && label ? label : result.label,
    geom: (geom as Geometry) ?? result.geom,
    secondaryLabel: resolveJsonPathAsString(result, paths.secondaryLabel),
    tertiaryLabel: resolveJsonPathAsString(result, paths.tertiaryLabel),
  }
}
