import { FieldName } from './field.model'

export type FieldFilterByValues = Record<string, boolean>
export type FieldFilterByExpression = string | number
export type FieldFilterByRange = {
  start?: Date
  end?: Date
}

export type FieldFilter =
  | FieldFilterByExpression
  | FieldFilterByValues
  | FieldFilterByRange
export type FieldFilters = Record<FieldName, FieldFilter>

export type QueryString = {
  query_string: string
}
export type QueryRange = {
  range: Record<string, { format: string; gte: string; lte: string }>
}
export type FilterQuery = Array<QueryString | QueryRange>
