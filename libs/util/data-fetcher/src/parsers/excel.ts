import { DataItem, DatasetInfo, PropertyInfo } from '../lib/model'
import { BaseDataset } from './base'
import { jsonToGeojsonFeature, processItemProperties } from '../lib/utils'

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

export class ExcelDataset extends BaseDataset {
  private parseResult_ = this.fetchAsBuffer().then(parseExcel)
  private propertiesInfo_ = this.parseResult_.then(
    (result) => result.properties
  )
  private datasetInfo_ = this.parseResult_.then(
    (result) =>
      ({
        itemsCount: result.items.length,
      } as DatasetInfo)
  )
  get properties(): Promise<PropertyInfo[]> {
    return this.propertiesInfo_
  }

  get info(): Promise<DatasetInfo> {
    return this.datasetInfo_
  }
  readAll(): Promise<DataItem[]> {
    return this.parseResult_.then((result) => result.items)
  }
}
