import { BaseFileReader } from './base-file'
import { DataItem } from '@geonetwork-ui/data-fetcher'
import { PropertyInfo } from '../model'
import { fetchDataAsText, processItemProperties } from '../utils'
import { WFS, GeoJSON } from 'ol/format'

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

  if (match[1]) {
    const wf = new WFS({
      featureNS: match[1],
      featureType: splittedNamespace[1],
      version: '2.0.0',
    })

    const geojsonItem = new GeoJSON().writeFeaturesObject(wf.readFeatures(text))
    return processItemProperties(geojsonItem.features, true)
  }
  throw Error("Couldn't retrieve namespace")
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
