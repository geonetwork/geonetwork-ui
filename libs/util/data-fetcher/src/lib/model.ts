import type { Feature } from 'geojson'

export type DataItem = Feature

export class FetchError {
  message: string
  stack = null

  constructor(
    public type:
      | 'http'
      | 'forbidden'
      | 'network'
      | 'parse'
      | 'unsupportedType'
      | 'unknown',

    public info: string,
    public httpStatus = 0
  ) {
    this.message = `An error happened in the data fetcher, type: ${type}, info: ${info}`
  }
  static http(code: number, body?: string) {
    const info = body
      ? `Error ${code}
${body}`
      : `${code}`
    return new FetchError('http', info, code)
  }
  static forbidden(code: number) {
    return new FetchError('forbidden', '', code)
  }
  static corsOrNetwork(message: string) {
    return new FetchError('network', message, 0)
  }
  static parsingFailed(info: string) {
    return new FetchError('parse', info, 0)
  }
  static unsupportedType(mimeType: string) {
    return new FetchError('unsupportedType', mimeType, 0)
  }
  static unknownType() {
    return new FetchError('unknown', '', 0)
  }
}

// Useful reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

export const CsvMimeTypes = [
  'text/csv', // as per https://www.rfc-editor.org/rfc/rfc4180
  'application/csv', // seems to be also common
] as const
export const JsonMimeTypes = ['application/json'] as const
export const GeoJsonMimeTypes = [
  'application/geo+json',
  'application/vnd.geo+json',
] as const
export const ExcelMimeTypes = [
  'application/vnd.ms-excel', // .xls
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xslx
] as const
export const GmlMimeTypes = ['application/gml+xml'] as const

export type SupportedMimeType =
  | (typeof CsvMimeTypes)[number]
  | (typeof JsonMimeTypes)[number]
  | (typeof GeoJsonMimeTypes)[number]
  | (typeof ExcelMimeTypes)[number]
  | (typeof GmlMimeTypes)[number]

export const SupportedTypes = [
  'csv',
  'json',
  'geojson',
  'excel',
  'gml',
  'wfs',
] as const
export type SupportedType = (typeof SupportedTypes)[number]

export const AllMimeTypes = {
  csv: CsvMimeTypes,
  json: JsonMimeTypes,
  geojson: GeoJsonMimeTypes,
  excel: ExcelMimeTypes,
  gml: GmlMimeTypes,
}

export interface DatasetHeaders {
  mimeType?: string
  supportedType?: SupportedType
  fileSizeBytes?: number
  lastUpdate?: Date
  lastUpdateInvalid?: true
}

export interface PropertyInfo {
  name: string
  label: string
  type: 'number' | 'date' | 'url' | 'string'
}

export interface DatasetInfo {
  itemsCount: number
}

export type FieldName = string

type SumOperation = ['sum', FieldName]
type AverageOperation = ['average', FieldName]
type MinOperation = ['min', FieldName]
type MaxOperation = ['max', FieldName]
type CountOperation = ['count']
export type FieldAggregation =
  | SumOperation
  | AverageOperation
  | MinOperation
  | MaxOperation
  | CountOperation

type AllOperation = ['all']
type DistinctOperation = ['distinct', FieldName]
type RangeBucketsOperation = ['rangeBuckets', FieldName, number] // 3rd value is the bucket count; NOT IMPLEMENTED
export type FieldGroupBy =
  | AllOperation
  | DistinctOperation
  | RangeBucketsOperation

export type FieldSort = ['desc' | 'asc', FieldName]

type ComparisonOperator = '<' | '>' | '<=' | '>=' | '=' | '!='
type Comparison = [ComparisonOperator, FieldName, string | number]
type AndOperation = ['and', ...FieldFilter[]]
type OrOperation = ['or', ...FieldFilter[]]
type NotOperation = ['not', FieldFilter]
type InOperation = ['in', FieldName, ...(string[] | number[])]
type LikeOperation = ['like', FieldName, string]
export type FieldFilter =
  | Comparison
  | AndOperation
  | OrOperation
  | NotOperation
  | InOperation
  | LikeOperation
