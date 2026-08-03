import { BaseCacheReader } from './base-cache'
import { EndpointError, WfsEndpoint } from '@camptocamp/ogc-client'
import { DataItem, DatasetInfo, FetchError, PropertyInfo } from '../model'
import { fetchDataAsText } from '../utils'
import WFS from 'ol/format/WFS'
import GeoJSON from 'ol/format/GeoJSON'
import { GeojsonReader } from './geojson'
import { GmlReader } from './gml'

const formatGeojson = new GeoJSON()

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

export function parseGml(
  text: string,
  featureType: string,
  version: string
): DataItem[] {
  const parts = featureType.split(':')
  const regex = new RegExp(`xmlns:${parts[0]}=["']([^'"]*)["']`)
  const match = regex.exec(text)
  if (match && match.length >= 2) {
    const wf = new WFS({
      featureNS: match[1],
      featureType: parts[1],
      version: version,
    })
    let features
    try {
      features = wf.readFeatures(text)
    } catch (e: unknown) {
      throw Error(
        `Couldn't parse WFS with GML features: ${(e as Error).message}`
      )
    }
    const geojsonItem = formatGeojson.writeFeaturesObject(features)
    return geojsonItem.features
  }
  throw Error("Couldn't retrieve namespace url")
}

export async function getWfsEndpoint(wfsUrl: string): Promise<WfsEndpoint> {
  try {
    return await new WfsEndpoint(wfsUrl).isReady()
  } catch (e) {
    if (
      e instanceof Error &&
      'isCrossOriginRelated' in e &&
      'httpStatus' in e
    ) {
      const error = e as EndpointError
      if (error.isCrossOriginRelated === true) {
        throw new Error(`wfs.unreachable.cors`)
      }
      if (error.httpStatus === 401 || error.httpStatus === 403) {
        throw FetchError.forbidden(error.httpStatus)
      } else if (error.httpStatus === 400 || error.httpStatus > 403) {
        throw FetchError.http(error.httpStatus)
      } else {
        throw FetchError.unknownType()
      }
    } else {
      throw FetchError.unknownType()
    }
  }
}

export class WfsReader extends BaseCacheReader {
  endpoint: WfsEndpoint
  featureType: string

  constructor(
    url: string,
    endpoint: WfsEndpoint,
    featureType: string,
    cacheActive?: boolean
  ) {
    super(url, cacheActive)
    this.featureType = featureType
    this.endpoint = endpoint
  }

  get properties(): Promise<PropertyInfo[]> {
    return this.endpoint
      .getFeatureTypeFull(this.featureType)
      .then((featureType) =>
        Object.keys(featureType.properties).map((prop) => {
          const originalType = featureType.properties[prop]
          let type: PropertyInfo['type']
          if (originalType === 'float' || originalType === 'integer') {
            type = 'number'
          } else if (originalType === 'boolean') {
            type = 'string' // we don't handle booleans yet in the data fetcher
          } else {
            type = originalType
          }
          return {
            name: prop,
            label: prop,
            type,
          }
        })
      )
  }

  get info(): Promise<DatasetInfo> {
    return this.endpoint.getFeatureTypeFull(this.featureType).then(
      (result) =>
        ({
          itemsCount: result.objectCount,
          hasGeometry: !!result.geometryName,
        }) as DatasetInfo
    )
  }

  static async createReader(wfsUrlEndpoint: string, featureTypeName?: string) {
    const wfsEndpoint = await getWfsEndpoint(wfsUrlEndpoint)
    const featureTypes = wfsEndpoint.getFeatureTypes()
    const featureType = wfsEndpoint.getFeatureTypeSummary(
      featureTypes.length === 1 && !featureTypeName
        ? featureTypes[0].name
        : featureTypeName
    )
    if (!featureType) {
      throw new Error('wfs.featuretype.notfound')
    }

    if (wfsEndpoint.supportsStartIndex()) {
      return new WfsReader(wfsUrlEndpoint, wfsEndpoint, featureType.name)
    } else if (wfsEndpoint.supportsJson(featureType.name)) {
      return new GeojsonReader(
        wfsEndpoint.getFeatureUrl(featureType.name, {
          asJson: true,
          outputCrs: 'EPSG:4326',
        })
      )
    } else {
      if (
        featureType.outputFormats.find((f) =>
          f.toLowerCase().includes('gml')
        ) &&
        (featureType.defaultCrs === 'EPSG:4326' ||
          featureType.otherCrs?.includes('EPSG:4326'))
      ) {
        return new GmlReader(
          wfsEndpoint.getFeatureUrl(featureType.name, {
            outputFormat: featureType.outputFormats.find((f) =>
              f.toLowerCase().includes('gml')
            ),
            outputCrs: 'EPSG:4326',
          })
        )
      }
      throw new Error('wfs.geojsongml.notsupported')
    }
  }

  load() {
    // Nothing to load for Wfs
  }

  async read(): Promise<DataItem[]> {
    // asking for aggregations or groupedby will yield nothing if using WFS protocol
    if (this.aggregations || this.groupedBy) {
      return []
    }
    const asJson = this.endpoint.supportsJson(this.featureType)
    const attributes = this.selected ?? undefined
    let sortBy = null
    if (this.sort) {
      const mapSort = (s) => [s[0] === 'desc' ? 'D' : 'A', s[1]]
      sortBy = Array.isArray(this.sort[0])
        ? this.sort.map(mapSort)
        : mapSort(this.sort)
    }
    const url = this.endpoint.getFeatureUrl(this.featureType, {
      ...(this.startIndex !== null && { startIndex: this.startIndex }),
      ...(this.count !== null && { maxFeatures: this.count }),
      asJson,
      outputCrs: 'EPSG:4326',
      attributes,
      sortBy,
    })

    return fetchDataAsText(url, this.cacheActive).then((text) =>
      asJson
        ? parseGeojson(text)
        : parseGml(text, this.featureType, this.endpoint.getVersion())
    )
  }
}
