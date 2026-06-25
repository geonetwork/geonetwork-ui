import {
  FieldAggregation,
  FieldFilter,
  FieldGroupBy,
  FieldName,
  FieldSort,
} from './model'

function col(name: string): string {
  return `"${name}"`
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
      return `${col(args[0] as string)} ${operator.toUpperCase()} ${valueToSql(
        args[1] as string | number
      )}`
    case 'in': {
      const values = args.slice(1) as string[] | number[]
      return `${col(args[0] as string)} IN (${values.map(valueToSql).join(', ')})`
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
      return `AVG(${col(field)}) as ${col(`average(${field})`)}`
    case 'sum':
      // SUM of integer columns returns HUGEINT in DuckDB which mis-serializes via Arrow; cast to DOUBLE
      return `SUM(${col(field)})::DOUBLE as ${col(`sum(${field})`)}`
    case 'max':
    case 'min':
      return `${operation.toUpperCase()}(${col(field)}) as ${col(`${operation}(${field})`)}`
    case 'count':
      return `COUNT(*) as ${col('count()')}`
  }
}

/**
 * Leave arguments at null if not used
 * @param selected
 * @param filter
 * @param sort
 * @param startIndex
 * @param count
 * @param groupBy
 * @param aggregations
 */
export function generateSqlQuery(
  selected: FieldName[] = null,
  filter: FieldFilter = null,
  sort: FieldSort[] = null,
  startIndex: number = null,
  count: number = null,
  groupBy: FieldGroupBy[] = null,
  aggregations: FieldAggregation[] = null
): string {
  let sqlSelect = 'SELECT *'
  const sqlFrom = ' FROM data'
  let sqlOrderBy = ''
  let sqlWhere = ''
  let sqlLimit = ''
  let sqlGroupBy = ''
  if (selected !== null) {
    sqlSelect = `SELECT ${selected.map(col).join(', ')}`
  }
  if (filter !== null) {
    sqlWhere = ` WHERE ${filterToSql(filter)}`
  }
  if (sort?.length) {
    sqlOrderBy = ` ORDER BY ${sort
      .map((sort) => `${col(sort[1])} ${sort[0].toUpperCase()}`)
      .join(', ')}`
  }
  if (startIndex !== null && count !== null) {
    sqlLimit = ` LIMIT ${count} OFFSET ${startIndex}`
  }
  if (groupBy !== null && aggregations !== null) {
    sqlSelect = `SELECT ${aggregations.map(aggregationToSql).join(', ')}`
    const groupedByDistinct = groupBy.filter((group) => group[0] === 'distinct')
    const sqlGroupByFields = groupedByDistinct
      .map((group) => col(group[1]))
      .join(', ')
    const sqlGroupBySelect = groupedByDistinct
      .map((group) => `${col(group[1])} as ${col(`distinct(${group[1]})`)}`)
      .join(', ')
    if (sqlGroupByFields && sqlGroupBySelect) {
      sqlGroupBy = ` GROUP BY ${sqlGroupByFields}`
      sqlSelect += `, ${sqlGroupBySelect}`
    }
  }
  return sqlSelect + sqlFrom + sqlWhere + sqlGroupBy + sqlOrderBy + sqlLimit
}
