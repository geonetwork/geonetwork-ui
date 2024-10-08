import { createAction, props } from '@ngrx/store'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { SaveRecordError } from './editor.models'
import { EditorFieldIdentification } from '../models'

export const openRecord = createAction(
  '[Editor] Open record',
  props<{
    record: CatalogRecord
    alreadySavedOnce: boolean
    recordSource?: string | null
  }>()
)

export const updateRecordField = createAction(
  '[Editor] Update record field',
  props<{ field: string; value: unknown }>()
)

export const markRecordAsChanged = createAction(
  '[Editor] Mark record as changed'
)

export const saveRecord = createAction('[Editor] Save record')
export const saveRecordSuccess = createAction('[Editor] Save record success')
export const saveRecordFailure = createAction(
  '[Editor] Save record failure',
  props<{ error: SaveRecordError }>()
)

export const draftSaveSuccess = createAction('[Editor] Draft save success')

export const undoRecordDraft = createAction('[Editor] Undo record draft')

export const setCurrentPage = createAction(
  '[Editor] Set current page',
  props<{ page: number }>()
)

export const setFieldVisibility = createAction(
  '[Editor] Set field visibility',
  props<{ field: EditorFieldIdentification; visible: boolean }>()
)
