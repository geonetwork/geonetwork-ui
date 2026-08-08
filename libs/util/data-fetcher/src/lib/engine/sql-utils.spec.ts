import { generateSqlQuery } from './sql-utils'

describe('data-fetcher utils', () => {
  describe('generateSqlQuery', () => {
    it('selects all fields and records by default', () => {
      expect(generateSqlQuery('myDataset')).toEqual('SELECT * FROM myDataset')
    })
    it('selects specific fields', () => {
      expect(
        generateSqlQuery('myDataset', [
          'field1',
          `champ 2 'quoted'`,
          '[hello] "world" *;^',
        ])
      ).toEqual(
        `SELECT "field1", "champ 2 'quoted'", "[hello] ""world"" *;^" FROM myDataset`
      )
    })
    it('adds a limit and offset', () => {
      expect(
        generateSqlQuery('myDataset', ['field1', 'field2'], null, null, 4, 12)
      ).toEqual(`SELECT "field1", "field2" FROM myDataset LIMIT 12 OFFSET 4`)
    })
    it('adds a sortBy clause', () => {
      expect(
        generateSqlQuery('myDataset', null, null, [
          ['asc', 'field1'],
          ['desc', 'field2'],
        ])
      ).toEqual(`SELECT * FROM myDataset ORDER BY "field1" ASC, "field2" DESC`)
    })
    it('adds a where clause', () => {
      expect(
        generateSqlQuery('myDataset', null, [
          'or',
          ['>', 'field A', 1234],
          ['=', 'field B', 'string value'],
          [
            'and',
            ['not', ['like', 'field C', '%test%']],
            ['in', 'field D', 'option 1', 'option 2', 'option 3'],
          ],
        ])
      ).toEqual(
        `SELECT * FROM myDataset WHERE ("field A" > 1234 OR "field B" = 'string value' OR (NOT ("field C" LIKE '%test%') AND "field D" IN ('option 1', 'option 2', 'option 3')))`
      )
    })
    it('adds a group by clause and aggregations on distinct values', () => {
      expect(
        generateSqlQuery(
          'myDataset',
          null,
          ['and', ['<', 'field A', 1234], ['!=', 'field B', 'test']],
          null,
          null,
          null,
          [['distinct', 'field C']],
          [
            ['count'],
            ['max', 'field D'],
            ['min', 'field D'],
            ['sum', 'field D'],
            ['average', 'field D'],
          ]
        )
      ).toEqual(
        `SELECT CAST(COUNT(*) AS INTEGER) as "count()", MAX("field D") as "max(field D)", MIN("field D") as "min(field D)", SUM("field D") as "sum(field D)", AVG("field D") as "average(field D)", "field C" as "distinct(field C)" FROM myDataset GROUP BY "field C" WHERE ("field A" < 1234 AND "field B" != 'test')`
      )
    })
    it('adds two group by clauses', () => {
      expect(
        generateSqlQuery(
          'myDataset',
          null,
          null,
          null,
          null,
          null,
          [
            ['distinct', 'field C'],
            ['distinct', 'field D'],
          ],
          [['count']]
        )
      ).toEqual(
        `SELECT CAST(COUNT(*) AS INTEGER) as "count()", "field C" as "distinct(field C)", "field D" as "distinct(field D)" FROM myDataset GROUP BY "field C", "field D"`
      )
    })
    it('adds aggregations for all records', () => {
      expect(
        generateSqlQuery(
          'myDataset',
          null,
          ['and', ['<', 'field A', 1234], ['!=', 'field B', 'test']],
          null,
          null,
          null,
          [['all']],
          [
            ['count'],
            ['max', 'field D'],
            ['min', 'field D'],
            ['sum', 'field D'],
            ['average', 'field D'],
          ]
        )
      ).toEqual(
        `SELECT CAST(COUNT(*) AS INTEGER) as "count()", MAX("field D") as "max(field D)", MIN("field D") as "min(field D)", SUM("field D") as "sum(field D)", AVG("field D") as "average(field D)" FROM myDataset WHERE ("field A" < 1234 AND "field B" != 'test')`
      )
    })
    it('assembles the different elements in the correct order', () => {
      expect(
        generateSqlQuery(
          'myDataset',
          ['field1', 'field2'],
          ['and', ['<', 'field A', 1234], ['!=', 'field B', 'test']],

          [
            ['asc', 'field1'],
            ['desc', 'field2'],
          ],
          8,
          14,
          [['distinct', 'field C']],
          [
            ['count'],
            ['max', 'field D'],
            ['min', 'field D'],
            ['sum', 'field D'],
            ['average', 'field D'],
          ]
        )
      ).toEqual(
        `SELECT CAST(COUNT(*) AS INTEGER) as "count()", MAX("field D") as "max(field D)", MIN("field D") as "min(field D)", SUM("field D") as "sum(field D)", AVG("field D") as "average(field D)", "field C" as "distinct(field C)" FROM myDataset GROUP BY "field C" ORDER BY "field1" ASC, "field2" DESC WHERE ("field A" < 1234 AND "field B" != 'test') LIMIT 14 OFFSET 8`
      )
    })
  })
})
