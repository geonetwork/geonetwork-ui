import { RecordSummary } from '@geonetwork-ui/util/shared'
import { createAction, props } from '@ngrx/store'

export const setUuid = createAction(
  '[Metadata view] Set uuid',
  props<{ uuid: string }>()
)

export const setPreview = createAction(
  '[Metadata view] Set preview',
  props<{ preview: RecordSummary }>()
)

export const setFull = createAction(
  '[Metadata view] Set full metadata',
  props<{ full: RecordSummary }>()
)
