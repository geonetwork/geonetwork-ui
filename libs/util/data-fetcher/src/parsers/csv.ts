import * as Papa from 'papaparse'
import type { Feature } from 'geojson'

export function parseCsv(text: string): Feature[] {
  const parsed = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
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
  return (parsed.data as any[]).map((item) => {
    const { id, properties } = Object.keys(item).reduce(
      (prev, curr) =>
        curr.toLowerCase().endsWith('id')
          ? {
              ...prev,
              id: item[curr],
            }
          : { ...prev, properties: { ...prev.properties, [curr]: item[curr] } },
      { id: undefined, properties: {} }
    )
    return {
      type: 'Feature',
      geometry: null,
      properties,
      ...(id !== undefined && { id }),
    }
  })
}
