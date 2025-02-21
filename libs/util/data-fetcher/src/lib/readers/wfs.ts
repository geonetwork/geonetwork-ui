import { WfsEndpoint, WfsVersion } from '@camptocamp/ogc-client'
import { DataItem, DatasetInfo, PropertyInfo } from '../model'
import { fetchDataAsText } from '../utils'
import { BaseReader } from './base'
import { GmlReader, parseGml } from './gml'
import { GeojsonReader, parseGeojson } from './geojson'

export class WfsReader extends BaseReader {
  endpoint: WfsEndpoint
  featureTypeName: string
  version: WfsVersion

  constructor(url: string, wfsEndpoint: WfsEndpoint, featureTypeName: string) {
    super(url)
    this.endpoint = wfsEndpoint
    this.featureTypeName = featureTypeName
    this.version = this.endpoint.getVersion()
  }

  get properties(): Promise<PropertyInfo[]> {
    return this.getData().then((result) => result.properties)
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
    const asJson = this.endpoint.supportsJson(this.featureTypeName)
    let url = this.endpoint.getFeatureUrl(this.featureTypeName, {
      ...(this.startIndex !== null && { startIndex: this.startIndex }),
      ...(this.count !== null && { maxFeatures: this.count }),
      asJson,
      outputCrs: 'EPSG:4326',
      // sortBy: this.sort // TODO: no sort in ogc-client?
    })

    if (Array.isArray(this.sort) && this.sort.length > 0) {
      const finalUrl = new URL(url)
      const sorts = this.sort
        .map(
          (fieldSort) => `${fieldSort[1]}+${fieldSort[0] === 'asc' ? 'A' : 'D'}`
        )
        .join(',')

      finalUrl.searchParams.append('SORTBY', sorts)
      url = finalUrl.toString()
    }

    return fetchDataAsText(url).then((text) =>
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
