/* eslint-disable */
import fetchMock from '@fetch-mock/jest'
import * as path from 'path'
import Worker from 'web-worker'

fetchMock.mockGlobal()

global.Headers = class {
  _value = {}
  constructor(initValue) {
    for (const key in initValue) {
      this._value[key.toLowerCase()] = initValue[key]
    }
  }
  has(name) {
    return name.toLowerCase() in this._value
  }
  get(name) {
    if (!this.has(name)) throw new TypeError()
    return this._value[name.toLowerCase()]
  }
} as never

// hide console output in CI
if (process.env.TEST_HIDE_CONSOLE) {
  console.log = () => {}
  console.warn = () => {}
  console.error = () => {}
}

// we're overriding the bundle used by duckdb to point on the node one
// inspired by https://github.com/duckdb/duckdb-wasm/blob/main/examples/bare-node/index.cjs
const DUCKDB_DIST = path.dirname(require.resolve('@duckdb/duckdb-wasm'))
jest.mock('@duckdb/duckdb-wasm', () => {
  const originalModule = jest.requireActual('@duckdb/duckdb-wasm')
  return {
    ...originalModule,
    getJsDelivrBundles() {
      return {
        mvp: {
          mainModule: path.resolve(DUCKDB_DIST, './duckdb-mvp.wasm'),
          mainWorker: path.resolve(DUCKDB_DIST, './duckdb-node-mvp.worker.cjs'),
        },
        eh: {
          mainModule: path.resolve(DUCKDB_DIST, './duckdb-eh.wasm'),
          mainWorker: path.resolve(DUCKDB_DIST, './duckdb-node-eh.worker.cjs'),
        },
      }
    },
  }
})

global.Worker = Worker

let currentEngine = null

// this will make it so that the duckdb engine will look for files in the local file system during tests
jest.mock('./lib/engine/duckdb', () => {
  const originalModule = jest.requireActual('./lib/engine/duckdb')
  class ReplacedEngine extends originalModule.Engine {
    loadFile(datasetId, loadQuery) {
      let modifiedQuery = loadQuery
      if (/http:\/\/localfile/.test(modifiedQuery)) {
        modifiedQuery = modifiedQuery
          .replace(/http:\/\/localfile/g, __dirname)
          .replace(/\?noheader/g, '') // this is used in some tests as well
      }
      return super.loadFile(datasetId, modifiedQuery)
    }
  }
  return {
    ...originalModule,
    async getEngine() {
      if (!currentEngine) {
        currentEngine = new ReplacedEngine()
      }
      return currentEngine.isReady()
    },
  }
})

// cleanup the current Engine after a test suite is over
afterAll(() => {
  currentEngine?.close()
  currentEngine = null
})
