import { ROUTE_PARAMS } from '../constants'
import { expandQueryParams, flattenQueryParams } from './query-params.utils'

describe('query params utilities', () => {
  describe('flattenQueryParams', () => {
    it('produces serialized query params from various route parameters', () => {
      const params = flattenQueryParams({
        [ROUTE_PARAMS.SORT]: 'createDate',
        publisher: ['john', 'barbie'],
        updateDate: {
          start: new Date('2010-03-10T14:50:12'),
          end: new Date('2014-01-01'),
        },
        changeDate: {
          end: new Date('2008-08-14T14:50:12'),
        },
        emptyParam: [],
      })
      expect(params).toEqual({
        _sort: 'createDate',
        publisher: ['john,barbie'],
        updateDate: ['2010-03-10..2014-01-01'],
        changeDate: ['..2008-08-14'],
        emptyParam: [],
      })
    })
  })
  describe('expandQueryParams', () => {
    it('restores full route parameters from serialized query params in arrays', () => {
      const params = expandQueryParams({
        _sort: 'createDate',
        publisher: ['john,barbie'],
        updateDate: ['2010-03-10..2014-01-01'],
        changeDate: ['..2008-08-14'],
      })
      expect(params).toEqual({
        [ROUTE_PARAMS.SORT]: 'createDate',
        publisher: ['john', 'barbie'],
        updateDate: {
          start: new Date('2010-03-10T00:00:00'),
          end: new Date('2014-01-01T00:00:00'),
        },
        changeDate: {
          end: new Date('2008-08-14T00:00:00'),
        },
      })
    })
    it('restores full route parameter from a SINGLE serialized string query param', () => {
      const params = expandQueryParams({
        changeDate: '..2008-08-14',
      })
      expect(params).toEqual({
        changeDate: {
          end: new Date('2008-08-14T00:00:00'),
        },
      })
    })
  })
})
