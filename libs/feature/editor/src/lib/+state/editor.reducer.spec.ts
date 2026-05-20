import { Action } from '@ngrx/store'
import * as EditorActions from './editor.actions'
import {
  editorReducer,
  EditorState,
  initialEditorState,
} from './editor.reducer'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import {
  CatalogRecord,
  CatalogRecordKeys,
} from '@geonetwork-ui/common/domain/model/record'

describe('Editor Reducer', () => {
  describe('valid Editor actions', () => {
    it('openRecord (with source)', () => {
      const action = EditorActions.openRecord({
        record: datasetRecordsFixture()[0] as CatalogRecord,
        recordSource: '<xml>blabla</xml>',
      })
      const result: EditorState = editorReducer(
        {
          ...initialEditorState,
          changedSinceSave: true,
          recordSource: 'abcd',
        },
        action
      )

      expect(result.record).toEqual(datasetRecordsFixture()[0])
      expect(result.changedSinceSave).toBe(false)
      expect(result.recordSource).toBe('<xml>blabla</xml>')
    })
    it('openRecord (without source)', () => {
      const action = EditorActions.openRecord({
        record: datasetRecordsFixture()[0] as CatalogRecord,
      })
      const result: EditorState = editorReducer(
        {
          ...initialEditorState,
          changedSinceSave: true,
          recordSource: '<xml>blabla</xml>',
        },
        action
      )

      expect(result.record).toEqual(datasetRecordsFixture()[0])
      expect(result.changedSinceSave).toBe(false)
      expect(result.recordSource).toBe(null)
    })
    it('saveRecord action', () => {
      const action = EditorActions.saveRecord()
      const result: EditorState = editorReducer(
        { ...initialEditorState, changedSinceSave: true, saveError: 'oopsie' },
        action
      )

      expect(result.saving).toBe(true)
      expect(result.saveError).toBe(null)
    })
    it('saveRecordSuccess action', () => {
      const action = EditorActions.saveRecordSuccess()
      const result: EditorState = editorReducer(
        {
          ...initialEditorState,
          saving: true,
          saveError: 'oopsie',
          changedSinceSave: true,
        },
        action
      )

      expect(result.saving).toBe(false)
      expect(result.saveError).toBe(null)
      expect(result.changedSinceSave).toBe(false)
    })
    it('saveRecordFailure action', () => {
      const action = EditorActions.saveRecordFailure({
        error: 'oopsie',
      })
      const result: EditorState = editorReducer(
        { ...initialEditorState, saving: true },
        action
      )

      expect(result.saving).toBe(false)
      expect(result.saveError).toEqual('oopsie')
    })
    it('updateRecordField action', () => {
      const action = EditorActions.updateRecordField({
        field: 'title',
        value: 'new title',
      })
      const result: EditorState = editorReducer(
        {
          ...initialEditorState,
          record: datasetRecordsFixture()[0] as CatalogRecord,
        },
        action
      )

      expect(result.record.title).toEqual('new title')
    })
    it('markRecordAsChanged action', () => {
      const action = EditorActions.markRecordAsChanged()
      const result: EditorState = editorReducer(
        { ...initialEditorState, changedSinceSave: false },
        action
      )

      expect(result.changedSinceSave).toBe(true)
    })
    it('setEditorConfiguration action', () => {
      const configuration = {
        sections: [],
        pages: [],
      }
      const action = EditorActions.setEditorConfiguration({ configuration })
      const result: EditorState = editorReducer(
        { ...initialEditorState, editorConfig: null },
        action
      )

      expect(result.editorConfig).toEqual(configuration)
    })
    it('setCurrentPage action', () => {
      const action = EditorActions.setCurrentPage({ page: 2 })
      const result: EditorState = editorReducer(
        { ...initialEditorState, currentPage: 0 },
        action
      )

      expect(result.currentPage).toBe(2)
    })
    it('setFieldVisibility action', () => {
      const field = { model: 'title' as CatalogRecordKeys }
      const action = EditorActions.setFieldVisibility({
        field,
        visible: false,
      })
      const result: EditorState = editorReducer(
        {
          ...initialEditorState,
          editorConfig: {
            pages: [
              {
                sections: [
                  {
                    fields: [
                      {
                        model: 'title' as CatalogRecordKeys,
                        formFieldConfig: {},
                      },
                    ],
                    hidden: false,
                  },
                ],
              },
            ],
          },
        },
        action
      )

      expect(result.editorConfig.pages[0].sections[0].fields[0].hidden).toEqual(
        true
      )
    })
    it('hasRecordChangedSinceDraftSuccess action', () => {
      const changes = { user: 'barbie', date: new Date('2024-06-01T00:00:00Z') }
      const action = EditorActions.hasRecordChangedSinceDraftSuccess({
        changes,
      })
      const result: EditorState = editorReducer(
        { ...initialEditorState, hasRecordChanged: null },
        action
      )

      expect(result.hasRecordChanged).toEqual(changes)
    })
    it('isPublished action', () => {
      const action = EditorActions.isPublished({
        isPublished: true,
      })
      const result: EditorState = editorReducer(
        { ...initialEditorState, isPublished: true },
        action
      )

      expect(result.isPublished).toBe(true)
    })
    it('canEditRecord action', () => {
      const action = EditorActions.canEditRecord({
        canEditRecord: true,
      })
      const result: EditorState = editorReducer(
        { ...initialEditorState, canEditRecord: true },
        action
      )

      expect(result.canEditRecord).toBe(true)
    })
  })

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action

      const result = editorReducer(initialEditorState, action)

      expect(result).toBe(initialEditorState)
    })
  })
})
