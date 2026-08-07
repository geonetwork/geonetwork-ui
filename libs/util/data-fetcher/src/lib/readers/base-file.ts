import { DataItem, DatasetInfo, PropertyInfo } from '../model'
import { generateSqlQuery } from '../engine/sql-utils'
import { BaseCacheReader } from './base-cache'
import { Engine, getEngine } from '../engine/duckdb'

// type ParseResult = {
//   items: DataItem[]
//   properties: PropertyInfo[]
// }

/**
 * This reader handles file formats supported natively by DuckDB
 */
export class BaseFileReader extends BaseCacheReader {
  private loaded: Promise<void>
  protected engine: Engine
  protected datasetId: string
  protected properties_: PropertyInfo[]
  protected geometryColumn: string
  protected rowsCount: number

  protected async getLoadQuery(): Promise<string> {
    throw new Error('not implemented')
  }

  async load() {
    this.datasetId = `datafetcher${Math.floor(Math.random() * 1000000)}`
    this.loaded = getEngine()
      .then((engine) => {
        this.engine = engine
        return this.getLoadQuery()
      })
      .then((loadQuery) => this.engine.loadFile(this.datasetId, loadQuery))
      .then((datasetInfo) => {
        this.properties_ = datasetInfo.properties
        this.geometryColumn = datasetInfo.geometryColumn
        this.rowsCount = datasetInfo.rowsCount
        // returns void for the loaded promise
      })
      .catch((e) => {
        console.error(e.stack ?? e.message)
      })
  }

  get properties(): Promise<PropertyInfo[]> {
    return this.loaded.then(() => this.properties_)
  }

  get info(): Promise<DatasetInfo> {
    return this.loaded.then(() => ({
      itemsCount: this.rowsCount,
      hasGeometry: !!this.geometryColumn,
    }))
  }

  async read(): Promise<DataItem[]> {
    await this.loaded

    // if only certain fields are selected, omit the geometry
    const geometryColumn = this.selected === null ? this.geometryColumn : null

    const query = generateSqlQuery(
      this.datasetId,
      this.selected,
      this.filter,
      this.sort,
      this.startIndex,
      this.count,
      this.groupedBy,
      this.aggregations,
      geometryColumn
    )

    return this.engine.queryItems(query)
  }
}
