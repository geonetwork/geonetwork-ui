import { initialState } from './reducer'
import * as fromSelectors from './selectors'

describe('Search Selectors', () => {
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

  describe('getSearchResults', () => {
    it('should return search results', () => {
      const records = [{ title: 'record1' } as any]
      let result = fromSelectors.getSearchResults.projector({
        ...initialState,
        results: records,
      })
      expect(result).toEqual(records)
    })
  })

  describe('getSearchResultsLoading', () => {
    it('should return whether more results are loading', () => {
      let result = fromSelectors.getSearchResultsLoading.projector({
        ...initialState,
        loadingMore: true,
      })
      expect(result).toEqual(true)
    })
  })
})
