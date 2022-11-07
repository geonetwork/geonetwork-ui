import { Action, createReducer, on } from '@ngrx/store'

import * as MapActions from './map.actions'
import { MapLayerWithInfo } from './map.models'

export const MAP_FEATURE_KEY = 'map'

export interface MapState {
  layers: MapLayerWithInfo[]
}

export interface MapPartialState {
  readonly [MAP_FEATURE_KEY]: MapState
}

export const initialMapState: MapState = {
  layers: [],
}

const reducer = createReducer(
  initialMapState,
  on(MapActions.addLayer, (state, action) => {
    const layers: MapLayerWithInfo[] = [...state.layers]
    const layerWithInfo = { ...action.layer, loading: false, error: null }
    if (!('atIndex' in action)) layers.push(layerWithInfo)
    else layers.splice(action.atIndex, 0, layerWithInfo)
    return {
      ...state,
      layers,
    }
  }),
  on(MapActions.updateLayer, (state, action) => ({
    ...state,
    layers: state.layers.map((layer, index) =>
      index === action.index
        ? {
            ...action.updatedLayer,
            loading: false,
            error: null,
          }
        : layer
    ),
  })),
  on(MapActions.removeLayer, (state, action) => ({
    ...state,
    layers: state.layers.filter((layer, index) => index !== action.index),
  })),
  on(MapActions.changeLayerOrder, (state, action) => {
    const layers: MapLayerWithInfo[] = [...state.layers]
    const moved = layers.splice(action.currentIndex, 1)[0]
    layers.splice(action.newIndex, 0, moved)
    return {
      ...state,
      layers,
    }
  }),
  on(MapActions.setLayerError, (state, action) => ({
    ...state,
    layers: state.layers.map((layer, index) =>
      index === action.index
        ? {
            ...layer,
            error: action.error,
          }
        : layer
    ),
  })),
  on(MapActions.clearLayerError, (state, action) => ({
    ...state,
    layers: state.layers.map((layer, index) =>
      index === action.index
        ? {
            ...layer,
            error: null,
          }
        : layer
    ),
  }))
)

export function mapReducer(state: MapState | undefined, action: Action) {
  return reducer(state, action)
}
