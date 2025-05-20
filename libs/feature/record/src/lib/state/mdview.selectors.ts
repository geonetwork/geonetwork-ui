import { createFeatureSelector, createSelector } from '@ngrx/store'
import {
  METADATA_VIEW_FEATURE_STATE_KEY,
  MetadataViewState,
} from './mdview.reducer'

export const getMdViewState = createFeatureSelector<MetadataViewState>(
  METADATA_VIEW_FEATURE_STATE_KEY
)

/*
  Metadata selectors
*/
export const getMetadataUuid = createSelector(
  getMdViewState,
  (state: MetadataViewState) =>
    state.metadata ? state.metadata.uniqueIdentifier : null
)
export const getMetadata = createSelector(
  getMdViewState,
  (state: MetadataViewState) => state.metadata
)
export const getMetadataIsIncomplete = createSelector(
  getMdViewState,
  (state: MetadataViewState) => (state.metadata ? state.loadingFull : null)
)
export const getMetadataIsLoading = createSelector(
  getMdViewState,
  (state: MetadataViewState) => state.loadingFull
)
export const getMetadataError = createSelector(
  getMdViewState,
  (state: MetadataViewState) => state.error
)

/*
  Related selectors
*/
export const getRelated = createSelector(
  getMdViewState,
  (state: MetadataViewState) => state.related
)

export const getSources = createSelector(
  getMdViewState,
  (state: MetadataViewState) => state.sources
)

export const getSourceOf = createSelector(
  getMdViewState,
  (state: MetadataViewState) => state.sourceOf
)
/*
  Metadata selectors
*/
export const getChartConfig = createSelector(
  getMdViewState,
  (state: MetadataViewState) => state.chartConfig
)

/*
  UserFeedback selectors
*/
export const getUserFeedbacks = createSelector(
  getMdViewState,
  (state: MetadataViewState) => state.userFeedbacks
)
export const getAllUserFeedbacksLoading = createSelector(
  getMdViewState,
  (state: MetadataViewState) => state.allUserFeedbacksLoading
)
export const getAddUserFeedbacksLoading = createSelector(
  getMdViewState,
  (state: MetadataViewState) => state.addUserFeedbackLoading
)

/*
  Feature Catalog Selectors
*/
export const getFeatureCatalog = createSelector(
  getMdViewState,
  (state: MetadataViewState) => state.featureCatalog
)
export const getFeatureCatalogIsLoading = createSelector(
  getMdViewState,
  (state: MetadataViewState) => state.featureCatalogLoading
)
