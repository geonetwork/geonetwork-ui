import { DataItem, PropertyInfo } from '../lib/model'
import { jsonToGeojsonFeature, processItemProperties } from '../lib/utils'
import { BaseFileDataset } from './base-file'

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

export class JsonDataset extends BaseFileDataset {
  getData() {
    return this.fetchAsText().then(parseJson)
  }
}
