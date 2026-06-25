import type { AsyncDuckDB } from '@duckdb/duckdb-wasm'

// Build absolute URLs so the DuckDB worker resolves WASM correctly regardless of its own location.
// WASM + worker files must be present in assets/duckdb/ via project.json asset glob.
function duckdbBundles() {
  const base = document.baseURI.replace(/\/?$/, '/')
  return {
    mvp: {
      mainModule: `${base}assets/duckdb/duckdb-mvp.wasm`,
      mainWorker: `${base}assets/duckdb/duckdb-browser-mvp.worker.js`,
    },
    eh: {
      mainModule: `${base}assets/duckdb/duckdb-eh.wasm`,
      mainWorker: `${base}assets/duckdb/duckdb-browser-eh.worker.js`,
    },
  }
}

let dbPromise: Promise<AsyncDuckDB> | null = null

function getDb(): Promise<AsyncDuckDB> {
  if (!dbPromise) {
    dbPromise = import('@duckdb/duckdb-wasm')
      .then(async (duckdb) => {
        const bundle = await duckdb.selectBundle(duckdbBundles())
        const worker = new Worker(bundle.mainWorker)
        const db = new duckdb.AsyncDuckDB(new duckdb.VoidLogger(), worker)
        await db.instantiate(bundle.mainModule, bundle.pthreadWorker)
        return db
      })
      .catch((e) => {
        dbPromise = null
        throw e
      })
  }
  return dbPromise
}

let queryCounter = 0

/** Runs a SQL query against a JSON array. Use `FROM data` as the table name in the query. */
export async function queryJsonItems(
  items: Record<string, unknown>[],
  sql: string
): Promise<Record<string, unknown>[]> {
  if (items.length === 0) return []
  const safeItems = items.map((item) =>
    Object.fromEntries(
      Object.entries(item).map(([k, v]) => [
        k,
        v !== null && typeof v === 'object' ? JSON.stringify(v) : v,
      ])
    )
  )
  const db = await getDb()
  const conn = await db.connect()
  const fileName = `__query_${queryCounter++}__.json`
  try {
    await db.registerFileText(fileName, JSON.stringify(safeItems))
    await conn.query(
      `CREATE TEMP TABLE data AS SELECT * FROM read_json_auto('${fileName}')`
    )
    const result = await conn.query(sql)
    return result.toArray().map((row) => {
      const obj = row.toJSON()
      return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [
          k,
          typeof v === 'bigint' ? Number(v) : v,
        ])
      )
    })
  } finally {
    await conn.close()
    await db.dropFile(fileName)
  }
}
