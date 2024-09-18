import { Action, createReducer, on } from '@ngrx/store'
import * as MapActions from './map.actions'
import { MapContext } from '@geospatial-sdk/core'
import { Feature } from 'geojson'

export const MAP_FEATURE_KEY = 'map'

export interface MapState {
  context: MapContext
  selectedFeatures: Feature[]
}

export interface MapPartialState {
  readonly [MAP_FEATURE_KEY]: MapState
}

export const initialMapState: MapState = {
  context: { layers: [], view: null },
  selectedFeatures: [],
}

const reducer = createReducer(
  initialMapState,
  on(MapActions.setContext, (state, { context }) => {
    return {
      ...state,
      context,
    }
  }),
  on(MapActions.setSelectedFeatures, (state, { selectedFeatures }) => {
    return {
      ...state,
      selectedFeatures,
    }
  }),
  on(MapActions.clearSelectedFeatures, (state) => {
    return {
      ...state,
      selectedFeatures: [],
    }
  })
)

export function mapReducer(state: MapState | undefined, action: Action) {
  return reducer(state, action)
}
