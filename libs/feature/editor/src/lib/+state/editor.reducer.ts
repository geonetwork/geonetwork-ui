import { Action, createReducer, on } from '@ngrx/store'
import * as EditorActions from './editor.actions'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { SaveRecordError } from './editor.models'
import { EditorConfig } from '../models'
import { DEFAULT_CONFIGURATION } from '../fields.config'
import { updateLanguages } from '@geonetwork-ui/util/shared'

export const EDITOR_FEATURE_KEY = 'editor'

/**
 * @property record The record being edited
 * @property recordSource Original representation of the record as text, used as a reference; null means the record hasn't be serialized yet
 * @property saving
 * @property saveError
 * @property changedSinceSave
 * @property editorConfig Configuration for the fields in the editor
 */
export interface EditorState {
  record: CatalogRecord | null
  recordSource: string | null
  saving: boolean
  saveError: SaveRecordError | null
  changedSinceSave: boolean
  editorConfig: EditorConfig
  currentPage: number
  hasRecordChanged: { user: string; date: Date }
  isPublished: boolean
  canEditRecord: boolean
}

export interface EditorPartialState {
  readonly [EDITOR_FEATURE_KEY]: EditorState
}

export const initialEditorState: EditorState = {
  record: null,
  recordSource: null,
  saving: false,
  saveError: null,
  changedSinceSave: false,
  editorConfig: DEFAULT_CONFIGURATION,
  currentPage: 0,
  hasRecordChanged: null,
  isPublished: true,
  canEditRecord: true,
}

const reducer = createReducer(
  initialEditorState,
  on(EditorActions.openRecord, (state, { record, recordSource }) => ({
    ...state,
    changedSinceSave: false,
    recordSource: recordSource ?? null,
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
  })),
  on(EditorActions.setCurrentPage, (state, { page }) => ({
    ...state,
    currentPage: page,
  })),
  on(EditorActions.setFieldVisibility, (state, { field, visible }) => ({
    ...state,
    editorConfig: {
      ...state.editorConfig,
      pages: state.editorConfig.pages.map((page) => ({
        ...page,
        sections: page.sections.map((section) => ({
          ...section,
          fields: section.fields.map((f) => {
            if (f.model === field.model) {
              return {
                ...f,
                hidden: !visible,
              }
            }
            return f
          }),
        })),
      })),
    },
  })),
  on(EditorActions.hasRecordChangedSinceDraftSuccess, (state, { changes }) => ({
    ...state,
    hasRecordChanged: changes,
  })),
  on(EditorActions.isPublished, (state, { isPublished }) => ({
    ...state,
    isPublished: isPublished,
  })),
  on(EditorActions.canEditRecord, (state, { canEditRecord }) => ({
    ...state,
    canEditRecord: canEditRecord,
  })),
  on(
    EditorActions.updateRecordLanguages,
    (state, { defaultLanguage, otherLanguages }) => ({
      ...state,
      record: updateLanguages(state.record, defaultLanguage, otherLanguages),
    })
  )
)

export function editorReducer(state: EditorState | undefined, action: Action) {
  return reducer(state, action)
}
