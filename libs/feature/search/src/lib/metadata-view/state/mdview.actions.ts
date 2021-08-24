import { createAction, props } from '@ngrx/store'

export const setUuid = createAction(
  '[Metadata view] Set uuid',
  props<{ uuid: string }>()
)
