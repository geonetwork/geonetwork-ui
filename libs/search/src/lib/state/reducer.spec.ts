import { ResultsListLayout } from '@lib/common'
import { ES_FIXTURE_AGGS_REQUEST } from '../elasticsearch/fixtures/aggregations-request'
import { ES_FIXTURE_AGGS_RESPONSE } from '../elasticsearch/fixtures/aggregations-response'
import * as fromActions from './actions'
import { initialState, reducer, SearchStateParams } from './reducer'

describe('Search Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any
      const state = reducer(undefined, action)

      expect(state).toBe(initialState)
    })
  })

  describe('SetFilters action', () => {
    it('should add new filters', () => {
      const action = new fromActions.SetFilters({
        any: 'blah',
        other: 'Some value',
      })
      const state = reducer(initialState, action)
      expect(state.params.filters).toEqual({ any: 'blah', other: 'Some value' })
    })
    it('should update defined filters and remove undefined filters', () => {
      const action = new fromActions.SetFilters({
        any: 'abc',
      })
      const state = reducer(
        {
          ...initialState,
          params: {
            ...initialState.params,
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
      const state = reducer(initialState, action)
      expect(state.params.filters).toEqual({ any: 'blah', other: 'Some value' })
    })
    it('should update defined filters and keep undefined filters', () => {
      const action = new fromActions.UpdateFilters({
        any: 'abc',
      })
      const state = reducer(
        {
          ...initialState,
          params: {
            ...initialState.params,
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
      }
      const action = new fromActions.SetSearch(searchParams)
      const state = reducer(initialState, action)
      expect(state.params).toEqual(searchParams)
    })
  })

  describe('SortBy action', () => {
    it('should set sort by params', () => {
      const action = new fromActions.SetSortBy('fieldA')
      const state = reducer(initialState, action)
      expect(state.params.sortBy).toEqual('fieldA')
    })
  })

  describe('Set result layout action', () => {
    it('should set result layout', () => {
      const action = new fromActions.SetResultsLayout(ResultsListLayout.CARD)
      const state = reducer(initialState, action)
      expect(state.resultsLayout).toEqual(ResultsListLayout.CARD)
    })
  })

  describe('AddResults action', () => {
    it('should add results to the list', () => {
      const payload = [{ title: 'record1' } as any, { title: 'record2' } as any]
      const action = new fromActions.AddResults(payload)
      const state = reducer(
        {
          ...initialState,
          results: {
            ...initialState.results,
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
      const state = reducer(
        {
          ...initialState,
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
      const state = reducer(
        {
          ...initialState,
          results: {
            ...initialState.results,
            records: [{ title: 'abcd' } as any],
          },
        },
        action
      )
      expect(state.results.records).toEqual([])
    })
  })

  describe('RequestMoreResults action', () => {
    it('should set the loadingMore flag', () => {
      const action = new fromActions.RequestMoreResults()
      const state = reducer(initialState, action)
      expect(state.loadingMore).toEqual(true)
    })
  })

  describe('SetResultsAggregations action', () => {
    it('should replace the aggregations in the result', () => {
      const payload = ES_FIXTURE_AGGS_RESPONSE
      const action = new fromActions.SetResultsAggregations(payload)
      const state = reducer(
        {
          ...initialState,
          results: {
            ...initialState.results,
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
      const state = reducer(
        {
          ...initialState,
          config: {
            ...initialState.config,
            aggregations: { someKey: 'someValue' },
          },
        },
        action
      )
      expect(state.config.aggregations).toEqual(ES_FIXTURE_AGGS_REQUEST)
    })
  })
})
