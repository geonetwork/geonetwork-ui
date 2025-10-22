/**
 * STAC API Models
 * Based on STAC API specification: https://github.com/radiantearth/stac-api-spec
 */

/**
 * STAC Link object following RFC 8288
 */
export interface StacLink {
  rel: string
  href: string
  type?: string
  title?: string
}

/**
 * STAC Asset
 */
export interface StacAsset {
  href: string
  title?: string
  description?: string
  type?: string
  roles?: string[]
  [key: string]: unknown
}

/**
 * STAC Item - A GeoJSON Feature with STAC-specific properties
 */
export interface StacItem {
  type: 'Feature'
  stac_version: string
  stac_extensions?: string[]
  id: string
  geometry: GeoJSON.Geometry | null
  bbox?: number[]
  properties: {
    datetime: string | null
    start_datetime?: string
    end_datetime?: string
    [key: string]: unknown
  }
  links: StacLink[]
  assets: Record<string, StacAsset>
  collection?: string
}

/**
 * STAC ItemCollection - A GeoJSON FeatureCollection containing STAC Items
 */
export interface StacItemCollection {
  type: 'FeatureCollection'
  features: StacItem[]
  links: StacLink[]
  context?: {
    returned: number
    limit?: number
    matched?: number
  }
  numberMatched?: number
  numberReturned?: number
}

/**
 * Query parameters for STAC Items API
 */
export interface StacQueryParams {
  /**
   * Spatial filter: bounding box [minLon, minLat, maxLon, maxLat]
   * Example: [-180, -90, 180, 90]
   */
  bbox?: [number, number, number, number]

  /**
   * Temporal filter: RFC 3339 datetime or interval
   * Examples:
   * - Single datetime: "2024-01-01T00:00:00Z"
   * - Interval: "2024-01-01T00:00:00Z/2024-12-31T23:59:59Z"
   * - Open interval start: "../2024-12-31T23:59:59Z"
   * - Open interval end: "2024-01-01T00:00:00Z/.."
   */
  datetime?: string

  /**
   * Maximum number of items to return (default: 12)
   */
  limit?: number
}

/**
 * Response structure for STAC service queries
 */
export interface StacQueryResponse {
  items: StacItem[]
  links: {
    next?: string
    prev?: string
    self?: string
  }
  totalMatched?: number
  totalReturned: number
}
