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
})
