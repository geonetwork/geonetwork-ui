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
