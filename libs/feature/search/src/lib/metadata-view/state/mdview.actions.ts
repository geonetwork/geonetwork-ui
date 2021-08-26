import { RecordSummary } from '@geonetwork-ui/util/shared'
import { createAction, props } from '@ngrx/store'

export const loadFullMetadata = createAction(
  '[Metadata view] Load full metadata',
  props<{ uuid: string }>()
)

export const setIncompleteMetadata = createAction(
  '[Metadata view] Set incomplete metadata',
  props<{ incomplete: RecordSummary }>()
)

export const loadFullSuccess = createAction(
  '[Metadata view] Load full success',
  props<{ full: RecordSummary }>()
)

export const loadFullFailure = createAction(
  '[Metadata view] Load full failure',
  props<{ error: any }>()
)

export const close = createAction('[Metadata view] close')
