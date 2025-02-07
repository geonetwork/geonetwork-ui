import {
  EDITOR_FEATURE_KEY,
  EditorPartialState,
  initialEditorState,
} from './editor.reducer'
import * as EditorSelectors from './editor.selectors'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { DEFAULT_CONFIGURATION } from '../fields.config'
import { EditorSectionWithValues } from './editor.models'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

describe('Editor Selectors', () => {
  let state: EditorPartialState

  beforeEach(() => {
    state = {
      editor: {
        ...initialEditorState,
        record: datasetRecordsFixture()[0] as CatalogRecord,
        recordSource: '<xml>blabla</xml>',
        saveError: 'something went wrong',
        saving: false,
        changedSinceSave: true,
        hasRecordChanged: ['date', 'user'],
        isPublished: true,
        canEditRecord: true,
      },
    }
  })

  describe('Editor Selectors', () => {
    it('selectRecord() should return the current loaded record', () => {
      const result = EditorSelectors.selectRecord(state)
      expect(result).toEqual(datasetRecordsFixture()[0])
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
    it('selectRecordFieldsConfig() should return the current "fieldsConfig" state', () => {
      const result = EditorSelectors.selectEditorConfig(state)
      expect(result).toEqual(DEFAULT_CONFIGURATION)
    })

    it('selectHasRecordChanged() should return the current "hasRecordChanged" state', () => {
      const result = EditorSelectors.selectHasRecordChanged(state)
      expect(result).toEqual(['date', 'user'])
    })

    it('selectIsPublished() should return the current "isPublished" state', () => {
      const result = EditorSelectors.selectIsPublished(state)
      expect(result).toEqual(true)
    })

    it('selectCanEditRecord() should return the current "canEditRecord" state', () => {
      const result = EditorSelectors.selectCanEditRecord(state)
      expect(result).toEqual(true)
    })

    describe('selectRecordFields', () => {
      it('should return the config and value for specified page', () => {
        const recordSections = EditorSelectors.selectRecordSections(state)

        const expectedResult = DEFAULT_CONFIGURATION.pages[0].sections.map(
          (section) => ({
            ...section,
            fieldsWithValues: section.fields.map((fieldConfig) => ({
              config: fieldConfig,
              value:
                state[EDITOR_FEATURE_KEY].record?.[fieldConfig.model] ?? null,
            })),
          })
        ) as EditorSectionWithValues[]

        expect(recordSections).toEqual(expectedResult)

        const actualFields = recordSections
          .map((section) => section.fields)
          .flat()

        const expectedFields = expectedResult
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
              ...datasetRecordsFixture()[0],
              abstract: '',
              title: '',
            },
          },
        })

        const resultFields = result.flatMap(
          (section) => section.fieldsWithValues
        )

        const abstractField = resultFields.find(
          (field) => field.config.model === 'abstract'
        )

        const titleField = resultFields.find(
          (field) => field.config.model === 'title'
        )

        expect(abstractField.value).toEqual('')
        expect(titleField.value).toEqual('')
      })
    })
  })
})
