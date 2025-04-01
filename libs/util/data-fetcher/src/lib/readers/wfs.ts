import { EndpointError, WfsEndpoint, WfsVersion } from '@camptocamp/ogc-client'
import { DataItem, DatasetInfo, FetchError, PropertyInfo } from '../model'
import { fetchDataAsText } from '../utils'
import { GmlReader, parseGml } from './gml'
import { GeojsonReader, parseGeojson } from './geojson'
import { BaseCacheReader } from './base-cache'
import { getJsonDataItemsProxy, jsonToGeojsonFeature } from '../utils'
import { generateSqlQuery } from '../sql-utils'

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
  featureTypeName: string
  version: WfsVersion

  constructor(
    url: string,
    wfsEndpoint: WfsEndpoint,
    featureTypeName: string,
    cacheActive?: boolean
  ) {
    super(url, cacheActive)
    this.endpoint = wfsEndpoint
    this.featureTypeName = featureTypeName
    this.version = this.endpoint.getVersion()
  }

  get properties(): Promise<PropertyInfo[]> {
    return this.endpoint
      .getFeatureTypeFull(this.featureTypeName)
      .then((featureType) =>
        Object.keys(featureType.properties).map((prop) => {
          const originalType = featureType.properties[prop]
          const type =
            originalType === 'float' || originalType === 'integer'
              ? 'number'
              : (originalType as PropertyInfo['type']) // FIXME: ogc-client typing is incorrect, should be a string union
          return {
            name: prop,
            label: prop,
            type,
          }
        })
      )
  }

  get info(): Promise<DatasetInfo> {
    return this.endpoint.getFeatureTypeFull(this.featureTypeName).then(
      (result) =>
        ({
          itemsCount: result.objectCount,
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
          }),
          featureType.name,
          wfsEndpoint.getVersion()
        )
      }
      throw new Error('wfs.geojsongml.notsupported')
    }
  }

  public async getData(aggregation?, groupedBy?) {
    if (aggregation || groupedBy) {
      return { items: await this.getQueryData() }
    }
    const asJson = this.endpoint.supportsJson(this.featureTypeName)
    const attributes = this.selected ?? undefined
    let url = this.endpoint.getFeatureUrl(this.featureTypeName, {
      ...(this.startIndex !== null && { startIndex: this.startIndex }),
      ...(this.count !== null && { maxFeatures: this.count }),
      asJson,
      outputCrs: 'EPSG:4326',
      attributes,
      // sortBy: this.sort // TODO: no sort in ogc-client?
    })

    if (Array.isArray(this.sort) && this.sort.length > 0) {
      const finalUrl = new URL(url)
      const sorts = this.sort
        .map(
          (fieldSort) => `${fieldSort[1]}+${fieldSort[0] === 'asc' ? 'A' : 'D'}`
        )
        .join(',')
      // Direct update on string url to prevent encoding of +A and +D
      url = `${url}${finalUrl.search ? '&' : ''}SORTBY=${sorts}`
    }

    return fetchDataAsText(url, this.cacheActive).then((text) =>
      asJson
        ? parseGeojson(text)
        : parseGml(text, this.featureTypeName, this.version)
    )
  }

  public async getQueryData() {
    const items = (await this.getData()).items
    const jsonItems = getJsonDataItemsProxy(items)
    const query = generateSqlQuery(
      this.selected,
      this.filter,
      this.sort,
      this.startIndex,
      this.count,
      this.groupedBy,
      this.aggregations
    )
    const result = await import('alasql').then((module) =>
      module.default(query, [jsonItems])
    )
    return result.map(jsonToGeojsonFeature)
  }

  load() {
    // Nothing to load for Wfs
  }

  async read(): Promise<DataItem[]> {
    return (await this.getData(this.aggregations, this.groupedBy)).items
  }
}
