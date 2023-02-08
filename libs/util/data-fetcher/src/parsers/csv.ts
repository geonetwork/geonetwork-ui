import * as Papa from 'papaparse'
import { jsonToGeojsonFeature } from './json'
import { DataItem } from '../lib/model'
import { BaseDataset } from './base'

export function parseCsv(text: string): DataItem[] {
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
  return (parsed.data as any[]).map(jsonToGeojsonFeature)
}

export class CsvDataset extends BaseDataset {
  readAll(): Promise<DataItem[]> {
    return this.fetchAsText().then(parseCsv)
  }
}
