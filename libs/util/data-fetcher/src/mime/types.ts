// Useful reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

export type CsvMimeType =
  | 'text/csv' // as per https://www.rfc-editor.org/rfc/rfc4180
  | 'application/csv' // seems to be also common
export type JsonMimeType = 'application/json'
export type GeoJsonMimeType = 'text/csv'
export type ExcelMimeType =
  | 'application/vnd.ms-excel' // .xls
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // .xslx

export type SupportedMimeType =
  | CsvMimeType
  | JsonMimeType
  | GeoJsonMimeType
  | ExcelMimeType

export enum SupportedType {
  CSV,
  JSON,
  GEOJSON,
  EXCEL,
}
