import { createAction, props } from '@ngrx/store'
import { MapLayer } from './map.models'

export const addLayer = createAction(
  '[Map] Add Layer',
  props<{ layer: MapLayer; atIndex?: number }>()
)

export const removeLayer = createAction(
  '[Map] Remove Layer',
  props<{ index: number }>()
)

export const updateLayer = createAction(
  '[Map] Update Layer',
  props<{ updatedLayer: MapLayer; index: number }>()
)

export const changeLayerOrder = createAction(
  '[Map] Change Layer Order',
  props<{ currentIndex: number; newIndex: number }>()
)

export const setLayerError = createAction(
  '[Map] Set Layer Error',
  props<{ index: number; error: string }>()
)

export const clearLayerError = createAction(
  '[Map] Clear Layer Error',
  props<{ index: number }>()
)
