export * from './lib/data-fetcher.js'
export {
  SupportedType,
  SupportedTypes,
  DataItem,
  FetchError,
  FieldAggregation,
  PropertyInfo,
} from './lib/model.js'
export { getJsonDataItemsProxy } from './lib/utils.js'
export { BaseReader } from './lib/readers/base.js'
export { BaseFileReader } from './lib/readers/base-file.js'
export { GeojsonReader } from './lib/readers/geojson.js'
