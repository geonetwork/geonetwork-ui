import { DataItem, PropertyInfo } from '../model'
import {
  fetchDataAsArrayBuffer,
  jsonToGeojsonFeature,
  processItemProperties,
} from '../utils'
import { BaseFileReader } from './base-file'

/**
 * This will read the first sheet of the excel workbook and expect the first
 * line to contain the properties names
 * @param buffer
 */
export function parseExcel(buffer: ArrayBuffer): Promise<{
  items: DataItem[]
  properties: PropertyInfo[]
}> {
  return import('xlsx').then(({ read, utils }) => {
    const workbook = read(buffer)
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    let json = utils.sheet_to_json(sheet)
    if (!json.length) {
      json = []
    }
    return processItemProperties(json.map(jsonToGeojsonFeature), true)
  })
}

export class ExcelReader extends BaseFileReader {
  getData() {
    return fetchDataAsArrayBuffer(this.url, this.cacheActive).then(parseExcel)
  }
}
