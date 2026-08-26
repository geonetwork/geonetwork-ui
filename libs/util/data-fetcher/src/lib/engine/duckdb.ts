import * as duckdb from '@duckdb/duckdb-wasm'
import { DataItem, FetchError, PropertyInfo } from '../model'
import { arrowTableToDataItems } from './results'
import { Table } from 'apache-arrow'

// init code taken from https://github.com/duckdb/duckdb-wasm/blob/main/packages/duckdb-wasm/README.md
const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles()

// from https://duckdb.org/docs/current/sql/data_types/overview
const typesMapping: Record<string, PropertyInfo['type']> = {
  INTEGER: 'number',
  SMALLINT: 'number',
  TINYINT: 'number',
  BIGINT: 'number',
  HUGEINT: 'number',
  UINTEGER: 'number',
  USMALLINT: 'number',
  UTINYINT: 'number',
  UBIGINT: 'number',
  UHUGEINT: 'number',
  DOUBLE: 'number',
  BIGNUM: 'number',
  DECIMAL: 'number',
  NUMERIC: 'number',
  FLOAT: 'number',
  REAL: 'number',
  'TIMESTAMP WITH TIME ZONE': 'date',
  TIMESTAMP: 'date',
  DATE: 'date',
  CHAR: 'string',
  VARCHAR: 'string',
  TEXT: 'string',
  UUID: 'string',
  BLOB: 'string',
  BIT: 'string',
  INTERVAL: 'string',
  LIST: 'string',
  BOOLEAN: 'boolean',
}

export class Engine {
  private db: duckdb.AsyncDuckDB
  private init_: Promise<Engine>

  private async makeInit(): Promise<Engine> {
    const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES)
    let worker_url = bundle.mainWorker

    // this is necessary to let browsers execute WASM code coming from a cross-origin host
    if (worker_url.startsWith('https://')) {
      worker_url = URL.createObjectURL(
        new Blob([`importScripts("${worker_url}");`], {
          type: 'text/javascript',
        })
      )
    }
    const worker = new Worker(worker_url)
    const logger = new duckdb.ConsoleLogger(duckdb.LogLevel.WARNING)
    this.db = new duckdb.AsyncDuckDB(logger, worker)
    await this.db.instantiate(bundle.mainModule, bundle.pthreadWorker)

    // setup duckdb options
    const conn = await this.db.connect()
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    await conn.query(`INSTALL spatial; LOAD spatial;`)
    await conn.query(`SET TimeZone = '${timezone}';`)
    await conn.query(`SET threads = 1;`)
    // await conn.query(`SET memory_limit = '2GB';`) // used for experimenting when we encounter memory issues
    await conn.query(`SET preserve_insertion_order = false;`) // this reduces memory usage when loading a dataset
    conn.close()
    return this
  }

  isReady(): Promise<Engine> {
    if (!this.init_) {
      this.init_ = this.makeInit()
    }
    return this.init_
  }

  /**
   * Returns information about a dataset once it's loaded:
   * - a list of properties description
   * - the name of the dataset geometry column (null if no geometry present)
   * @param datasetId name of the table under which the dataset will be stored
   * @param loadQuery duckdb-specific query for creating a table out of the data
   * @param forceReload if true, any existing data will be dropped and redownloaded
   */
  async loadFile(
    datasetId: string,
    loadQuery: string,
    forceReload = false
  ): Promise<{
    properties: PropertyInfo[]
    geometryColumn: string | null
    rowsCount: number
  }> {
    const conn = await this.db.connect()
    let results: Table

    // either we want to recreate the table, or we keep it if it already exists
    const safeLoadQuery = forceReload
      ? `DROP TABLE IF EXISTS ${datasetId};
${loadQuery}`
      : loadQuery.replace(
          /CREATE TABLE(?! IF NOT EXISTS)/gi,
          'CREATE TABLE IF NOT EXISTS'
        )

    // create the table
    try {
      results = await conn.query(safeLoadQuery)
    } catch (e: unknown) {
      throw new FetchError(
        'parse',
        `DuckDB encountered an error when loading the data: ${(e as Error).message}`
      )
    }

    // read rows count
    results = await conn.query(`SELECT count(*) FROM ${datasetId}`)
    const { 'count_star()': recordsCount } = results.toArray()[0].toJSON()

    // read columns
    results = await conn.query(
      `SELECT * FROM information_schema.columns WHERE table_name = '${datasetId}';`
    )
    let geometryColumn: string | null = null

    const properties = results
      .toArray()
      .map((row) => {
        const rowObj = row.toJSON()
        if (rowObj['data_type'] === 'GEOMETRY') {
          // the geometry is not part of the properties
          // note: right now we only keep one geometry column name, but if there are multiple they will
          // all get discarded
          geometryColumn = rowObj['column_name']
          return null
        }
        return {
          name: rowObj['column_name'],
          label: rowObj['column_name'],
          type: typesMapping[rowObj['data_type']] ?? 'other',
        } as PropertyInfo
      })
      .filter((prop) => prop !== null)

    conn.close()

    return {
      properties,
      geometryColumn,
      rowsCount: Number(recordsCount),
    }
  }

  // register a Uint8 buffer using a handle in the duckdb instance
  async registerData(name: string, buffer: Uint8Array) {
    return this.db.registerFileBuffer(name, buffer)
  }

  /**
   * @param query duckdb-specific query for fetching items
   */
  async queryItems(query: string): Promise<DataItem[]> {
    const conn = await this.db.connect()
    const results = await conn.query(query)
    conn.close()
    return arrowTableToDataItems(results)
  }

  close() {
    this.db?.terminate()
  }
}

let engine: Engine | null = null

export async function getEngine(): Promise<Engine> {
  if (!engine) {
    engine = new Engine()
  }
  return engine.isReady()
}
