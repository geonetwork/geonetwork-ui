import type { Feature } from 'geojson'
import * as XLSX from 'xlsx'
import { jsonToGeojsonFeature } from './json'

/**
 * This will read the first sheet of the excel workbook and expect the first
 * line to contain the properties names
 * @param buffer
 */
export function parseExcel(buffer: ArrayBuffer): Feature[] {
  const workbook = XLSX.read(buffer)
  const sheet = workbook.Sheets[workbook.SheetNames[0]]

  const json = XLSX.utils.sheet_to_json(sheet)
  if (!json.length) {
    return []
  }

  return json.map(jsonToGeojsonFeature)
}
