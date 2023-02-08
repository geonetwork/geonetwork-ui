import { DataItem, DatasetInfo, PropertyInfo } from '../lib/model'
import { BaseDataset } from './base'
import { jsonToGeojsonFeature, processItemProperties } from '../lib/utils'

/**
 * This parser only supports arrays of simple flat objects with properties
 * @param text
 */
export function parseJson(text: string): {
  items: DataItem[]
  properties: PropertyInfo[]
} {
  const parsed = JSON.parse(text) as any[]
  if (!Array.isArray(parsed)) {
    throw new Error('Could not parse JSON, expected an array at root level')
  }
  return processItemProperties(parsed.map(jsonToGeojsonFeature))
}

export class JsonDataset extends BaseDataset {
  private parseResult_ = this.fetchAsText().then(parseJson)
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
