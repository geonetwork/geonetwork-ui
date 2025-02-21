import { DatavizConfigurationModel } from '@geonetwork-ui/common/domain/model/dataviz/dataviz-configuration.model'
import { createAction, props } from '@ngrx/store'
import {
  CatalogRecord,
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

export const loadCatalogAttributes = createAction(
  '[Metadata view] Load catalog attributes of the metadata',
  props<{ metadataUuid: string; approvedVersion?: boolean }>()
)

export const loadCatalogAttributesSuccess = createAction(
  '[Metadata view] Load full metadata success',
  props<{ full: CatalogRecord }>() // TODO A retyper avec le type DatasetFeatureCatalog ?
)

export const loadCatalogAttributesFailure = createAction(
  '[Metadata view] Load full metadata failure',
  props<{ otherError?: string; notFound?: boolean }>()
)

export const closeMetadata = createAction('[Metadata view] close')

/*
  Related actions
 */
export const setRelated = createAction(
  '[Metadata view] Set related records',
  props<{ related: CatalogRecord[] }>()
)

/*
  ChartConfig actions
 */
export const setChartConfig = createAction(
  '[Metadata view] Set chart config',
  props<{ chartConfig: DatavizConfigurationModel }>()
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
