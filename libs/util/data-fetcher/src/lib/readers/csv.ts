import * as Papa from 'papaparse'
import { DataItem, PropertyInfo } from '../model'
import {
  fetchDataAsText,
  jsonToGeojsonFeature,
  processItemProperties,
} from '../utils'
import { BaseFileReader } from './base-file'

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

export class CsvReader extends BaseFileReader {
  getData() {
    return fetchDataAsText(this.url, this.cacheActive).then(parseCsv)
  }
}
