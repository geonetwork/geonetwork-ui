import * as Papa from 'papaparse'
import { DataItem, DatasetInfo, PropertyInfo } from '../lib/model'
import { BaseDataset } from './base'
import { jsonToGeojsonFeature, processItemProperties } from '../lib/utils'
import * as duckdb from '@duckdb/duckdb-wasm'

const DUCKDB_BUNDLES: duckdb.DuckDBBundles = {
  mvp: {
    mainModule: './duckdb-mvp.wasm',
    mainWorker: './assets/duckdb-browser-mvp.worker.js',
  },
  eh: {
    mainModule: './duckdb-eh.wasm',
    mainWorker: './assets/duckdb-browser-eh.worker.js',
  },
}

export function parseCsv(text: string): {
  items: DataItem[]
  properties: PropertyInfo[]
} {
  // first parse the header to guess the delimiter
  // note that we do that to not rely on Papaparse logic for guessing delimiter
  let delimiter
  try {
    const header = text.split('\n')[0]
    const result = Papa.parse(header, {
      header: false,
    })
    delimiter = result.meta.delimiter
  } catch (e) {
    throw new Error('CSV parsing failed: the delimiter could not be guessed')
  }

  const parsed = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    delimiter,
  })
  if (parsed.errors.length) {
    throw new Error(
      'CSV parsing failed for the following reasons:\n' +
        parsed.errors
          .map(
            (error) =>
              `* ${error.message} at row ${error.row}, column ${error.index}`
          )
          .join('\n')
    )
  }

  const items = (parsed.data as any[]).map(jsonToGeojsonFeature)
  return processItemProperties(items, true)
}

const databasePromise: Promise<duckdb.AsyncDuckDB> = Promise.resolve().then(
  async () => {
    const bundle = await duckdb.selectBundle(DUCKDB_BUNDLES)
    const logger = new duckdb.ConsoleLogger()
    const worker = new Worker(bundle.mainWorker)
    const db = new duckdb.AsyncDuckDB(logger, worker)
    await db.instantiate(bundle.mainModule)
    return db
  }
)

async function addCsvToDatabase(
  url: string
): Promise<duckdb.AsyncDuckDBConnection> {
  const db = await databasePromise
  const connection = await db.connect()
  await connection.insertCSVFromPath(url, {
    name: 'bla',
    detect: true,
  })
  return connection
}

export class CsvDataset extends BaseDataset {
  private connection = addCsvToDatabase(this.url)
  // private parseResult_ = this.fetchAsText().then(parseCsv)
  // private propertiesInfo_ = this.parseResult_.then(
  //   (result) => result.properties
  // )
  // private datasetInfo_ = this.parseResult_.then(
  //   (result) =>
  //     ({
  //       itemsCount: result.items.length,
  //     } as DatasetInfo)
  // )

  get properties(): Promise<PropertyInfo[]> {
    return Promise.resolve([])
  }

  get info(): Promise<DatasetInfo> {
    return Promise.resolve({ itemsCount: 0 })
  }

  async readAll(): Promise<DataItem[]> {
    const conn = await this.connection
    try {
      const result = await conn.query(
        // 'SELECT DISTINCT "Ville", SUM("Consommation (kWhEN)") FROM bla GROUP BY "Ville"'
        'SELECT DISTINCT * FROM bla LIMIT 400'
      )
      return result.toArray().map(jsonToGeojsonFeature)
    } catch (e: any) {
      console.error(e.trace)
      return []
    }
  }
}
