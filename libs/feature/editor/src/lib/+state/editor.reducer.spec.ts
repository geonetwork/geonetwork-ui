import { Action } from '@ngrx/store'
import * as EditorActions from './editor.actions'
import {
  editorReducer,
  EditorState,
  initialEditorState,
} from './editor.reducer'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

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
    it('hasRecordChangedSinceDraftSuccess action', () => {
      const changes = ['change1', 'change2']
      const action = EditorActions.hasRecordChangedSinceDraftSuccess({
        changes,
      })
      const result: EditorState = editorReducer(
        { ...initialEditorState, hasRecordChanged: [] },
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
