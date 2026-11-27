import { RecordFlag } from '@geonetwork-ui/common/domain/model/record'

export type SortOrder = 'asc' | 'desc'
interface SortParam {
  [key: string]: SortOrder
}
type EsFieldSort = {
  order: SortOrder
  mode?: 'max' | 'min'
  missing?: '_last'
  nested?: {
    path: string
  }
}
export type SortParams =
  | string
  | SortParam
  | { [property: string]: EsFieldSort }
  | (string | SortParam | { [property: string]: EsFieldSort })[]

export interface EsRequestAggTerm {
  field?: string
  size?: number
  include?: string
}
export interface EsRequestAggTermPatch {
  increment?: number
  size?: number
  include?: string
}

export interface EsRequestSource {
  includes: string[]
}

export type RequestFields = string | string[] | EsRequestSource

export interface EsSearchParams {
  aggregations?: Record<string, unknown>
  from?: number
  query?: Record<string, unknown>
  size?: number
  sort?: SortParams
  track_total_hits?: boolean
  _source?: RequestFields

  runtime_mappings?: Record<string, unknown>
}

export type EsSearchResponse = any

export type EsTemplateValues = 'y' | 'n' | 's' | 't'
export type EsTemplateType = EsTemplateValues | EsTemplateValues[]

export const ES_RESOURCES_VALUES = [
  'dataset',
  'series',
  'publication',
  'nonGeographicDataset',
  'map',
  'map/static',
  'mapDigital',
  'service',
  'featureCatalog',
] as const

export type EsResourceTypeValues = (typeof ES_RESOURCES_VALUES)[number]
export type EsResourceType = EsResourceTypeValues | EsResourceTypeValues[]

// This prefix is part of the category names stored in GeoNetwork: changing it
// would silently drop the flags already set on existing catalogs.
export const RECORD_FLAG_CATEGORY_PREFIX = 'geonetwork-ui-flag:'
export const REFERENCE_DATASET_CATEGORY = `${RECORD_FLAG_CATEGORY_PREFIX}${'IS_REFERENCE_DATASET' satisfies RecordFlag}`
