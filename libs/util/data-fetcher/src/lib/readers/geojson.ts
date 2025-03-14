import { DataItem, PropertyInfo } from '../model'
import { fetchDataAsText, processItemProperties } from '../utils'
import { BaseFileReader } from './base-file'

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

export class GeojsonReader extends BaseFileReader {
  getData() {
    return fetchDataAsText(this.url, this.cacheActive).then(parseGeojson)
  }
}
