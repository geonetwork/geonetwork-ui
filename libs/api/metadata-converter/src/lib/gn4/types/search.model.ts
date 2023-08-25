import { Gn4Record } from './metadata.model'

export interface SearchFilters {
  any?: string
  [x: string]: any
}

type SearchFiltersFieldsLeaf = Record<string, boolean>

export interface MetadataContact {
  name?: string
  organisation?: string
  email: string
  website?: string
  logoUrl?: string
  address?: string
  phone?: string
}

export enum MetadataLinkType {
  WMS,
  WMTS,
  WFS,
  ESRI_REST,
  DOWNLOAD,
  LANDING_PAGE,
  OTHER,
}

export interface RecordMetric {
  value: string
  recordCount: number
}

interface HitsObject {
  max_score?: number
  total?: { value: number; relation: 'eq' }
  hits: Gn4Record[]
}
interface TermAggregationBucket {
  key: string
  doc_count: number
}

export interface TermsAggregationResult {
  doc_count_error_upper_bound: number
  sum_other_doc_count: number
  buckets: TermAggregationBucket[]
}

interface FilterAggregationBucket {
  doc_count: number
}
export interface FiltersAggregationResult {
  buckets: Record<string, FilterAggregationBucket>
}

interface HistogramAggregationBucket {
  key: number
  doc_count: number
}
export interface HistogramAggregationResult {
  buckets: HistogramAggregationBucket[]
}

export type NestedAggregationResult = {
  doc_count: number
} & AggregationsResults

export type AggregationResult =
  | TermsAggregationResult
  | NestedAggregationResult
  | HistogramAggregationResult
  | FiltersAggregationResult

export interface AggregationsResults {
  [key: string]: AggregationResult
}

export interface Gn4SearchResults {
  took?: number
  timed_out?: boolean
  _shards?: {
    total: number
    successful: number
    skipped: number
    failed: number
  }
  hits: HitsObject
  aggregations?: AggregationsResults
}
