export type SortOrder = 'asc' | 'desc'
interface SortParam {
  [key: string]: SortOrder
}
export type SortParams = string | SortParam | (string | SortParam)[]

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

export type SourceParam = string | string[] | EsRequestSource

export interface EsSearchParams {
  aggregations?: Record<string, unknown>
  from?: number
  query?: Record<string, unknown>
  size: number
  sort?: SortParams
  track_total_hits?: boolean
  _source?: SourceParam
}

export type EsSearchResponse = any
