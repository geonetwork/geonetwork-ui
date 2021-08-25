import { RECORDS_SUMMARY_FIXTURE } from '@geonetwork-ui/ui/search'
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

  describe('loadFull', () => {
    let action
    beforeEach(() => {
      action = MdViewActions.loadFull({ uuid: '123132132132132132' })
    })
    it('load full metadata', () => {
      const state = reducer(initialMdviewState, action)
      expect(state).toEqual({
        ...initialMdviewState,
        uuid: '123132132132132132',
        loading: true,
      })
    })
  })
  describe('setPreview', () => {
    let action
    beforeEach(() => {
      action = MdViewActions.setPreview({
        preview: RECORDS_SUMMARY_FIXTURE[0],
      })
    })
    it('set Preview', () => {
      const state = reducer(initialMdviewState, action)
      expect(state).toEqual({
        ...initialMdviewState,
        preview: RECORDS_SUMMARY_FIXTURE[0],
      })
    })
  })
  describe('loadFullSuccess', () => {
    let action
    beforeEach(() => {
      action = MdViewActions.loadFullSuccess({
        full: RECORDS_SUMMARY_FIXTURE[0],
      })
    })
    it('set Full Metadata', () => {
      const state = reducer({ ...initialMdviewState, loading: true }, action)
      expect(state).toEqual({
        ...initialMdviewState,
        loading: false,
        full: RECORDS_SUMMARY_FIXTURE[0],
      })
    })
  })
  describe('loadFullFailure', () => {
    let action
    beforeEach(() => {
      action = MdViewActions.loadFullFailure({
        error: 'error',
      })
    })
    it('set error', () => {
      const state = reducer({ ...initialMdviewState, loading: true }, action)
      expect(state).toEqual({
        ...initialMdviewState,
        error: 'error',
      })
    })
  })
  describe('close', () => {
    let action
    beforeEach(() => {
      action = MdViewActions.close()
    })
    it('set error', () => {
      const state = reducer(
        {
          ...initialMdviewState,
          loading: false,
          full: RECORDS_SUMMARY_FIXTURE[0],
        },
        action
      )
      expect(state).toEqual({
        ...initialMdviewState,
      })
    })
  })
})
