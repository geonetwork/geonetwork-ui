import { BaseReader } from './base'
import { DataItem, DatasetInfo, PropertyInfo } from '../model'
import {
  fetchData,
  generateSqlQuery,
  getJsonDataItemsProxy,
  jsonToGeojsonFeature,
} from '../utils'
import alasql from 'alasql'

type ParseResult = {
  items: DataItem[]
  properties: PropertyInfo[]
}

export class BaseFileReader extends BaseReader {
  private parseResult_: Promise<ParseResult>
  private propertiesInfo_: Promise<PropertyInfo[]>
  private datasetInfo_: Promise<DatasetInfo>

  protected getData(): Promise<ParseResult> {
    throw new Error('not implemented')
  }

  load() {
    this.parseResult_ = this.getData()
    this.propertiesInfo_ = this.parseResult_.then((result) => result.properties)
    this.datasetInfo_ = this.parseResult_.then(
      (result) =>
        ({
          itemsCount: result.items.length,
        } as DatasetInfo)
    )
  }

  get properties(): Promise<PropertyInfo[]> {
    return this.propertiesInfo_
  }

  get info(): Promise<DatasetInfo> {
    return this.datasetInfo_
  }

  async read(): Promise<DataItem[]> {
    const items = (await this.parseResult_).items
    // no query defined: return the full results as is
    if (
      this.groupBy == null &&
      this.aggregations == null &&
      this.selected == null &&
      this.sort == null &&
      this.filter == null &&
      this.startIndex == null &&
      this.count == null
    ) {
      return items
    }

    const jsonItems = getJsonDataItemsProxy(items)
    const query = generateSqlQuery(
      this.selected,
      this.filter,
      this.sort,
      this.startIndex,
      this.count,
      this.groupBy,
      this.aggregations
    )
    const result = alasql(query, [jsonItems])
    return result.map(jsonToGeojsonFeature)
  }

  protected fetchAsText(): Promise<string> {
    return fetchData(this.url).then((resp) => resp.text())
  }

  protected fetchAsBuffer(): Promise<ArrayBuffer> {
    return fetchData(this.url).then((resp) => resp.arrayBuffer())
  }
}
