import pointer from 'jsonpointer'
import { GeocodingResult } from '@geospatial-sdk/geocoding'

export interface SpatialExtentJsonPointers {
  mainLabel?: string
  secondaryLabel?: string
  tertiaryLabel?: string
}

export interface SpatialExtentResult extends GeocodingResult {
  secondaryLabel?: string
  tertiaryLabel?: string
}

const DEFAULT_MAIN_LABEL_POINTER = '/label'

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
  return {
    ...result,
    label: typeof label === 'string' && label ? label : result.label,
    secondaryLabel: resolveJsonPointerAsString(result, pointers.secondaryLabel),
    tertiaryLabel: resolveJsonPointerAsString(result, pointers.tertiaryLabel),
  }
}
