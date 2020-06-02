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

  describe('UPDATE_PARAMS action', () => {
    it('should set new params', () => {
      const action = new fromActions.UpdateParams({
        any: 'blah',
      })
      const state = reducer(initialState, action)
      expect(state.params).toEqual({ any: 'blah' })
    })
    it('should remove params with value undefined', () => {
      const action = new fromActions.UpdateParams({
        any: undefined,
      })
      const state = reducer(
        {
          ...initialState,
          params: {
            any: 'bleh',
          },
        },
        action
      )
      expect(state.params).toEqual({})
    })
  })

  describe('SortBy action', () => {
    it('should set sort by params', () => {
      const action = new fromActions.SortBy('fieldA')
      const state = reducer(initialState, action)
      expect(state.sortBy).toEqual('fieldA')
    })
  })

  describe('AddResults action', () => {
    it('should add results to the list', () => {
      const payload = [{title: 'record1'} as any, {title: 'record2'} as any]
      const action = new fromActions.AddResults(payload)
      const state = reducer({
        ...initialState,
        results: [{title: 'abcd'} as any]
      }, action)
      expect(state.results).toEqual([{title: 'abcd'} as any, ...payload])
    })
    it('should remove the loadingMore flag', () => {
      const payload = [{title: 'record1'} as any]
      const action = new fromActions.AddResults(payload)
      const state = reducer({
        ...initialState,
        loadingMore: true
      }, action)
      expect(state.loadingMore).toEqual(false)
    })
  })

  describe('ClearResults action', () => {
    it('should add results to the list', () => {
      const action = new fromActions.ClearResults()
      const state = reducer({
        ...initialState,
        results: [{title: 'abcd'} as any]
      }, action)
      expect(state.results).toEqual([])
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
