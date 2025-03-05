import { BaseReader } from './base'
import { DataItem, DatasetInfo, PropertyInfo } from '../model'
import { getJsonDataItemsProxy, jsonToGeojsonFeature } from '../utils'
import { generateSqlQuery } from '../sql-utils'
import { BaseCacheReader } from './base-cache'

type ParseResult = {
  items: DataItem[]
  properties: PropertyInfo[]
}

export class BaseFileReader extends BaseCacheReader {
  private parseResult_: Promise<ParseResult>

  protected getData(): Promise<ParseResult> {
    throw new Error('not implemented')
  }

  load() {
    this.parseResult_ = this.getData()
  }

  get properties(): Promise<PropertyInfo[]> {
    return this.parseResult_.then((result) => result.properties)
  }

  get info(): Promise<DatasetInfo> {
    return this.parseResult_.then(
      (result) =>
        ({
          itemsCount: result.items.length,
        }) as DatasetInfo
    )
  }

  async read(): Promise<DataItem[]> {
    const items = (await this.parseResult_).items
    // no query defined: return the full results as is
    if (
      this.groupedBy == null &&
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
      this.groupedBy,
      this.aggregations
    )
    const result = await import('alasql').then((module) =>
      module.default(query, [jsonItems])
    )
    return result.map(jsonToGeojsonFeature)
  }
}
