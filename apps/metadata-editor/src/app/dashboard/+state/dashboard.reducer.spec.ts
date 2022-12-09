import { SetActiveMenu } from './dashboard.actions'
import * as fromReducer from './dashboard.reducer'
import {
  EditorDashboardState,
  initialEditorDashboardState,
} from './dashboard.reducer'

describe('Dashboard Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialEditorDashboardState } = fromReducer
      const action = {
        type: 'Unknown',
      }
      const state = fromReducer.reducer(initialEditorDashboardState, action)

      expect(state).toBe(initialEditorDashboardState)
    })
  })

  describe('setActiveMenu action', () => {
    it('should retrieve all books and update the state in an immutable way', () => {
      const { initialEditorDashboardState } = fromReducer
      const newState: EditorDashboardState = {
        activeMenu: 'my-draft',
      }
      const action = SetActiveMenu({ activeMenu: 'my-draft' })
      const state = fromReducer.reducer(initialEditorDashboardState, action)

      expect(state).toEqual(newState)
      expect(state).not.toBe(initialEditorDashboardState)
    })
  })
})
