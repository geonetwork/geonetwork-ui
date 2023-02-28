import {
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
