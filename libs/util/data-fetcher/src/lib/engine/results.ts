import { DataItem } from '../model'
import { Feature } from 'geojson'
import { DataType, StructRow, Table, Vector } from 'apache-arrow'
import { GEOMETRY_COLUMN_ALIAS } from './sql-utils'

export function arrowTableToDataItems(
  table: Table<{ [key: string]: DataType }>
): DataItem[] {
  const fields = table.schema.fields

  return table.toArray().map((row: StructRow) => {
    const rowJson = row.toJSON()
    const feature: Feature = {
      type: 'Feature',
      geometry: null,
      properties: {},
    }
    const keys = Object.keys(rowJson)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const dataType = fields[i].type
      let value = rowJson[key]
      // this might happen if we get an array inside a field
      if (value instanceof Vector) {
        value = Array.from(value)
      }
      // cast bigints to ints
      if (typeof value === 'bigint') {
        value = Number(value)
      }
      // rename columns with empty name
      if (!key) {
        feature.properties['unknown'] = value
        continue
      }
      // assign properties that look like an id to the geojson `id` field
      if (
        /^(object|feature)?_?id$/.test(key.toLowerCase()) &&
        (typeof value == 'string' || typeof value === 'number')
      ) {
        feature.id = value
      }
      // if a date is in timestamp (number) format, convert it to native
      if (
        typeof value === 'number' &&
        (DataType.isTimestamp(dataType) || DataType.isDate(dataType))
      ) {
        value = new Date(value)
      }
      // if a binary field (most likely a geometry column): skip
      if (DataType.isBinary(dataType)) {
        continue
      }
      // geometry column
      if (key === GEOMETRY_COLUMN_ALIAS && DataType.isUtf8(dataType)) {
        feature.geometry = JSON.parse(value)
        continue
      }
      feature.properties[key] = value
    }
    return feature
  })
}
