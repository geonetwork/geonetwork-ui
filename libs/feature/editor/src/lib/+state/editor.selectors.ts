import { createFeatureSelector, createSelector } from '@ngrx/store'
import { EDITOR_FEATURE_KEY, EditorState } from './editor.reducer'

export const selectEditorState =
  createFeatureSelector<EditorState>(EDITOR_FEATURE_KEY)

export const selectRecord = createSelector(
  selectEditorState,
  (state: EditorState) => state.record
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

export const selectRecordFieldsConfig = createSelector(
  selectEditorState,
  (state: EditorState) => state.fieldsConfig
)

export const selectRecordFields = createSelector(
  selectEditorState,
  (state: EditorState) =>
    state.fieldsConfig.map((fieldConfig) => ({
      config: fieldConfig,
      value: state.record?.[fieldConfig.model] || null,
    }))
)
