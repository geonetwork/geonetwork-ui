import { DEFAULT_SEARCH_KEY } from './actions'
import { initialState } from './reducer'
import * as fromSelectors from './selectors'
import {
  ES_FIXTURE_AGGS_REQUEST,
  ES_FIXTURE_AGGS_RESPONSE,
} from '@geonetwork-ui/util-shared/fixtures'
import { currentPage, getSpatialFilterEnabled, totalPages } from './selectors'

const initialStateSearch = initialState[DEFAULT_SEARCH_KEY]

describe('Search Selectors', () => {
  describe('getSearchFilters', () => {
    it('should return search filters', () => {
      const result = fromSelectors.getSearchFilters.projector({
        ...initialStateSearch,
        params: {
          ...initialStateSearch.params,
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
        ...initialStateSearch,
        params: {
          ...initialStateSearch.params,
          sortBy: 'title',
        },
      })
      expect(result).toEqual('title')
    })
  })

  describe('getSearchConfigAggregations', () => {
    it('should return aggregations configuration', () => {
      const result = fromSelectors.getSearchConfigAggregations.projector({
        ...initialStateSearch,
        config: {
          ...initialStateSearch.config,
          aggregations: ES_FIXTURE_AGGS_REQUEST,
        },
      })
      expect(result).toEqual(ES_FIXTURE_AGGS_REQUEST)
    })
  })

  describe('getSearchResults', () => {
    it('should return search results', () => {
      const records = [{ title: 'record1' } as any]
      const result = fromSelectors.getSearchResults.projector({
        ...initialStateSearch,
        results: {
          ...initialStateSearch.results,
          records,
        },
      })
      expect(result).toEqual(records)
    })
  })

  describe('getSearchResultsLoading', () => {
    it('should return whether more results are loading', () => {
      const result = fromSelectors.getSearchResultsLoading.projector({
        ...initialStateSearch,
        loadingMore: true,
      })
      expect(result).toEqual(true)
    })
  })

  describe('isEndOfResults', () => {
    it('should return true once at the end of results list', () => {
      const result = fromSelectors.isEndOfResults.projector({
        ...initialStateSearch,
        params: {
          ...initialStateSearch.params,
          from: 0,
          size: 20,
        },
        results: {
          ...initialStateSearch.results,
          hits: {
            value: 62,
          },
        },
      })
      expect(result).toEqual(false)

      const endResult = fromSelectors.isEndOfResults.projector({
        ...initialStateSearch,
        params: {
          ...initialStateSearch.params,
          from: 60,
          size: 20,
        },
        results: {
          ...initialStateSearch.results,
          hits: {
            value: 62,
          },
        },
      })
      expect(endResult).toEqual(true)

      const exactEndOfResult = fromSelectors.isEndOfResults.projector({
        ...initialStateSearch,
        params: {
          ...initialStateSearch.params,
          from: 40,
          size: 20,
        },
        results: {
          ...initialStateSearch.results,
          hits: {
            value: 60,
          },
        },
      })
      expect(exactEndOfResult).toEqual(true)
    })
  })

  describe('totalPages', () => {
    it('returns correct page amount', () => {
      const result = fromSelectors.totalPages.projector({
        ...initialStateSearch,
        params: {
          ...initialStateSearch.params,
          from: 0,
          size: 20,
        },
        results: {
          ...initialStateSearch.results,
          hits: {
            value: 62,
          },
        },
      })
      expect(result).toEqual(4)
    })
  })

  describe('currentPage', () => {
    it('returns the correct current page', () => {
      const result = fromSelectors.currentPage.projector({
        ...initialStateSearch,
        params: {
          ...initialStateSearch.params,
          from: 0,
          size: 20,
        },
      })
      expect(result).toEqual(1)

      const secondPage = fromSelectors.currentPage.projector({
        ...initialStateSearch,
        params: {
          ...initialStateSearch.params,
          from: 20,
          size: 20,
        },
      })
      expect(secondPage).toEqual(2)
    })
  })

  describe('getSearchResultsAggregations', () => {
    it('should return search aggregations results', () => {
      const aggregations = ES_FIXTURE_AGGS_RESPONSE
      const result = fromSelectors.getSearchResultsAggregations.projector({
        ...initialStateSearch,
        results: {
          ...initialStateSearch.results,
          aggregations,
        },
      })
      expect(result).toEqual(aggregations)
    })
  })

  describe('getFavoritesOnly', () => {
    it('should return favoritesOnly value', () => {
      const result = fromSelectors.getFavoritesOnly.projector({
        ...initialStateSearch,
        params: {
          ...initialStateSearch.params,
          favoritesOnly: true,
        },
      })
      expect(result).toEqual(true)
    })
  })

  describe('getError', () => {
    it('should return the error', () => {
      const result = fromSelectors.getError.projector({
        ...initialStateSearch,
        error: {
          code: 501,
          message: 'Unauthorized',
        },
      })
      expect(result).toEqual({
        code: 501,
        message: 'Unauthorized',
      })
    })
  })

  describe('getSpatialFilterEnabled', () => {
    it('should return the useSpatialFilter value', () => {
      const result = fromSelectors.getSpatialFilterEnabled.projector({
        ...initialStateSearch,
        params: {
          ...initialStateSearch.params,
          useSpatialFilter: false,
        },
      })
      expect(result).toEqual(false)
    })
  })
})
