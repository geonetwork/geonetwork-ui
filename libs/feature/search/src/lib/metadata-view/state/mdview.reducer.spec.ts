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

  describe('loadFullMetadata', () => {
    let action
    beforeEach(() => {
      action = MdViewActions.loadFullMetadata({ uuid: '123132132132132132' })
    })
    it('store the loading state', () => {
      const state = reducer(initialMdviewState, action)
      expect(state).toEqual({
        ...initialMdviewState,
        loadingFull: true,
      })
    })
  })
  describe('setIncompleteMetadata', () => {
    let action
    beforeEach(() => {
      action = MdViewActions.setIncompleteMetadata({
        incomplete: RECORDS_SUMMARY_FIXTURE[0],
      })
    })
    it('saves incomplete metadata', () => {
      const state = reducer(initialMdviewState, action)
      expect(state).toEqual({
        ...initialMdviewState,
        metadata: RECORDS_SUMMARY_FIXTURE[0],
      })
    })
  })
  describe('loadFullRecordSuccess', () => {
    let action
    beforeEach(() => {
      action = MdViewActions.loadFullSuccess({
        full: RECORDS_SUMMARY_FIXTURE[0],
      })
    })
    it('saves full metadata ', () => {
      const state = reducer(
        { ...initialMdviewState, loadingFull: true },
        action
      )
      expect(state).toEqual({
        ...initialMdviewState,
        loadingFull: false,
        metadata: RECORDS_SUMMARY_FIXTURE[0],
      })
    })
  })
  describe('loadFullRecordFailure', () => {
    let action
    beforeEach(() => {
      action = MdViewActions.loadFullFailure({
        error: 'error',
      })
    })
    it('set error', () => {
      const state = reducer(
        { ...initialMdviewState, loadingFull: true },
        action
      )
      expect(state).toEqual({
        ...initialMdviewState,
        loadingFull: false,
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
          loadingFull: false,
          metadata: RECORDS_SUMMARY_FIXTURE[0],
        },
        action
      )
      expect(state).toEqual(initialMdviewState)
    })
  })
})
