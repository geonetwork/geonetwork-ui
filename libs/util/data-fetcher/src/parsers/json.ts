import { DataItem } from '../lib/model'
import { BaseDataset } from './base'

/**
 * This parser only supports arrays of simple flat objects with properties
 * @param text
 */
export function parseJson(text: string): DataItem[] {
  const parsed = JSON.parse(text)
  if (!Array.isArray(parsed)) {
    throw new Error('Could not parse JSON, expected an array at root level')
  }
  return (parsed as any[]).map(jsonToGeojsonFeature)
}

export function jsonToGeojsonFeature(object: { [key: string]: any }): DataItem {
  const { id, properties } = Object.keys(object)
    .map((property) => (property ? property : 'unknown')) //prevent empty strings
    .reduce(
      (prev, curr) =>
        curr.toLowerCase().endsWith('id')
          ? {
              ...prev,
              id: object[curr],
            }
          : {
              ...prev,
              properties: { ...prev.properties, [curr]: object[curr] },
            },
      { id: undefined, properties: {} }
    )
  return {
    type: 'Feature',
    geometry: null,
    properties,
    ...(id !== undefined && { id }),
  }
}

export class JsonDataset extends BaseDataset {
  readAll(): Promise<DataItem[]> {
    return this.fetchAsText().then(parseJson)
  }
}
