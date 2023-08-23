import { Gn4Record } from './metadata.model'

export interface SearchFilters {
  any?: string
  [x: string]: any
}

type SearchFiltersFieldsLeaf = Record<string, boolean>

export interface StateConfigFilters {
  custom?: SearchFilters
  elastic?: any
}

export interface Organisation {
  name: string
  description?: string
  logoUrl?: string
  recordCount?: number
  email?: string
  emails?: string[]
}

export interface MetadataContact {
  name?: string
  organisation?: string
  email: string
  website?: string
  logoUrl?: string
  address?: string
  phone?: string
}

export interface MetadataRecord {
  id: string
  uuid: string
  title: string
  metadataUrl: string
  abstract?: string
  thumbnailUrl?: string
  hasDownloads?: boolean
  hasMaps?: boolean
  updateStatus?: string
  updateFrequency?: string
  links?: MetadataLink[]
  updatedOn?: Date
  createdOn?: Date
  dataUpdatedOn?: Date
  dataCreatedOn?: Date
  lineage?: string
  keywords?: string[]
  contact?: MetadataContact
  resourceContacts?: MetadataContact[]
  catalogUuid?: string
  constraints?: string[]
  favoriteCount?: number
  isOpenData?: boolean
  ownerInfo?: string
  isPublishedToAll?: boolean
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

export interface MetadataLink {
  url: string
  type: MetadataLinkType
  // either a file name, a layer name or any other resource identifier
  name?: string
  protocol?: string
  mimeType?: string
  description?: string
  label?: string
}

export interface RecordMetric {
  value: string
  recordCount: number
}

export const RESULTS_PAGE_SIZE = 10

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
