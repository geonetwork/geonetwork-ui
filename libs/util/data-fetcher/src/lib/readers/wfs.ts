import {
  EndpointError,
  WfsEndpoint,
  WfsFeatureTypeFull,
} from '@camptocamp/ogc-client'
import { DataItem, DatasetInfo, FetchError, PropertyInfo } from '../model'
import { fetchDataAsText } from '../utils'
import WFS from 'ol/format/WFS'
import GeoJSON from 'ol/format/GeoJSON'
import Feature from 'ol/Feature'
import { GeojsonReader } from './geojson'
import { GmlReader } from './gml'
import { BaseReader } from './base'

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
    const wfs = new WFS({
      featureNS: match[1],
      featureType: parts[1],
      version: version,
    })
    let features: Feature[]
    try {
      features = wfs.readFeatures(text)
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

export class WfsReader extends BaseReader {
  endpoint: Promise<WfsEndpoint>
  featureType: Promise<WfsFeatureTypeFull>

  /**
   * This dataset reader will read the whole data as geojson or gml instead of
   * using the WFS protocol; it is used in the following situations:
   * - the endpoint does not support pagination
   * - aggregations or grouping are set on the dataset (i.e. for chart view)
   */
  backupReader_: Promise<BaseReader>

  constructor(url: string, featureTypeName: string) {
    super(url)
    this.endpoint = getWfsEndpoint(url)

    this.featureType = this.endpoint
      .then((endpoint) => {
        const featureTypes = endpoint.getFeatureTypes()
        return endpoint.getFeatureTypeFull(
          featureTypes.length === 1 && !featureTypeName
            ? featureTypes[0].name
            : featureTypeName
        )
      })
      .then((featureType) => {
        if (!featureType) {
          throw new Error('wfs.featuretype.notfound')
        }
        return featureType
      })
  }

  get backupReader(): Promise<BaseReader> {
    if (this.backupReader_) {
      return this.backupReader_
    }

    this.backupReader_ = Promise.all([this.endpoint, this.featureType]).then(
      ([endpoint, featureType]) => {
        let reader: BaseReader
        if (endpoint.supportsJson(featureType.name)) {
          reader = new GeojsonReader(
            endpoint.getFeatureUrl(featureType.name, {
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
            reader = new GmlReader(
              endpoint.getFeatureUrl(featureType.name, {
                outputFormat: featureType.outputFormats.find((f) =>
                  f.toLowerCase().includes('gml')
                ),
                outputCrs: 'EPSG:4326',
              })
            )
          }
        }
        reader.enableCache(this.cacheEnabled)
        reader.load()
        return reader
      }
    )
    return this.backupReader_
  }

  get properties(): Promise<PropertyInfo[]> {
    return this.featureType.then((featureType) =>
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
    return this.featureType.then(
      (result) =>
        ({
          itemsCount: result.objectCount,
          hasGeometry: !!result.geometryName,
        }) as DatasetInfo
    )
  }

  load() {
    // Nothing to load for Wfs
  }

  async read(): Promise<DataItem[]> {
    const endpoint = await this.endpoint
    const featureType = await this.featureType

    // if we can't use the WFS protocol we fall back to the backup reader
    if (this.aggregations || this.groupedBy || !endpoint.supportsStartIndex()) {
      const backupReader = await this.backupReader
      backupReader.selectAll()
      if (this.selected) {
        backupReader.select(...this.selected)
      }
      if (this.aggregations) {
        backupReader.aggregate(...this.aggregations)
      }
      if (this.groupedBy) {
        backupReader.groupBy(...this.groupedBy)
      }
      if (this.sort) {
        backupReader.orderBy(...this.sort)
      }
      if (this.startIndex !== null && this.count !== null) {
        backupReader.limit(this.startIndex, this.count)
      }
      return backupReader.read()
    }

    const asJson = endpoint.supportsJson(featureType.name)
    const attributes = this.selected ?? undefined
    let sortBy = null
    if (this.sort) {
      const mapSort = (s) => [s[0] === 'desc' ? 'D' : 'A', s[1]]
      sortBy = Array.isArray(this.sort[0])
        ? this.sort.map(mapSort)
        : mapSort(this.sort)
    }
    const url = endpoint.getFeatureUrl(featureType.name, {
      ...(this.startIndex !== null && { startIndex: this.startIndex }),
      ...(this.count !== null && { maxFeatures: this.count }),
      asJson,
      outputCrs: 'EPSG:4326',
      attributes,
      sortBy,
    })

    return fetchDataAsText(url, this.cacheEnabled).then((text) =>
      asJson
        ? parseGeojson(text)
        : parseGml(text, featureType.name, endpoint.getVersion())
    )
  }
}
