import { createAction, props } from '@ngrx/store'
import { MapContext } from '@geospatial-sdk/core'

export const setContext = createAction(
  '[Map] Set Context',
  props<{ context: MapContext }>()
)
