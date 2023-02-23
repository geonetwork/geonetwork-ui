import { DataItem, DatasetInfo, PropertyInfo } from '../lib/model'
import { BaseDataset } from './base'
import { processItemProperties } from '../lib/utils'

/**
 * This parser supports both Geojson Feature collections or arrays
 * of Features
 * @param text
 */
export function parseGeojson(text: string): {
  items: DataItem[]
  properties: PropertyInfo[]
} {
  const parsed = JSON.parse(text)
  const features =
    parsed.type === 'FeatureCollection' ? parsed.features : parsed
  if (!Array.isArray(features)) {
    throw new Error(
      'Could not parse GeoJSON, expected a features collection or an array of features at root level'
    )
  }
  return processItemProperties(features)
}

export class GeojsonDataset extends BaseDataset {
  private parseResult_ = this.fetchAsText().then(parseGeojson)
  private propertiesInfo_ = this.parseResult_.then(
    (result) => result.properties
  )
  private datasetInfo_ = this.parseResult_.then(
    (result) =>
      ({
        itemsCount: result.items.length,
      } as DatasetInfo)
  )
  get properties(): Promise<PropertyInfo[]> {
    return this.propertiesInfo_
  }

  get info(): Promise<DatasetInfo> {
    return this.datasetInfo_
  }
  readAll(): Promise<DataItem[]> {
    return this.parseResult_.then((result) => result.items)
  }
}
