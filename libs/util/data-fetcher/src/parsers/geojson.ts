import { DataItem } from '../lib/model'
import { BaseDataset } from './base'

/**
 * This parser supports both Geojson Feature collections or arrays
 * of Features
 * @param text
 */
export function parseGeojson(text: string): DataItem[] {
  const parsed = JSON.parse(text)
  const features =
    parsed.type === 'FeatureCollection' ? parsed.features : parsed
  if (!Array.isArray(features)) {
    throw new Error(
      'Could not parse GeoJSON, expected a features collection or an array of features at root level'
    )
  }
  return features
}

export class GeojsonDataset extends BaseDataset {
  readAll(): Promise<DataItem[]> {
    return this.fetchAsText().then(parseGeojson)
  }
}
