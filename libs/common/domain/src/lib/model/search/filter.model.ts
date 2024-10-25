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
