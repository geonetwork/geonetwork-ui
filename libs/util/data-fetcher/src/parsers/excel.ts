import { DataItem, PropertyInfo } from '../lib/model'
import { jsonToGeojsonFeature, processItemProperties } from '../lib/utils'
import { BaseFileDataset } from './base-file'

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

export class ExcelDataset extends BaseFileDataset {
  getData() {
    return this.fetchAsBuffer().then(parseExcel)
  }
}
