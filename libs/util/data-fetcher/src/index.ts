export * from './lib/data-fetcher'
export {
  SupportedType,
  SupportedTypes,
  DataItem,
  FetchError,
  FieldAggregation,
  PropertyInfo,
} from './lib/model'
export { getJsonDataItemsProxy } from './lib/utils'
export { BaseReader } from './lib/readers/base'
export { BaseFileReader } from './lib/readers/base-file'
export { GeojsonReader } from './lib/readers/geojson'
