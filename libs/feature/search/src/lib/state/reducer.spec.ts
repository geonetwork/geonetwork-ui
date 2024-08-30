import {
  HISTOGRAM_AGGREGATION,
  SAMPLE_AGGREGATION_MORE_RESULTS,
  SAMPLE_AGGREGATIONS_PARAMS,
  SAMPLE_AGGREGATIONS_RESULTS,
  TERMS_AGGREGATION,
} from '@geonetwork-ui/common/fixtures'
import { DEFAULT_PAGE_SIZE } from '../constants'
import * as fromActions from './actions'
import { DEFAULT_SEARCH_KEY } from './actions'
import {
  initialState,
  reducer,
  reducerSearch,
  SearchStateParams,
} from './reducer'
import { TermsAggregationParams } from '@geonetwork-ui/common/domain/model/search'

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
        any: 'blah',
        other: 'Some value',
      })
      const state = reducerSearch(initialStateSearch, action)
      expect(state.config.filters).toEqual({
        any: 'blah',
        other: 'Some value',
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
        pageSize: 12,
        currentPage: 0,
        sort: ['asc', 'tag'],
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
      const action = new fromActions.SetSortBy(['desc', 'fieldA'])
      const state = reducerSearch(initialStateSearch, action)
      expect(state.params.sort).toEqual(['desc', 'fieldA'])
    })
  })

  describe('SetFavoritesOnly action', () => {
    it('should set favoritesOnly param to true', () => {
      const action = new fromActions.SetFavoritesOnly(true)
      const state = reducerSearch(initialStateSearch, action)
      expect(state.params.favoritesOnly).toEqual(true)
    })
  })

  describe('SetPageSize action', () => {
    it('should set size', () => {
      const action = new fromActions.SetPageSize(15)
      const state = reducerSearch(initialStateSearch, action)
      expect(state.params.pageSize).toEqual(15)
    })
  })

  describe('Paginate action', () => {
    it('should set from property and keep size', () => {
      const action = new fromActions.Paginate(3)
      const state = reducerSearch(initialStateSearch, action)
      expect(state.params.currentPage).toEqual(2)
      expect(state.params.pageSize).toEqual(DEFAULT_PAGE_SIZE)
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
    it('should remove the loadingResults flag', () => {
      const payload = [{ title: 'record1' } as any]
      const action = new fromActions.AddResults(payload)
      const state = reducerSearch(
        {
          ...initialStateSearch,
          loadingResults: true,
        },
        action
      )
      expect(state.loadingResults).toEqual(false)
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
            count: 200,
            records: [{ title: 'abcd' } as any],
          },
        },
        action
      )
      expect(state.results).toEqual({
        aggregations: {},
        count: 200,
        records: [],
      })
    })
  })

  describe('RequestNewResults action', () => {
    it('should set the loadingResults flag, not change params', () => {
      const action = new fromActions.RequestNewResults()
      const state = reducerSearch(initialStateSearch, action)
      expect(state.loadingResults).toEqual(true)
      expect(state.params).toEqual(initialStateSearch.params)
    })
  })

  describe('RequestMoreResults action', () => {
    it('increment `from` property with `size` value and set the loadingResults flag', () => {
      const action = new fromActions.RequestMoreResults()
      const state = reducerSearch(initialStateSearch, action)
      expect(state.params.currentPage).toEqual(1)
      expect(state.params.pageSize).toEqual(DEFAULT_PAGE_SIZE)
      expect(state.loadingResults).toEqual(true)
    })
  })

  describe('SetResultsAggregations action', () => {
    it('should replace the aggregations in the result', () => {
      const payload = SAMPLE_AGGREGATIONS_RESULTS()
      const action = new fromActions.SetResultsAggregations(payload)
      const state = reducerSearch(
        {
          ...initialStateSearch,
          results: {
            ...initialStateSearch.results,
            aggregations: { someKey: { buckets: [] } },
          },
        },
        action
      )
      expect(state.results.aggregations).toEqual(SAMPLE_AGGREGATIONS_RESULTS())
    })
  })

  describe('SetConfigAggregations action', () => {
    it('should replace the aggregations in the config', () => {
      const payload = SAMPLE_AGGREGATIONS_PARAMS()
      const action = new fromActions.SetConfigAggregations(payload)
      const state = reducerSearch(
        {
          ...initialStateSearch,
          config: {
            ...initialStateSearch.config,
            aggregations: {
              someKey: {
                type: 'terms',
                field: 'someKey',
                limit: 10,
                sort: ['desc', 'key'],
              },
            },
          },
        },
        action
      )
      expect(state.config.aggregations).toEqual(SAMPLE_AGGREGATIONS_PARAMS())
    })
  })

  describe('UpdateConfigAggregations action', () => {
    it('should augment the aggregations in the config', () => {
      const payload = { newAgg: HISTOGRAM_AGGREGATION }
      const action = new fromActions.UpdateConfigAggregations(payload)
      const state = reducerSearch(
        {
          ...initialStateSearch,
          config: {
            ...initialStateSearch.config,
            aggregations: { someKey: TERMS_AGGREGATION },
          },
        },
        action
      )
      expect(state.config.aggregations).toEqual({
        someKey: TERMS_AGGREGATION,
        newAgg: HISTOGRAM_AGGREGATION,
      })
    })
  })

  describe('SetConfigRequestFields action', () => {
    it('should replace the _source in the config', () => {
      const payload = ['title', 'abstract']
      const action = new fromActions.SetConfigRequestFields(payload)
      const state = reducerSearch(
        {
          ...initialStateSearch,
        },
        action
      )
      expect(state.config.source).toEqual(['title', 'abstract'])
    })
  })
  describe('RequestMoreOnAggregation action', () => {
    it('should update the limit of the terms aggregation', () => {
      const action = new fromActions.RequestMoreOnAggregation('myField', 20)
      const state = reducerSearch(
        {
          ...initialStateSearch,
          config: {
            ...initialStateSearch.config,
            aggregations: SAMPLE_AGGREGATIONS_PARAMS(),
          },
        },
        action
      )
      const aggregation = state.config.aggregations[
        'myField'
      ] as TermsAggregationParams
      expect(aggregation.limit).toEqual(70)
    })
    it('should not update other kinds of aggregations', () => {
      const action = new fromActions.RequestMoreOnAggregation(
        'myValueField',
        20
      )
      const initialState = {
        ...initialStateSearch,
        config: {
          ...initialStateSearch.config,
          aggregations: SAMPLE_AGGREGATIONS_PARAMS(),
        },
      }
      const state = reducerSearch(initialState, action)
      expect(state).toBe(initialState)
    })
  })

  describe('SetIncludeOnAggregation action', () => {
    it('should update the filter of the terms aggregation', () => {
      const action = new fromActions.SetIncludeOnAggregation(
        'myField',
        '.*bla.*'
      )
      const state = reducerSearch(
        {
          ...initialStateSearch,
          config: {
            ...initialStateSearch.config,
            aggregations: SAMPLE_AGGREGATIONS_PARAMS(),
          },
        },
        action
      )
      const aggregation = state.config.aggregations[
        'myField'
      ] as TermsAggregationParams
      expect(aggregation.filter).toEqual('.*bla.*')
    })
    it('should not update other kinds of aggregations', () => {
      const action = new fromActions.SetIncludeOnAggregation(
        'myValueField',
        '.*bla.*'
      )
      const initialState = {
        ...initialStateSearch,
        config: {
          ...initialStateSearch.config,
          aggregations: SAMPLE_AGGREGATIONS_PARAMS(),
        },
      }
      const state = reducerSearch(initialState, action)
      expect(state).toBe(initialState)
    })
  })

  describe('PatchResultsAggregations action', () => {
    it('should replace the aggregations buckets for the key in the result', () => {
      const action = new fromActions.PatchResultsAggregations(
        'myField',
        SAMPLE_AGGREGATION_MORE_RESULTS
      )
      const state = reducerSearch(
        {
          ...initialStateSearch,
          results: {
            ...initialStateSearch.results,
            aggregations: SAMPLE_AGGREGATIONS_RESULTS(),
          },
        },
        action
      )
      expect(state.results.aggregations['myField']).toEqual(
        SAMPLE_AGGREGATION_MORE_RESULTS
      )
    })
  })

  describe('SetError action', () => {
    it('should store the error and stop loading', () => {
      const action = new fromActions.SetError(404, 'Not found')
      const state = reducerSearch(
        {
          ...initialStateSearch,
          loadingResults: true,
          error: null,
        },
        action
      )
      expect(state.error).toEqual({
        code: 404,
        message: 'Not found',
      })
      expect(state.loadingResults).toBeFalsy()
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
