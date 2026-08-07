import { arrowTableToDataItems } from './results'
import {
  DataType,
  Table,
  Timestamp,
  TimeUnit,
  vectorFromArray,
} from 'apache-arrow'

describe('utilities for query results', () => {
  describe('arrowTableToItems', () => {
    it('maps to a data item', () => {
      const table = new Table({
        '': vectorFromArray(['']),
        code_region: vectorFromArray(['76']),
        nom_region: vectorFromArray(['OCCITANIE']),
        geo_point_2d: vectorFromArray([[42.9178728416, 1.17961253606]]),
        nom_dep: vectorFromArray(['ARIEGE']),
        passage_date: vectorFromArray(
          [1208217600000],
          new Timestamp(TimeUnit.MICROSECOND)
        ),
        passage_date2: vectorFromArray(
          [new Date('2008-04-14T22:00:00.000Z')],
          new Timestamp(TimeUnit.MICROSECOND)
        ),
        featureId: vectorFromArray(['abcde']),
        recordId: vectorFromArray(['bla']),
      }) as unknown as Table<{ [key: string]: DataType }>

      expect(arrowTableToDataItems(table)).toEqual([
        {
          geometry: null,
          properties: {
            unknown: '',
            code_region: '76',
            nom_region: 'OCCITANIE',
            geo_point_2d: [42.9178728416, 1.17961253606],
            nom_dep: 'ARIEGE',
            passage_date: new Date(1208217600000),
            passage_date2: new Date('2008-04-14T22:00:00.000Z'),
            featureId: 'abcde',
            recordId: 'bla',
          },
          type: 'Feature',
          id: 'abcde',
        },
      ])
    })
  })
})
