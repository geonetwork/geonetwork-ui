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
  describe('setPreview', () => {
    let action
    beforeEach(() => {
      action = MdViewActions.setPreview({
        preview: RECORDS_SUMMARY_FIXTURE[0],
      })
    })
    it('set Preview', () => {
      const state = reducer(initialMdviewState, action)
      expect(state).toEqual({ preview: RECORDS_SUMMARY_FIXTURE[0] })
    })
  })
  describe('setFull', () => {
    let action
    beforeEach(() => {
      action = MdViewActions.setPreview({
        preview: RECORDS_SUMMARY_FIXTURE[0],
      })
    })
    it('set Full Metadata', () => {
      const state = reducer(initialMdviewState, action)
      expect(state).toEqual({ preview: RECORDS_SUMMARY_FIXTURE[0] })
    })
  })
})
