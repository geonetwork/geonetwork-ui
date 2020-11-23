import { initialState } from './reducer'
import * as fromSelectors from './selectors'

describe('Search Selectors', () => {
  describe('getSearchFilters', () => {
    it('should return search filters', () => {
      const result = fromSelectors.getSearchFilters.projector({
        ...initialState,
        params: {
          ...initialState.params,
          filters: {
            any: 'abcd',
          },
        },
      })
      expect(result).toEqual({
        any: 'abcd',
      })
    })
  })

  describe('getSearchSortBy', () => {
    it('should return sort by criteria', () => {
      const result = fromSelectors.getSearchSortBy.projector({
        ...initialState,
        params: {
          ...initialState.params,
          sortBy: 'title',
        },
      })
      expect(result).toEqual('title')
    })
  })

  describe('getSearchResults', () => {
    it('should return search results', () => {
      const records = [{ title: 'record1' } as any]
      const result = fromSelectors.getSearchResults.projector({
        ...initialState,
        results: {
          ...initialState.results,
          records: records,
        },
      })
      expect(result).toEqual(records)
    })
  })

  describe('getSearchResultsLoading', () => {
    it('should return whether more results are loading', () => {
      const result = fromSelectors.getSearchResultsLoading.projector({
        ...initialState,
        loadingMore: true,
      })
      expect(result).toEqual(true)
    })
  })
})
