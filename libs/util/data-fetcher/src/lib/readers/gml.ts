import { BaseFileReader } from './base-file'
import { DataItem, PropertyInfo } from '../model'
import { fetchDataAsText, processItemProperties } from '../utils'
import { GeoJSON, WFS } from 'ol/format'

export function parseGml(
  text: string,
  namespace: string
): {
  items: DataItem[]
  properties: PropertyInfo[]
} {
  const splittedNamespace = namespace.split(':')
  const regex = new RegExp(`xmlns:${splittedNamespace[0]}=["']([^'"]*)["']`)
  const match = regex.exec(text)

  if (match && match.length >= 2) {
    const wf = new WFS({
      featureNS: match[1],
      featureType: splittedNamespace[1],
      version: '2.0.0',
    })

    let features
    try {
      features = wf.readFeatures(text)
    } catch (e) {
      throw Error("Couldn't parse WFS with GML features")
    }

    const geojsonItem = new GeoJSON().writeFeaturesObject(features)
    return processItemProperties(geojsonItem.features, true)
  }
  throw Error("Couldn't retrieve namespace url")
}

export class GmlReader extends BaseFileReader {
  namespace: string

  constructor(url, namespace) {
    super(url)
    this.namespace = namespace
  }

  protected getData() {
    return fetchDataAsText(this.url).then((text) =>
      parseGml(text, this.namespace)
    )
  }
}
