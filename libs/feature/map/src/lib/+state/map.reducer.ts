import { Action, createReducer, on } from '@ngrx/store'
import * as MapActions from './map.actions'
import { MapContext } from '@geospatial-sdk/core'

export const MAP_FEATURE_KEY = 'map'

export interface MapState {
  context: MapContext
}

export interface MapPartialState {
  readonly [MAP_FEATURE_KEY]: MapState
}

export const initialMapState: MapState = {
  context: { layers: [], view: {} },
}

const reducer = createReducer(
  initialMapState,
  on(MapActions.setContext, (state, { context }) => {
    return {
      ...state,
      context,
    }
  })
)

export function mapReducer(state: MapState | undefined, action: Action) {
  return reducer(state, action)
}
