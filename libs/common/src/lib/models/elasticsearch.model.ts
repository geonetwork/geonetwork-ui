export type SortOrder = 'asc' | 'desc'
interface SortParam {
  [key: string]: SortOrder
}
export type SortParams = string | SortParam | (string | SortParam)[]

export interface EsRequestAggTermPatch {
  increment?: number
  size?: number
  include?: string
}
