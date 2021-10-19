// Useful reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

export const CsvMimeTypes = [
  'text/csv', // as per https://www.rfc-editor.org/rfc/rfc4180
  'application/csv', // seems to be also common
] as const
export const JsonMimeTypes = ['application/json'] as const
export const GeoJsonMimeTypes = ['application/geo+json'] as const
export const ExcelMimeTypes = [
  'application/vnd.ms-excel', // .xls
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xslx
] as const

export type SupportedMimeType =
  | typeof CsvMimeTypes[number]
  | typeof JsonMimeTypes[number]
  | typeof GeoJsonMimeTypes[number]
  | typeof ExcelMimeTypes[number]

export const SupportedTypes = ['csv', 'json', 'geojson', 'excel'] as const
export type SupportedType = typeof SupportedTypes[number]

export const AllMimeTypes = {
  csv: CsvMimeTypes,
  json: JsonMimeTypes,
  geojson: GeoJsonMimeTypes,
  excel: ExcelMimeTypes,
}
