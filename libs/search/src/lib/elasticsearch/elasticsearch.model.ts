import {
  DefaultOperator,
  ExpandWildcards,
  GenericParams,
  NameList,
  TimeSpan,
} from 'elasticsearch'

export type SortOrder = 'asc' | 'desc'
interface SortParam {
  [key: string]: SortOrder
}
export type SortParams = string | SortParam | (string | SortParam)[]

export interface SearchParams extends GenericParams {
  analyzer?: string
  analyzeWildcard?: boolean
  defaultOperator?: DefaultOperator
  df?: string
  explain?: boolean
  storedFields?: NameList
  docvalueFields?: NameList
  fielddataFields?: NameList
  from?: number
  ignoreUnavailable?: boolean
  allowNoIndices?: boolean
  expandWildcards?: ExpandWildcards
  lenient?: boolean
  lowercaseExpandedTerms?: boolean
  preference?: string
  q?: string
  routing?: NameList
  scroll?: TimeSpan
  searchType?: 'query_then_fetch' | 'dfs_query_then_fetch'
  size?: number
  sort?: SortParams
  _source?: NameList
  _sourceExclude?: NameList
  _sourceInclude?: NameList
  terminateAfter?: number
  stats?: NameList
  suggestField?: string
  suggestMode?: 'missing' | 'popular' | 'always'
  suggestSize?: number
  suggestText?: string
  timeout?: TimeSpan
  trackScores?: boolean
  version?: boolean
  requestCache?: boolean
  index?: NameList
  type?: NameList
}
