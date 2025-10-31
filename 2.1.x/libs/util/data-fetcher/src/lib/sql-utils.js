"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSqlQuery = void 0;
function filterToSql(filter) {
    const operator = filter[0];
    const args = filter.slice(1);
    function valueToSql(value) {
        return typeof value === 'number' ? value : `'${value}'`;
    }
    switch (operator) {
        case '<':
        case '<=':
        case '>':
        case '>=':
        case '=':
        case '!=':
        case 'like':
            return `[${args[0]}] ${operator.toUpperCase()} ${valueToSql(args[1])}`;
        case 'in': {
            const values = args.slice(1);
            return `[${args[0]}] IN (${values.map(valueToSql).join(', ')})`;
        }
        case 'and':
        case 'or': {
            const children = args
                .map(filterToSql)
                .join(` ${operator.toUpperCase()} `);
            return `(${children})`;
        }
        case 'not':
            return `NOT (${filterToSql(args[0])})`;
    }
    throw new Error(`Could not generate SQL query, operator not recognized: ${operator}`);
}
function aggregationToSql(aggregation) {
    const operation = aggregation[0];
    const field = aggregation[1];
    switch (operation) {
        case 'average':
            return `AVG([${field}]) as [average(${field})]`;
        case 'sum':
        case 'max':
        case 'min':
            return `${operation.toUpperCase()}([${field}]) as [${operation}(${field})]`;
        case 'count':
            return 'COUNT(*) as [count()]';
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
function generateSqlQuery(selected = null, filter = null, sort = null, startIndex = null, count = null, groupBy = null, aggregations = null) {
    let sqlSelect = 'SELECT *';
    const sqlFrom = ' FROM ?';
    let sqlOrderBy = '';
    let sqlWhere = '';
    let sqlLimit = '';
    let sqlGroupBy = '';
    if (selected !== null) {
        sqlSelect = `SELECT ${selected.map((name) => `[${name}]`).join(', ')}`;
    }
    if (filter !== null) {
        sqlWhere = ` WHERE ${filterToSql(filter)}`;
    }
    if (sort?.length) {
        sqlOrderBy = ` ORDER BY ${sort
            .map((sort) => `[${sort[1]}] ${sort[0].toUpperCase()}`)
            .join(', ')}`;
    }
    if (startIndex !== null && count !== null) {
        sqlLimit = ` LIMIT ${count} OFFSET ${startIndex}`;
    }
    if (groupBy !== null && aggregations !== null) {
        sqlSelect = `SELECT ${aggregations.map(aggregationToSql).join(', ')}`;
        const groupedByDistinct = groupBy.filter((group) => group[0] === 'distinct');
        const sqlGroupByFields = groupedByDistinct
            .map((group) => `[${group[1]}]`)
            .join(', ');
        const sqlGroupBySelect = groupedByDistinct
            .map((group) => `[${group[1]}] as [distinct(${group[1]})]`)
            .join(', ');
        if (sqlGroupByFields && sqlGroupBySelect) {
            sqlGroupBy = ` GROUP BY ${sqlGroupByFields}`;
            sqlSelect += `, ${sqlGroupBySelect}`;
        }
    }
    return sqlSelect + sqlFrom + sqlGroupBy + sqlOrderBy + sqlWhere + sqlLimit;
}
exports.generateSqlQuery = generateSqlQuery;
//# sourceMappingURL=sql-utils.js.map