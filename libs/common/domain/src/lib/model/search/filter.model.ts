import { FieldName } from './field.model'

export type FieldFilterByValues = Record<string, boolean>
export type FieldFilterByExpression = string | number
export type FieldFilterByRange = {
  start?: Date
  end?: Date
}
// matches util/shared's BoundingBox; duplicated here to avoid a circular
// dependency (util/shared already depends on common/domain)
export type FieldFilterByBoundingBox = [number, number, number, number]

export type FieldFilter =
  | FieldFilterByExpression
  | FieldFilterByValues
  | FieldFilterByRange
  | FieldFilterByBoundingBox
export type FieldFilters = Record<FieldName, FieldFilter>

export type QueryString = {
  query_string: string
}
export type QueryRange = {
  range: Record<string, { format: string; gte: string; lte: string }>
}
export type QueryGeoShape = {
  geo_shape: {
    geom: {
      shape: { type: string; coordinates: number[][] }
      relation: string
    }
  }
}
export type FilterQuery = Array<QueryString | QueryRange | QueryGeoShape>
