import { createAction, props } from '@ngrx/store'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { SaveRecordError } from './editor.models'

export const openRecord = createAction(
  '[Editor] Open record',
  props<{ record: CatalogRecord }>()
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
