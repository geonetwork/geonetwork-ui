import { createFeatureSelector, createSelector } from '@ngrx/store'
import { EDITOR_FEATURE_KEY, EditorState } from './editor.reducer'

export const selectEditorState =
  createFeatureSelector<EditorState>(EDITOR_FEATURE_KEY)

export const selectRecord = createSelector(
  selectEditorState,
  (state: EditorState) => state.record
)

export const selectRecordSource = createSelector(
  selectEditorState,
  (state: EditorState) => state.recordSource
)

export const selectRecordSaving = createSelector(
  selectEditorState,
  (state: EditorState) => state.saving
)

export const selectRecordSaveError = createSelector(
  selectEditorState,
  (state: EditorState) => state.saveError
)

export const selectRecordChangedSinceSave = createSelector(
  selectEditorState,
  (state: EditorState) => state.changedSinceSave
)

export const selectRecordAlreadySavedOnce = createSelector(
  selectEditorState,
  (state: EditorState) => state.alreadySavedOnce
)

export const selectRecordFieldsConfig = createSelector(
  selectEditorState,
  (state: EditorState) => state.fieldsConfig
)

export const selectRecordFields = createSelector(
  selectEditorState,
  (state: EditorState) => {
    const fieldsConfig = state.fieldsConfig
    fieldsConfig.pages.forEach((page) => {
      page.sections.forEach((section) => {
        section.fields.forEach((field) => {
          if (state.record) {
            field.value = state.record[field.model]
          }
        })
      })
    })

    return fieldsConfig
  }
)
