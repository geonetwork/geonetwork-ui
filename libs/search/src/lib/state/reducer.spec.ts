import { initialState, reducer, SearchStateParams } from './reducer'
import * as fromActions from './actions'
import { ResultsListLayout } from '@lib/common'

describe('Search Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any
      const state = reducer(undefined, action)

      expect(state).toBe(initialState)
    })
  })

  describe('UPDATE_FILTERS action', () => {
    it('should set new filters', () => {
      const action = new fromActions.UpdateFilters({
        any: 'blah',
      })
      const state = reducer(initialState, action)
      expect(state.params.filters).toEqual({ any: 'blah' })
    })
    it('should remove filters with value undefined', () => {
      const action = new fromActions.UpdateFilters({
        any: undefined,
      })
      const state = reducer(
        {
          ...initialState,
          params: {
            ...initialState.params,
            filters: {
              any: 'bleh',
            },
          },
        },
        action
      )
      expect(state.params.filters).toEqual({})
    })
  })

  describe('SET_SEARCH action', () => {
    it('should set serach params', () => {
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
    it('should add results to the list', () => {
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
})
