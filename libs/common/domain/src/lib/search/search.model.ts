import { FieldFilters } from './filter.model'
import { CatalogRecord } from '../record'

type FieldSort = ['desc' | 'asc', FieldName]
export type SortByField = FieldSort | FieldSort[] // several sort criteria can be used!
export type FieldName = string

export interface SearchParams {
  filters?: FieldFilters
  offset: number
  limit: number
  sort?: SortByField
  fields?: FieldName[]
}

export interface SearchResults {
  records: CatalogRecord[]
  count: number
}
