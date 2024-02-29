import { FieldName } from './field.model'

export type FieldFilterByValues = Record<string, boolean>
export type FieldFilterByExpression = string | number
export type FieldFilter = FieldFilterByExpression | FieldFilterByValues
export type FieldFilters = Record<FieldName, FieldFilter>
