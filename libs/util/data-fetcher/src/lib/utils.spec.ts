import {
  generateSqlQuery,
  getJsonDataItemsProxy,
  jsonToGeojsonFeature,
  processItemProperties,
} from './utils'
import { DataItem } from './model'
import { SAMPLE_DATA } from '../fixtures/sample'

describe('data-fetcher utils', () => {
  describe('jsonToGeojsonFeature', () => {
    describe('empty string column name', () => {
      it('is renamed to unknown', () => {
        expect(
          jsonToGeojsonFeature({
            '': '',
            code_region: '76',
            nom_region: 'OCCITANIE',
            geo_point_2d: [42.9178728416, 1.17961253606],
            nom_dep: 'ARIEGE',
          })
        ).toEqual({
          geometry: null,
          properties: {
            unknown: undefined,
            code_region: '76',
            nom_region: 'OCCITANIE',
            geo_point_2d: [42.9178728416, 1.17961253606],
            nom_dep: 'ARIEGE',
          },
          type: 'Feature',
        })
      })
    })
  })
  describe('processItemProperties', () => {
    describe('with type inference', () => {
      let items: DataItem[]
      beforeEach(() => {
        items = [
          {
            type: 'Feature',
            geometry: null,
            properties: {
              prop1: 'abc',
              prop2: 'def',
              prop3: '12/01/2012',
              prop5: '0.8',
              prop6: '',
              prop7: '8.4',
              prop8: '2015-04-05',
              prop9: '2010-01-01',
            },
          },
          {
            type: 'Feature',
            geometry: null,
            properties: {
              prop1: 'gg',
              prop3: '01/10/1985',
              prop4: '0004',
              prop5: '001',
              prop6: '',
              prop7: '10.000',
              prop8: '2015-04-05T00:00',
              prop9: 'xxxx',
            },
          },
          {
            type: 'Feature',
            geometry: null,
            properties: {
              prop1: 'aaa',
              prop2: 'bbb',
              prop3: '',
              prop4: '100',
              prop5: '10,999',
              prop7: '',
              prop8: '2015-04-05',
            },
          },
        ]
      })
      it('detects date and number fields', () => {
        expect(processItemProperties(items, true)).toEqual({
          items: [
            {
              type: 'Feature',
              geometry: null,
              properties: {
                prop1: 'abc',
                prop2: 'def',
                prop3: new Date('2012-01-12T00:00'),
                prop5: '0.8',
                prop6: '',
                prop7: 8.4,
                prop8: new Date('2015-04-05T00:00'),
                prop9: '2010-01-01',
              },
            },
            {
              type: 'Feature',
              geometry: null,
              properties: {
                prop1: 'gg',
                prop3: new Date('1985-10-01T00:00'),
                prop4: 4,
                prop5: '001',
                prop6: '',
                prop7: 10.0,
                prop8: new Date('2015-04-05T00:00'),
                prop9: 'xxxx',
              },
            },
            {
              type: 'Feature',
              geometry: null,
              properties: {
                prop1: 'aaa',
                prop2: 'bbb',
                prop3: null,
                prop4: 100,
                prop5: '10,999',
                prop7: null,
                prop8: new Date('2015-04-05T00:00'),
              },
            },
          ],
          properties: [
            {
              label: 'prop1',
              name: 'prop1',
              type: 'string',
            },
            {
              label: 'prop2',
              name: 'prop2',
              type: 'string',
            },
            {
              label: 'prop3',
              name: 'prop3',
              type: 'date',
            },
            {
              label: 'prop5',
              name: 'prop5',
              type: 'string',
            },
            {
              label: 'prop6',
              name: 'prop6',
              type: 'string',
            },
            {
              label: 'prop7',
              name: 'prop7',
              type: 'number',
            },
            {
              label: 'prop8',
              name: 'prop8',
              type: 'date',
            },
            {
              label: 'prop9',
              name: 'prop9',
              type: 'string',
            },
            {
              label: 'prop4',
              name: 'prop4',
              type: 'number',
            },
          ],
        })
      })
    })
    describe('without type inference', () => {
      let items: DataItem[]
      beforeEach(() => {
        items = [
          {
            type: 'Feature',
            geometry: null,
            properties: {
              prop1: 'abc',
              prop2: 'def',
              prop3: '12/01/2012',
              prop5: '0.8',
              prop6: '',
              prop7: 8.4,
              prop8: '2015-04-05',
              prop9: '2010-01-01',
            },
          },
          {
            type: 'Feature',
            geometry: null,
            properties: {
              prop1: 'gg',
              prop3: '01/10/1985',
              prop4: 4,
              prop5: '001',
              prop6: '',
              prop7: 10,
              prop8: '2015-04-05T00:00',
              prop9: 'xxxx',
            },
          },
          {
            type: 'Feature',
            geometry: null,
            properties: {
              prop1: 'aaa',
              prop2: 'bbb',
              prop3: '',
              prop4: 100,
              prop5: '10,999',
              prop7: null,
              prop8: '2015-04-05',
            },
          },
        ]
      })
      it('lists fields with types', () => {
        expect(processItemProperties(items)).toEqual({
          items,
          properties: [
            {
              label: 'prop1',
              name: 'prop1',
              type: 'string',
            },
            {
              label: 'prop2',
              name: 'prop2',
              type: 'string',
            },
            {
              label: 'prop3',
              name: 'prop3',
              type: 'string',
            },
            {
              label: 'prop5',
              name: 'prop5',
              type: 'string',
            },
            {
              label: 'prop6',
              name: 'prop6',
              type: 'string',
            },
            {
              label: 'prop7',
              name: 'prop7',
              type: 'number',
            },
            {
              label: 'prop8',
              name: 'prop8',
              type: 'string',
            },
            {
              label: 'prop9',
              name: 'prop9',
              type: 'string',
            },
            {
              label: 'prop4',
              name: 'prop4',
              type: 'number',
            },
          ],
        })
      })
    })
  })

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
          ['distinct', 'field C'],
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
    it('adds aggregations for all records', () => {
      expect(
        generateSqlQuery(
          null,
          ['and', ['<', 'field A', 1234], ['!=', 'field B', 'test']],
          null,
          null,
          null,
          ['all'],
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
          ['distinct', 'field C'],
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

  describe('getJsonDataItemsProxy', () => {
    let proxy
    beforeEach(() => {
      proxy = getJsonDataItemsProxy(sampleItems)
    })
    it('allows reading properties', () => {
      expect(proxy[0].myNumber).toBe(100)
      expect(proxy[2].myString).toBe('relevé')
    })
    it('allows writing properties', () => {
      proxy[2].myString = 'changed'
      expect(proxy[2].myString).toBe('changed')
      expect(sampleItems[2]).toEqual({
        type: 'Feature',
        geometry: null,
        properties: {
          myNumber: 200,
          myOtherNumber: 1003,
          myFloat: 9.1,
          myString: 'changed',
          myDate: new Date('2018-02-05T00:00'),
          myNull: null,
          myUndefined: undefined,
        },
      })
    })
    it('prevents modifying the underlying array', () => {
      expect(() => {
        proxy[2] = { abc: '1234' }
      }).toThrowError('read-only')
    })
  })
})
