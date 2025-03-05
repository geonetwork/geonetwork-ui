import { DataItem, PropertyInfo } from '../model'
import {
  fetchDataAsText,
  jsonToGeojsonFeature,
  processItemProperties,
} from '../utils'
import { BaseFileReader } from './base-file'

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

export class JsonReader extends BaseFileReader {
  getData() {
    return fetchDataAsText(this.url, this.cacheActive).then(parseJson)
  }
}
