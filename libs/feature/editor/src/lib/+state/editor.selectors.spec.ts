import { EditorPartialState } from './editor.reducer'
import * as EditorSelectors from './editor.selectors'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'

describe('Editor Selectors', () => {
  let state: EditorPartialState

  beforeEach(() => {
    state = {
      editor: {
        record: DATASET_RECORDS[0],
        saveError: 'something went wrong',
        saving: false,
        changedSinceSave: true,
      },
    }
  })

  describe('Editor Selectors', () => {
    it('selectRecord() should return the current loaded record', () => {
      const result = EditorSelectors.selectRecord(state)
      expect(result).toBe(DATASET_RECORDS[0])
    })

    it('selectRecordSaving() should return the current "saving" state', () => {
      const result = EditorSelectors.selectRecordSaving(state)
      expect(result).toBe(false)
    })

    it('selectRecordSaveError() should return the current "saveError" state', () => {
      const result = EditorSelectors.selectRecordSaveError(state)
      expect(result).toBe('something went wrong')
    })

    it('selectRecordChangedSinceSave() should return the current "changedSinceSave" state', () => {
      const result = EditorSelectors.selectRecordChangedSinceSave(state)
      expect(result).toBe(true)
    })
  })
})
