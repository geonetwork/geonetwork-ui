import { DataItem, DatasetInfo, PropertyInfo } from '../model'
import { generateSqlQuery } from '../engine/sql-utils'
import { Engine, getEngine } from '../engine/duckdb'
import { BaseReader } from './base'

/**
 * This reader handles file formats supported natively by DuckDB
 */
export class BaseFileReader extends BaseReader {
  private loaded: Promise<void>
  protected engine: Engine
  protected datasetId: string
  protected properties_: PropertyInfo[]
  protected geometryColumn: string
  protected rowsCount: number

  // a table id should not exceed 63 chars
  protected generateDatasetId() {
    // generate a hash out of the url
    let hash = 0
    for (const char of this.url) {
      hash = (hash << 5) - hash + char.charCodeAt(0)
      hash = hash >>> 0 // make it unsigned
    }
    return `datafetcher_${hash.toString(16)}`
  }

  protected async getLoadQuery(): Promise<string> {
    throw new Error('not implemented')
  }

  async load() {
    this.datasetId = this.generateDatasetId()
    this.loaded = getEngine()
      .then((engine) => {
        this.engine = engine
        return this.getLoadQuery()
      })
      .then((loadQuery) =>
        this.engine.loadFile(this.datasetId, loadQuery, !this.cacheEnabled)
      )
      .then((datasetInfo) => {
        this.properties_ = datasetInfo.properties
        this.geometryColumn = datasetInfo.geometryColumn
        this.rowsCount = datasetInfo.rowsCount
        // returns void for the loaded promise
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
