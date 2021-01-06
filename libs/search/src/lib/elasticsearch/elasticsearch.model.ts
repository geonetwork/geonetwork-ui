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
