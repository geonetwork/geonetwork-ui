import * as MdViewActions from './mdview.actions'
import { initialMdviewState, reducer } from './mdview.reducer'

describe('MdView Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any
      const state = reducer(undefined, action)

      expect(state).toBe(initialMdviewState)
    })
  })

  describe('setUuid', () => {
    let action
    beforeEach(() => {
      action = MdViewActions.setUuid({ uuid: '123132132132132132' })
    })
    it('update uuid', () => {
      const state = reducer(initialMdviewState, action)
      expect(state).toEqual({ uuid: '123132132132132132' })
    })
  })
})
