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
        recordSource: '<xml>blabla</xml>',
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

    it('selectRecordSource() should return the source of the current record', () => {
      const result = EditorSelectors.selectRecordSource(state)
      expect(result).toBe('<xml>blabla</xml>')
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

    it('selectRecordAlreadySavedOnce() should return the current "alreadySavedOnce" state', () => {
      const result = EditorSelectors.selectRecordAlreadySavedOnce(state)
      expect(result).toBe(false)
    })

    it('selectRecordFieldsConfig() should return the current "fieldsConfig" state', () => {
      const result = EditorSelectors.selectEditorConfig(state)
      expect(result).toEqual(DEFAULT_FIELDS)
    })

    describe('selectRecordFields', () => {
      it('should return the config and value for each field', () => {
        const result = EditorSelectors.selectRecordSections(state)

        const actualSections = result.pages.map((page) => page.sections).flat()

        const expectedSections = DEFAULT_FIELDS.pages
          .map((page) => page.sections)
          .flat()

        expect(actualSections).toEqual(expectedSections)

        const actualFields = actualSections
          .map((section) => section.fields)
          .flat()

        const expectedFields = expectedSections
          .map((section) => section.fields)
          .flat()

        expect(actualFields).toEqual(expectedFields)
      })

      it('should not coerce falsy values to null', () => {
        const result = EditorSelectors.selectRecordSections({
          ...state,
          editor: {
            ...state.editor,
            record: {
              ...DATASET_RECORDS[0],
              abstract: '',
              title: '',
            },
          },
        })

        const resultFields = result.pages
          .flatMap((page) => page.sections)
          .flatMap((section) => section.fields)

        const abstractField = resultFields.find(
          (field) => field.model === 'abstract'
        )

        const titleField = resultFields.find((field) => field.model === 'title')

        expect(abstractField.value).toEqual('')
        expect(titleField.value).toEqual('')
      })
    })
  })
})
