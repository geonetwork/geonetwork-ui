import { EditorPartialState, initialEditorState } from './editor.reducer'
import * as EditorSelectors from './editor.selectors'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { DEFAULT_FIELDS } from '../fields.config'

describe('Editor Selectors', () => {
  let state: EditorPartialState

  beforeEach(() => {
    state = {
      editor: {
        ...initialEditorState,
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

    it('selectRecordFieldsConfig() should return the current "fieldsConfig" state', () => {
      const result = EditorSelectors.selectRecordFieldsConfig(state)
      expect(result).toEqual(DEFAULT_FIELDS)
    })

    it('selectRecordFields() should return the config and value for each field', () => {
      const result = EditorSelectors.selectRecordFields(state)
      expect(result).toEqual([
        {
          config: DEFAULT_FIELDS[0],
          value: DATASET_RECORDS[0].title,
        },
        {
          config: DEFAULT_FIELDS[1],
          value: DATASET_RECORDS[0].abstract,
        },
        {
          config: DEFAULT_FIELDS[2],
          value: DATASET_RECORDS[0].uniqueIdentifier,
        },
        {
          config: DEFAULT_FIELDS[3],
          value: DATASET_RECORDS[0].recordUpdated,
        },
        {
          config: DEFAULT_FIELDS[4],
          value: DATASET_RECORDS[0].licenses,
        },
        {
          config: DEFAULT_FIELDS[5],
          value: DATASET_RECORDS[0].resourceUpdated,
        },
        {
          config: DEFAULT_FIELDS[6],
          value: DATASET_RECORDS[0].updateFrequency,
        },
      ])
    })
  })
})
