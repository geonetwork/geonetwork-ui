import { Action, createReducer, on } from '@ngrx/store'
import * as EditorActions from './editor.actions'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { SaveRecordError } from './editor.models'
import { EditorFieldsConfig } from '../models/fields.model'
import { DEFAULT_FIELDS } from '../fields.config'

export const EDITOR_FEATURE_KEY = 'editor'

export interface EditorState {
  record: CatalogRecord | null
  saving: boolean
  saveError: SaveRecordError | null
  changedSinceSave: boolean
  fieldsConfig: EditorFieldsConfig
}

export interface EditorPartialState {
  readonly [EDITOR_FEATURE_KEY]: EditorState
}

export const initialEditorState: EditorState = {
  record: null,
  saving: false,
  saveError: null,
  changedSinceSave: false,
  fieldsConfig: DEFAULT_FIELDS,
}

const reducer = createReducer(
  initialEditorState,
  on(EditorActions.openRecord, (state, { record }) => ({
    ...state,
    changedSinceSave: false,
    record,
  })),
  on(EditorActions.saveRecord, (state) => ({
    ...state,
    saving: true,
    saveError: null,
  })),
  on(EditorActions.saveRecordSuccess, (state) => ({
    ...state,
    saving: false,
    saveError: null,
    changedSinceSave: false,
  })),
  on(EditorActions.saveRecordFailure, (state, { error }) => ({
    ...state,
    saving: false,
    saveError: error,
  })),
  on(EditorActions.updateRecordField, (state, { field, value }) => ({
    ...state,
    record: {
      ...state.record,
      [field]: value,
    },
  })),
  on(EditorActions.markRecordAsChanged, (state) => ({
    ...state,
    changedSinceSave: true,
  }))
)

export function editorReducer(state: EditorState | undefined, action: Action) {
  return reducer(state, action)
}
