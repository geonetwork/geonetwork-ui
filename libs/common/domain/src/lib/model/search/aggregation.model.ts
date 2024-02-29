import { FieldName } from './field.model'
import { FieldFilters } from './filter.model'

export interface TermsAggregationParams {
  type: 'terms'
  field: FieldName
  limit: number
  sort: AggregationSort
  filter?: string
}
export interface HistogramAggregationParams {
  type: 'histogram'
  field: FieldName
  interval: number
}
export type FilterAggregationParams = FieldFilters | string
export interface FiltersAggregationParams {
  type: 'filters'
  filters: Record<string, FilterAggregationParams>
}
export type AggregationParams =
  | TermsAggregationParams
  | HistogramAggregationParams
  | FiltersAggregationParams
export type AggregationsParams = Record<FieldName, AggregationParams>

export type AggregationsTypes = AggregationParams['type']

export interface TermBucket {
  term: string
  count: number
}
export interface HistogramBucket {
  lowValue: number
  highValue: number
  count: number
}
export interface FiltersBucket {
  name: string
  count: number
}

export type Bucket = TermBucket | HistogramBucket | FiltersBucket

export type AggregationSort = ['desc' | 'asc', 'key' | 'count']

export interface AggregationBuckets {
  buckets: Bucket[]
}
export type AggregationCounts = Record<string, number>
export type Aggregation = AggregationBuckets | AggregationCounts
export type Aggregations = Record<FieldName, Aggregation>
