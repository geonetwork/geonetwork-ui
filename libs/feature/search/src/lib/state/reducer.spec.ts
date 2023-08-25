import {
  ES_FIXTURE_AGGS_REQUEST,
  ES_FIXTURE_AGGS_RESPONSE,
  ES_FIXTURE_AGGS_RESPONSE_MORE,
} from '@geonetwork-ui/util-shared/fixtures'
import * as fromActions from './actions'
import { DEFAULT_SEARCH_KEY } from './actions'
import {
  initialState,
  reducer,
  reducerSearch,
  SearchStateParams,
} from './reducer'
import { RESULTS_PAGE_SIZE } from '@geonetwork-ui/util-shared'

const initialStateSearch = initialState[DEFAULT_SEARCH_KEY]

describe('Search Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any
      const state = reducer(undefined, action)

      expect(state).toBe(initialState)
    })
  })

  describe('ADD_SEARCH', () => {
    let action
    describe('when search already in the state', () => {
      beforeEach(() => {
        action = new fromActions.AddSearch('default')
      })
      it('does nothing', () => {
        const state = reducer(initialState, action)
        expect(state).toEqual(initialState)
      })
    })
    describe('when search is not in the state', () => {
      beforeEach(() => {
        action = new fromActions.AddSearch('main')
      })
      it('create the search in the state for the given id', () => {
        const state = reducer(initialState, action)
        expect(state).toEqual({ ...initialState, main: initialState.default })
      })
    })
  })

  describe('SetConfigFilters action', () => {
    it('set config filters', () => {
      const action = new fromActions.SetConfigFilters({
        custom: { any: 'blah', other: 'Some value' },
        elastic: {},
      })
      const state = reducerSearch(initialStateSearch, action)
      expect(state.config.filters).toEqual({
        custom: { any: 'blah', other: 'Some value' },
        elastic: {},
      })
    })
  })

  describe('SetFilters action', () => {
    it('should add new filters', () => {
      const action = new fromActions.SetFilters({
        any: 'blah',
        other: 'Some value',
      })
      const state = reducerSearch(initialStateSearch, action)
      expect(state.params.filters).toEqual({ any: 'blah', other: 'Some value' })
    })
    it('should update defined filters and remove undefined filters', () => {
      const action = new fromActions.SetFilters({
        any: 'abc',
      })
      const state = reducerSearch(
        {
          ...initialStateSearch,
          params: {
            ...initialStateSearch.params,
            filters: {
              any: 'def',
              other: 'Some value',
            },
          },
        },
        action
      )
      expect(state.params.filters).toEqual({ any: 'abc' })
    })
  })

  describe('UpdateFilters action', () => {
    it('should add new filters', () => {
      const action = new fromActions.UpdateFilters({
        any: 'blah',
        other: 'Some value',
      })
      const state = reducerSearch(initialStateSearch, action)
      expect(state.params.filters).toEqual({ any: 'blah', other: 'Some value' })
    })
    it('should update defined filters and keep undefined filters', () => {
      const action = new fromActions.UpdateFilters({
        any: 'abc',
      })
      const state = reducerSearch(
        {
          ...initialStateSearch,
          params: {
            ...initialStateSearch.params,
            filters: {
              any: 'def',
              other: 'Some value',
            },
          },
        },
        action
      )
      expect(state.params.filters).toEqual({ any: 'abc', other: 'Some value' })
    })
  })

  describe('SetSearch action', () => {
    it('should set search params', () => {
      const searchParams: SearchStateParams = {
        size: 12,
        sortBy: 'asc',
        filters: {
          any: 'tag:river',
        },
        useSpatialFilter: false,
      }
      const action = new fromActions.SetSearch(searchParams)
      const state = reducerSearch(initialStateSearch, action)
      expect(state.params).toEqual(searchParams)
    })
  })

  describe('SetSortBy action', () => {
    it('should set sort by params', () => {
      const action = new fromActions.SetSortBy('fieldA')
      const state = reducerSearch(initialStateSearch, action)
      expect(state.params.sortBy).toEqual('fieldA')
    })
  })

  describe('SetFavoritesOnly action', () => {
    it('should set favoritsOnly param to true', () => {
      const action = new fromActions.SetFavoritesOnly(true)
      const state = reducerSearch(initialStateSearch, action)
      expect(state.params.favoritesOnly).toEqual(true)
    })
  })

  describe('SetPagination action', () => {
    it('should set from and size', () => {
      const action = new fromActions.SetPagination(12, 15)
      const state = reducerSearch(initialStateSearch, action)
      expect(state.params.from).toEqual(12)
      expect(state.params.size).toEqual(15)
    })
  })

  describe('Paginate action', () => {
    it('should set from property and keep size', () => {
      const action = new fromActions.Paginate(30)
      const state = reducerSearch(initialStateSearch, action)
      expect(state.params.from).toEqual(30)
      expect(state.params.size).toEqual(RESULTS_PAGE_SIZE)
    })
  })
  describe('Scroll action', () => {
    it('increment `from` property with `size` value', () => {
      const action = new fromActions.Scroll()
      const state = reducerSearch(initialStateSearch, action)
      expect(state.params.from).toEqual(RESULTS_PAGE_SIZE)
      expect(state.params.size).toEqual(RESULTS_PAGE_SIZE)
    })
  })

  describe('Set result layout action', () => {
    it('should set result layout', () => {
      const action = new fromActions.SetResultsLayout('CARD')
      const state = reducerSearch(initialStateSearch, action)
      expect(state.resultsLayout).toEqual('CARD')
    })
  })

  describe('AddResults action', () => {
    it('should add results to the list', () => {
      const payload = [{ title: 'record1' } as any, { title: 'record2' } as any]
      const action = new fromActions.AddResults(payload)
      const state = reducerSearch(
        {
          ...initialStateSearch,
          results: {
            ...initialStateSearch.results,
            records: [{ title: 'abcd' } as any],
          },
        },
        action
      )
      expect(state.results.records).toEqual([
        { title: 'abcd' } as any,
        ...payload,
      ])
    })
    it('should remove the loadingMore flag', () => {
      const payload = [{ title: 'record1' } as any]
      const action = new fromActions.AddResults(payload)
      const state = reducerSearch(
        {
          ...initialStateSearch,
          loadingMore: true,
        },
        action
      )
      expect(state.loadingMore).toEqual(false)
    })
  })

  describe('ClearResults action', () => {
    it('should clear the results list', () => {
      const action = new fromActions.ClearResults()
      const state = reducerSearch(
        {
          ...initialStateSearch,
          results: {
            ...initialStateSearch.results,
            hits: {
              value: 200,
            },
            records: [{ title: 'abcd' } as any],
          },
        },
        action
      )
      expect(state.results).toEqual({
        aggregations: {},
        hits: { value: 200 },
        records: [],
      })
    })
  })

  describe('RequestMoreResults action', () => {
    it('should set the loadingMore flag', () => {
      const action = new fromActions.RequestMoreResults()
      const state = reducerSearch(initialStateSearch, action)
      expect(state.loadingMore).toEqual(true)
    })
  })

  describe('SetResultsAggregations action', () => {
    it('should replace the aggregations in the result', () => {
      const payload = ES_FIXTURE_AGGS_RESPONSE
      const action = new fromActions.SetResultsAggregations(payload)
      const state = reducerSearch(
        {
          ...initialStateSearch,
          results: {
            ...initialStateSearch.results,
            aggregations: { someKey: 'someValue' },
          },
        },
        action
      )
      expect(state.results.aggregations).toEqual(ES_FIXTURE_AGGS_RESPONSE)
    })
  })

  describe('SetConfigAggregations action', () => {
    it('should replace the aggregations in the config', () => {
      const payload = ES_FIXTURE_AGGS_REQUEST
      const action = new fromActions.SetConfigAggregations(payload)
      const state = reducerSearch(
        {
          ...initialStateSearch,
          config: {
            ...initialStateSearch.config,
            aggregations: { someKey: 'someValue' },
          },
        },
        action
      )
      expect(state.config.aggregations).toEqual(ES_FIXTURE_AGGS_REQUEST)
    })
  })

  describe('UpdateConfigAggregations action', () => {
    it('should augment the aggregations in the config', () => {
      const payload = { newAgg: { terms: { field: 'abcd' } } }
      const action = new fromActions.UpdateConfigAggregations(payload)
      const state = reducerSearch(
        {
          ...initialStateSearch,
          config: {
            ...initialStateSearch.config,
            aggregations: { someKey: 'someValue' },
          },
        },
        action
      )
      expect(state.config.aggregations).toEqual({
        someKey: 'someValue',
        ...payload,
      })
    })
  })

  describe('SetConfigRequestFields action', () => {
    it('should replace the _source in the config', () => {
      const payload = { includes: ['title', 'abstract'] }
      const action = new fromActions.SetConfigRequestFields(payload)
      const state = reducerSearch(
        {
          ...initialStateSearch,
        },
        action
      )
      expect(state.config.source).toEqual({ includes: ['title', 'abstract'] })
    })
  })

  describe('UpdateRequestAggregationTerm action', () => {
    describe('RequestMoreOnAggregation action', () => {
      it('should replace the aggregations in the config with an updated size', () => {
        const action = new fromActions.UpdateRequestAggregationTerm(
          'tag.default',
          { increment: 20 }
        )
        const state = reducerSearch(
          {
            ...initialStateSearch,
            config: {
              ...initialStateSearch.config,
              aggregations: ES_FIXTURE_AGGS_REQUEST,
            },
          },
          action
        )
        const clone = JSON.parse(JSON.stringify(ES_FIXTURE_AGGS_REQUEST))
        clone['tag.default'].terms.size = 30
        expect(state.config.aggregations).toEqual(clone)
      })
      it('when intial size is Nan', () => {
        const action = new fromActions.UpdateRequestAggregationTerm(
          'tag.default',
          { increment: 20 }
        )
        const state = reducerSearch(
          {
            ...initialStateSearch,
            config: {
              ...initialStateSearch.config,
              aggregations: {
                'tag.default': {
                  terms: { field: 'tag.default' },
                },
              },
            },
          },
          action
        )
        expect(state.config.aggregations['tag.default'].terms.size).toEqual(20)
      })
    })

    describe('SetIncludeOnAggregation action', () => {
      it('should replace the aggregations in the config with an updated include', () => {
        const action = new fromActions.UpdateRequestAggregationTerm(
          'tag.default',
          { include: '.*Land.*' }
        )
        const state = reducerSearch(
          {
            ...initialStateSearch,
            config: {
              ...initialStateSearch.config,
              aggregations: ES_FIXTURE_AGGS_REQUEST,
            },
          },
          action
        )
        const clone = JSON.parse(JSON.stringify(ES_FIXTURE_AGGS_REQUEST))
        clone['tag.default'].terms.include = '.*Land.*'
        expect(state.config.aggregations).toEqual(clone)
      })
    })
  })

  describe('PatchResultsAggregations action', () => {
    it('should replace the aggregations buckets for the key in the result', () => {
      const payload = ES_FIXTURE_AGGS_RESPONSE_MORE
      const action = new fromActions.PatchResultsAggregations(
        'tag.default',
        payload
      )
      const state = reducerSearch(
        {
          ...initialStateSearch,
          results: {
            ...initialStateSearch.results,
            aggregations: ES_FIXTURE_AGGS_RESPONSE,
          },
        },
        action
      )
      expect(state.results.aggregations['tag.default'].buckets).toEqual(
        ES_FIXTURE_AGGS_RESPONSE_MORE['tag.default'].buckets
      )
    })
  })

  describe('SetError action', () => {
    it('should store the error and stop loading', () => {
      const action = new fromActions.SetError(404, 'Not found')
      const state = reducerSearch(
        {
          ...initialStateSearch,
          loadingMore: true,
          error: null,
        },
        action
      )
      expect(state.error).toEqual({
        code: 404,
        message: 'Not found',
      })
      expect(state.loadingMore).toBeFalsy()
    })
  })

  describe('ClearError action', () => {
    it('should clear the error', () => {
      const action = new fromActions.ClearError()
      const state = reducerSearch(
        {
          ...initialStateSearch,
          error: {
            code: 404,
            message: 'Not found',
          },
        },
        action
      )
      expect(state.error).toEqual(null)
    })
  })

  describe('SetSpatialFilterEnabled action', () => {
    it('should set the spatial filter to be disabled', () => {
      const action = new fromActions.SetSpatialFilterEnabled(false)
      const state = reducerSearch(
        {
          ...initialStateSearch,
          params: {
            ...initialStateSearch.params,
            useSpatialFilter: true,
          },
        },
        action
      )
      expect(state.params.useSpatialFilter).toEqual(false)
    })
  })
})
