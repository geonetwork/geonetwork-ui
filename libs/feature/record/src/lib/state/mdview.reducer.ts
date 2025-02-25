import { Action, createReducer, on } from '@ngrx/store'
import * as MetadataViewActions from './mdview.actions'
import { DatavizConfigurationModel } from '@geonetwork-ui/common/domain/model/dataviz/dataviz-configuration.model'
import {
  CatalogRecord,
  DatasetFeatureCatalog,
  UserFeedback,
} from '@geonetwork-ui/common/domain/model/record'

export const METADATA_VIEW_FEATURE_STATE_KEY = 'metadataView'

export interface MetadataViewState {
  loadingFull: boolean
  error: { notFound?: boolean; otherError?: string } | null
  metadata?: Partial<CatalogRecord>
  related?: CatalogRecord[]
  userFeedbacks?: UserFeedback[]
  allUserFeedbacksLoading: boolean
  addUserFeedbackLoading: boolean
  chartConfig?: DatavizConfigurationModel
  featureCatalog?: DatasetFeatureCatalog
}

export const initialMetadataViewState: MetadataViewState = {
  error: null,
  loadingFull: false,
  allUserFeedbacksLoading: false,
  addUserFeedbackLoading: false,
}

const metadataViewReducer = createReducer(
  initialMetadataViewState,

  /*
    Metadata reducers
  */
  on(MetadataViewActions.loadFullMetadata, (state) => ({
    ...state,
    error: null,
    loadingFull: true,
  })),
  on(MetadataViewActions.setIncompleteMetadata, (state, { incomplete }) => ({
    ...state,
    error: null,
    metadata: incomplete,
  })),
  on(MetadataViewActions.loadFullMetadataSuccess, (state, { full }) => ({
    ...state,
    error: null,
    metadata: full,
    loadingFull: false,
  })),
  on(
    MetadataViewActions.loadFullMetadataFailure,
    (state, { otherError, notFound }) => ({
      ...state,
      error: { otherError, notFound },
      loadingFull: false,
    })
  ),
  on(MetadataViewActions.closeMetadata, (state) => {
    const { metadata, related, userFeedbacks, ...stateWithoutMetadata } = state
    return stateWithoutMetadata
  }),

  /*
    Related reducers
  */
  on(MetadataViewActions.setRelated, (state, { related }) => ({
    ...state,
    related,
  })),

  /*
    ChartConfig reducers
  */
  on(MetadataViewActions.setChartConfig, (state, { chartConfig }) => ({
    ...state,
    chartConfig,
  })),

  /*
    UserFeedbacks reducers
  */
  on(MetadataViewActions.loadUserFeedbacks, (state) => ({
    ...state,
    allUserFeedbacksLoading: true,
  })),
  on(MetadataViewActions.addUserFeedback, (state) => ({
    ...state,
    addUserFeedbackLoading: true,
  })),
  on(
    MetadataViewActions.loadUserFeedbacksSuccess,
    (state, { userFeedbacks }) => ({
      ...state,
      userFeedbacks: userFeedbacks,
      addUserFeedbackLoading: false,
      allUserFeedbacksLoading: false,
    })
  ),
  on(
    MetadataViewActions.loadUserFeedbacksFailure,
    (state, { otherError, notFound }) => ({
      ...state,
      error: { otherError, notFound },
      addUserFeedbackLoading: false,
      allUserFeedbacksLoading: false,
    })
  )
)

export function reducer(
  metadataViewState: MetadataViewState | undefined,
  action: Action
) {
  return metadataViewReducer(metadataViewState, action)
}
