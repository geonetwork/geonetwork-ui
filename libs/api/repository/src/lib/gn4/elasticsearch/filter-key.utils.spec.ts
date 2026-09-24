import { getEsFieldName, toCustomFilterKey } from './filter-key.utils'

describe('filter key utils', () => {
  describe('toCustomFilterKey', () => {
    it('joins the ES field name and the filter name', () => {
      expect(toCustomFilterKey('tag.default', 'myOrg:myFilter')).toEqual(
        'tag.default#myOrg:myFilter'
      )
    })
  })
  describe('getEsFieldName', () => {
    it('returns the ES field name of a custom filter key', () => {
      expect(getEsFieldName('tag.default#myOrg:myFilter')).toEqual(
        'tag.default'
      )
    })
    it('returns a plain filter key as is', () => {
      expect(getEsFieldName('tag.default')).toEqual('tag.default')
    })
  })
})
