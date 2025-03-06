import { WfsEndpoint, WfsVersion } from '@camptocamp/ogc-client'
import { DataItem, DatasetInfo, PropertyInfo } from '../model'
import { fetchDataAsText } from '../utils'
import { GmlReader, parseGml } from './gml'
import { GeojsonReader, parseGeojson } from './geojson'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { BaseCacheReader } from './base-cache'

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
    const wfsEndpoint = await new WfsEndpoint(wfsUrlEndpoint).isReady()
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

  protected getData() {
    if (this.aggregations || this.groupedBy) {
      throw new Error(marker('wfs.aggregations.notsupported'))
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

  load() {
    // Nothing to load for Wfs
  }

  async read(): Promise<DataItem[]> {
    return (await this.getData()).items
  }
}
