import * as Papa from 'papaparse'
import { DataItem, DatasetInfo, PropertyInfo } from '../lib/model'
import { BaseDataset } from './base'
import { jsonToGeojsonFeature, processItemProperties } from '../lib/utils'

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

export class CsvDataset extends BaseDataset {
  private parseResult_ = this.fetchAsText().then(parseCsv)
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
