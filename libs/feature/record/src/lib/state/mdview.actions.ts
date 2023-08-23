import { DatavizConfigurationModel } from '@geonetwork-ui/common/domain/dataviz-configuration.model'
import { createAction, props } from '@ngrx/store'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'

export const loadFullMetadata = createAction(
  '[Metadata view] Load full metadata',
  props<{ uuid: string }>()
)

export const setIncompleteMetadata = createAction(
  '[Metadata view] Set incomplete metadata',
  props<{ incomplete: Partial<CatalogRecord> }>()
)

export const loadFullSuccess = createAction(
  '[Metadata view] Load full success',
  props<{ full: CatalogRecord }>()
)

export const loadFullFailure = createAction(
  '[Metadata view] Load full failure',
  props<{ otherError?: string; notFound?: boolean }>()
)

export const setRelated = createAction(
  '[Metadata view] Set related records',
  props<{ related: CatalogRecord[] }>()
)

export const setChartConfig = createAction(
  '[Metadata view] Set chart config',
  props<{ chartConfig: DatavizConfigurationModel }>()
)

export const close = createAction('[Metadata view] close')
