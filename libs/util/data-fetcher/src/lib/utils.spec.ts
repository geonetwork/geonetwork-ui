import { getJsonDataItemsProxy } from './utils'
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
