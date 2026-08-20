import {
  FieldAggregation,
  FieldFilter,
  FieldGroupBy,
  FieldName,
  FieldSort,
} from '../model'

export const GEOMETRY_COLUMN_ALIAS = '__geometry__'

function fieldToSql(name: string): string {
  return `"${name.replace(/"/g, '""')}"` // escape double quotes in field names
}

function filterToSql(filter: FieldFilter): string {
  const operator = filter[0]
  const args = filter.slice(1)
  function valueToSql(value: string | number) {
    return typeof value === 'number' ? value : `'${value}'`
  }
  switch (operator) {
    case '<':
    case '<=':
    case '>':
    case '>=':
    case '=':
    case '!=':
    case 'like':
      return `${fieldToSql(args[0] as string)} ${operator.toUpperCase()} ${valueToSql(
        args[1] as string | number
      )}`
    case 'in': {
      const values = args.slice(1) as string[] | number[]
      return `${fieldToSql(args[0] as string)} IN (${values.map(valueToSql).join(', ')})`
    }
    case 'and':
    case 'or': {
      const children = (args as FieldFilter[])
        .map(filterToSql)
        .join(` ${operator.toUpperCase()} `)
      return `(${children})`
    }
    case 'not':
      return `NOT (${filterToSql(args[0] as FieldFilter)})`
  }
  throw new Error(
    `Could not generate SQL query, operator not recognized: ${operator}`
  )
}

function aggregationToSql(aggregation: FieldAggregation): string {
  const operation = aggregation[0]
  const field = aggregation[1]

  switch (operation) {
    case 'average':
      return `CAST(AVG(${fieldToSql(field)}) AS DOUBLE) as ${fieldToSql(`average(${field})`)}`
    case 'sum':
    case 'max':
    case 'min':
      return `CAST(${operation.toUpperCase()}(${fieldToSql(field)}) AS DOUBLE) as ${fieldToSql(`${operation}(${field})`)}`
    case 'count':
      return 'CAST(COUNT(*) AS INTEGER) as "count()"' // we don't need Bigint precision here
  }
}

/**
 * Leave arguments at null if not used
 * @param tableName
 * @param selected
 * @param filter
 * @param sort
 * @param startIndex
 * @param count
 * @param groupBy
 * @param aggregations
 */
export function generateSqlQuery(
  tableName: string,
  selected: FieldName[] = null,
  filter: FieldFilter = null,
  sort: FieldSort[] = null,
  startIndex: number = null,
  count: number = null,
  groupBy: FieldGroupBy[] = null,
  aggregations: FieldAggregation[] = null,
  geometryColumn: string = null
): string {
  let sqlSelect = 'SELECT *'
  const sqlFrom = ` FROM ${tableName}`
  let sqlOrderBy = ''
  let sqlWhere = ''
  let sqlLimit = ''
  let sqlGroupBy = ''
  if (selected !== null) {
    sqlSelect = `SELECT ${selected.map(fieldToSql).join(', ')}`
  }
  if (geometryColumn !== null) {
    sqlSelect += `, ST_AsGeoJSON(${fieldToSql(geometryColumn)}) as ${GEOMETRY_COLUMN_ALIAS}`
  }
  if (filter !== null) {
    sqlWhere = ` WHERE ${filterToSql(filter)}`
  }
  if (sort?.length) {
    sqlOrderBy = ` ORDER BY ${sort
      .map((sort) => `${fieldToSql(sort[1])} ${sort[0].toUpperCase()}`)
      .join(', ')}`
  }
  if (startIndex !== null && count !== null) {
    sqlLimit = ` LIMIT ${count} OFFSET ${startIndex}`
  }
  if (groupBy !== null && aggregations !== null) {
    sqlSelect = `SELECT ${aggregations.map(aggregationToSql).join(', ')}`
    const groupedByDistinct = groupBy.filter((group) => group[0] === 'distinct')
    const sqlGroupByFields = groupedByDistinct
      .map((group) => fieldToSql(group[1]))
      .join(', ')
    const sqlGroupBySelect = groupedByDistinct
      .map(
        (group) =>
          `${fieldToSql(group[1])} as ${fieldToSql(`distinct(${group[1]})`)}`
      )
      .join(', ')
    if (sqlGroupByFields && sqlGroupBySelect) {
      sqlGroupBy = ` GROUP BY ${sqlGroupByFields}`
      sqlSelect += `, ${sqlGroupBySelect}`
    }
  }
  return sqlSelect + sqlFrom + sqlGroupBy + sqlWhere + sqlOrderBy + sqlLimit
}
