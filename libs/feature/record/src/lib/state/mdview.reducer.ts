import { Action, createReducer, on } from '@ngrx/store'
import * as MdViewActions from './mdview.actions'
import { DatavizConfigurationModel } from '@geonetwork-ui/common/domain/dataviz-configuration.model'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'

export const MD_VIEW_FEATURE_STATE_KEY = 'mdView'

export interface MdViewState {
  loadingFull: boolean
  error: { notFound?: boolean; otherError?: string } | null
  metadata?: Partial<CatalogRecord>
  related?: CatalogRecord[]
  chartConfig?: DatavizConfigurationModel
}

export const initialMdviewState: MdViewState = {
  error: null,
  loadingFull: false,
}

const mdViewReducer = createReducer(
  initialMdviewState,
  on(MdViewActions.loadFullMetadata, (state) => ({
    ...state,
    error: null,
    loadingFull: true,
  })),
  on(MdViewActions.setIncompleteMetadata, (state, { incomplete }) => ({
    ...state,
    error: null,
    metadata: incomplete,
  })),
  on(MdViewActions.loadFullSuccess, (state, { full }) => ({
    ...state,
    error: null,
    metadata: full,
    loadingFull: false,
  })),
  on(MdViewActions.loadFullFailure, (state, { otherError, notFound }) => ({
    ...state,
    error: { otherError, notFound },
    loadingFull: false,
  })),
  on(MdViewActions.setRelated, (state, { related }) => ({
    ...state,
    related,
  })),
  on(MdViewActions.setChartConfig, (state, { chartConfig }) => ({
    ...state,
    chartConfig,
  })),
  on(MdViewActions.close, (state) => {
    // eslint-disable-next-line
    const { metadata, related, ...stateWithoutMd } = state
    return stateWithoutMd
  })
)

export function reducer(state: MdViewState | undefined, action: Action) {
  return mdViewReducer(state, action)
}
