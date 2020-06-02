import { initialState } from './reducer'
import * as fromSelectors from './selectors'

describe('Map Selectors', () => {
  describe('getSearchParams', () => {
    it('should return search params', () => {
      let result = fromSelectors.getSearchParams.projector({
        ...initialState,
        params: {
          any: 'abcd',
        },
      })
      expect(result).toEqual({
        any: 'abcd',
      })
    })
  })

  describe('getSearchSortBy', () => {
    it('should return sort by criteria', () => {
      let result = fromSelectors.getSearchSortBy.projector({
        ...initialState,
        sortBy: 'title',
      })
      expect(result).toEqual('title')
    })
  })
})
