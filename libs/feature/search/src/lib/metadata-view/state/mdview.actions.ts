import { RecordSummary } from '@geonetwork-ui/util/shared'
import { createAction, props } from '@ngrx/store'

export const loadFull = createAction(
  '[Metadata view] Load full metadata',
  props<{ uuid: string }>()
)

export const setPreview = createAction(
  '[Metadata view] Set preview',
  props<{ preview: RecordSummary }>()
)

export const loadFullSuccess = createAction(
  '[Metadata view] Load full success',
  props<{ full: RecordSummary }>()
)

export const loadFullFailure = createAction(
  '[Metadata view] Load full failure',
  props<{ error: any }>()
)
