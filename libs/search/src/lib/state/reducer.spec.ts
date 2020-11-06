import { initialState, reducer } from './reducer'
import * as fromActions from './actions'

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
      expect(state.requestParams.filters).toEqual({ any: 'blah' })
    })
    it('should remove filters with value undefined', () => {
      const action = new fromActions.UpdateFilters({
        any: undefined,
      })
      const state = reducer(
        {
          ...initialState,
          requestParams: {
            ...initialState.requestParams,
            filters: {
              any: 'bleh',
            },
          },
        },
        action
      )
      expect(state.requestParams.filters).toEqual({})
    })
  })

  describe('SortBy action', () => {
    it('should set sort by params', () => {
      const action = new fromActions.SortBy('fieldA')
      const state = reducer(initialState, action)
      expect(state.requestParams.sortBy).toEqual('fieldA')
    })
  })

  describe('AddResults action', () => {
    it('should add results to the list', () => {
      const payload = [{ title: 'record1' } as any, { title: 'record2' } as any]
      const action = new fromActions.AddResults(payload)
      const state = reducer(
        {
          ...initialState,
          responseProperties: {
            ...initialState.responseProperties,
            results: [{ title: 'abcd' } as any],
          },
        },
        action
      )
      expect(state.responseProperties.results).toEqual([
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
          responseProperties: {
            ...initialState.responseProperties,
            results: [{ title: 'abcd' } as any],
          },
        },
        action
      )
      expect(state.responseProperties.results).toEqual([])
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
