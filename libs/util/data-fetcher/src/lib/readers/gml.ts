import { BaseFileReader } from './base-file'
import { DataItem, PropertyInfo } from '../model'
import { fetchDataAsText, processItemProperties } from '../utils'
import { GeoJSON, WFS } from 'ol/format'
import { WfsVersion } from '@camptocamp/ogc-client'

export function parseGml(
  text: string,
  namespace: string,
  version: string
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
      version: version,
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
  version: WfsVersion

  constructor(url, namespace, version) {
    super(url)
    this.namespace = namespace
    this.version = version
  }

  protected getData(cache = true) {
    return fetchDataAsText(this.url, cache).then((text) =>
      parseGml(text, this.namespace, this.version)
    )
  }
}
