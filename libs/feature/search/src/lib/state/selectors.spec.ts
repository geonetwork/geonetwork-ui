import { ES_FIXTURE_AGGS_REQUEST } from '../elasticsearch/fixtures/aggregations-request'
import { ES_FIXTURE_AGGS_RESPONSE } from '../elasticsearch/fixtures/aggregations-response'
import { DEFAULT_SEARCH_KEY } from './actions'
import { initialState } from './reducer'
import * as fromSelectors from './selectors'

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
})
