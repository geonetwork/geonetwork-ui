import { jsonToGeojsonFeature } from './json'
import { DataItem } from '../lib/model'
import { BaseDataset } from './base'

/**
 * This will read the first sheet of the excel workbook and expect the first
 * line to contain the properties names
 * @param buffer
 */
export function parseExcel(buffer: ArrayBuffer): Promise<DataItem[]> {
  return import('xlsx').then(({ read, utils }) => {
    const workbook = read(buffer)
    const sheet = workbook.Sheets[workbook.SheetNames[0]]

    const json = utils.sheet_to_json(sheet)
    if (!json.length) {
      return []
    }

    return json.map(jsonToGeojsonFeature)
  })
}

export class ExcelDataset extends BaseDataset {
  readAll(): Promise<DataItem[]> {
    return this.fetchAsBuffer().then(parseExcel)
  }
}
