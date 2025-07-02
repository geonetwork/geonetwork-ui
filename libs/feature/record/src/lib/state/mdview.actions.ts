import { DatavizChartConfigModel } from '@geonetwork-ui/common/domain/model/dataviz/dataviz-configuration.model'
import { createAction, props } from '@ngrx/store'
import {
  CatalogRecord,
  DatasetFeatureCatalog,
  UserFeedback,
} from '@geonetwork-ui/common/domain/model/record'

/*
  Metadata actions
 */
export const loadFullMetadata = createAction(
  '[Metadata view] Load full metadata',
  props<{ uuid: string }>()
)

export const setIncompleteMetadata = createAction(
  '[Metadata view] Set incomplete metadata',
  props<{ incomplete: Partial<CatalogRecord> }>()
)

export const loadFullMetadataSuccess = createAction(
  '[Metadata view] Load full metadata success',
  props<{ full: CatalogRecord }>()
)

export const loadFullMetadataFailure = createAction(
  '[Metadata view] Load full metadata failure',
  props<{ otherError?: string; notFound?: boolean }>()
)

export const loadFeatureCatalog = createAction(
  "[Metadata view] Load metadata's feature catalog",
  props<{ metadata: CatalogRecord }>()
)

export const loadFeatureCatalogSuccess = createAction(
  '[Metadata view] Load metadata feature catalog success',
  props<{ datasetCatalog: DatasetFeatureCatalog | null }>()
)

export const loadFeatureCatalogFailure = createAction(
  '[Metadata view] Load metadata feature catalog failure',
  props<{ error?: string }>()
)

export const closeMetadata = createAction('[Metadata view] close')

/*
  Related actions
 */
export const setRelated = createAction(
  '[Metadata view] Set related records',
  props<{ related: CatalogRecord[] }>()
)

export const setSources = createAction(
  '[Metadata view] Set sources',
  props<{ sources: CatalogRecord[] }>()
)

export const setSourceOf = createAction(
  '[Metadata view] Set has sources',
  props<{ sourceOf: CatalogRecord[] }>()
)

/*
  ChartConfig actions
 */
export const setChartConfig = createAction(
  '[Metadata view] Set chart config',
  props<{ chartConfig: DatavizChartConfigModel }>()
)

/*
  User Feedbacks actions
 */
export const addUserFeedback = createAction(
  '[Metadata view] Add UserFeedback',
  props<{ userFeedback: UserFeedback }>()
)

export const addUserFeedbackSuccess = createAction(
  '[Metadata view] Add UserFeedback Success',
  props<{ datasetUuid: string }>()
)

export const addUserFeedbackFailure = createAction(
  '[Metadata view] Add UserFeedback Failure',
  props<{ otherError?: string; notFound?: boolean }>()
)

export const loadUserFeedbacks = createAction(
  '[Metadata view] Load UserFeedbacks',
  props<{ datasetUuid: string }>()
)

export const loadUserFeedbacksSuccess = createAction(
  '[Metadata view] Load UserFeedbacks Success',
  props<{ userFeedbacks: UserFeedback[] }>()
)

export const loadUserFeedbacksFailure = createAction(
  '[Metadata view] Load UserFeedbacks Failure',
  props<{ otherError?: string; notFound?: boolean }>()
)
