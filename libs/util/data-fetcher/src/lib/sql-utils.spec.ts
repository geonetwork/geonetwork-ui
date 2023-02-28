import { generateSqlQuery } from './sql-utils'
import { SAMPLE_DATA } from '../fixtures/sample'

describe('data-fetcher utils', () => {
  let sampleItems

  beforeEach(() => {
    // do a deep copy to allow mutating the data
    sampleItems = SAMPLE_DATA.map((item) => ({
      ...item,
      properties: {
        ...item.properties,
      },
    }))
  })

  describe('generateSqlQuery', () => {
    it('selects all fields and records by default', () => {
      expect(generateSqlQuery()).toEqual('SELECT * FROM ?')
    })
    it('selects specific fields', () => {
      expect(generateSqlQuery(['field1', `champ 2 'quoted'`])).toEqual(
        `SELECT [field1], [champ 2 'quoted'] FROM ?`
      )
    })
    it('adds a limit and offset', () => {
      expect(generateSqlQuery(['field1', 'field2'], null, null, 4, 12)).toEqual(
        `SELECT [field1], [field2] FROM ? LIMIT 12 OFFSET 4`
      )
    })
    it('adds a sortBy clause', () => {
      expect(
        generateSqlQuery(null, null, [
          ['asc', 'field1'],
          ['desc', 'field2'],
        ])
      ).toEqual(`SELECT * FROM ? ORDER BY [field1] ASC, [field2] DESC`)
    })
    it('adds a where clause', () => {
      expect(
        generateSqlQuery(null, [
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
        `SELECT * FROM ? WHERE ([field A] > 1234 OR [field B] = 'string value' OR (NOT ([field C] LIKE '%test%') AND [field D] IN ('option 1', 'option 2', 'option 3')))`
      )
    })
    it('adds a group by clause and aggregations on distinct values', () => {
      expect(
        generateSqlQuery(
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
        `SELECT COUNT(*) as [count()], MAX([field D]) as [max(field D)], MIN([field D]) as [min(field D)], SUM([field D]) as [sum(field D)], AVG([field D]) as [average(field D)], [field C] as [distinct(field C)] FROM ? GROUP BY [field C] WHERE ([field A] < 1234 AND [field B] != 'test')`
      )
    })
    it('adds two group by clauses', () => {
      expect(
        generateSqlQuery(
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
        `SELECT COUNT(*) as [count()], [field C] as [distinct(field C)], [field D] as [distinct(field D)] FROM ? GROUP BY [field C], [field D]`
      )
    })
    it('adds aggregations for all records', () => {
      expect(
        generateSqlQuery(
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
        `SELECT COUNT(*) as [count()], MAX([field D]) as [max(field D)], MIN([field D]) as [min(field D)], SUM([field D]) as [sum(field D)], AVG([field D]) as [average(field D)] FROM ? WHERE ([field A] < 1234 AND [field B] != 'test')`
      )
    })
    it('assembles the different elements in the correct order', () => {
      expect(
        generateSqlQuery(
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
        `SELECT COUNT(*) as [count()], MAX([field D]) as [max(field D)], MIN([field D]) as [min(field D)], SUM([field D]) as [sum(field D)], AVG([field D]) as [average(field D)], [field C] as [distinct(field C)] FROM ? GROUP BY [field C] ORDER BY [field1] ASC, [field2] DESC WHERE ([field A] < 1234 AND [field B] != 'test') LIMIT 14 OFFSET 8`
      )
    })
  })
})
