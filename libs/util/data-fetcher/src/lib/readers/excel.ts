import { BaseFileReader } from './base-file'
import { fetchDataAsArrayBuffer } from '../utils'

export class ExcelReader extends BaseFileReader {
  protected async getLoadQuery(): Promise<string> {
    // we download the file as an array buffer first, in order to be able to check if it's an XLS file
    let buffer = await fetchDataAsArrayBuffer(this.url, this.cacheEnabled)
    const bufferHandle = `B${this.datasetId}`

    // checking against the magic number at the beginning of XLS files, see https://en.wikipedia.org/wiki/List_of_file_signatures
    const magicNumber = new Uint8Array(buffer, 0, 8) // first 8 bytes
    const isXls =
      Array.from(magicNumber)
        .map((n) => n.toString(16).toUpperCase())
        .join(' ') === 'D0 CF 11 E0 A1 B1 1A E1'

    // uh oh, this is an XLS file (not supported by duckdb); convert it to CSV using the xlsx package
    if (isXls) {
      buffer = await import('xlsx').then(({ read, utils }) => {
        const workbook = read(buffer)
        const json = utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]]
        )
        return new TextEncoder().encode(JSON.stringify(json)).buffer
      })
    }
    const duckDbFn = isXls ? 'read_json' : 'read_xlsx'

    await this.engine.registerData(bufferHandle, new Uint8Array(buffer))
    return `
CREATE TABLE ${this.datasetId} AS SELECT * FROM ${duckDbFn}("${bufferHandle}");`
  }
}
