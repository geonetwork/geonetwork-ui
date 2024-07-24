import { createAction, props } from '@ngrx/store'
import { MapContext } from '@geospatial-sdk/core'
import type { Feature } from 'geojson'

export const setContext = createAction(
  '[Map] Set Context',
  props<{ context: MapContext }>()
)

export const setSelectedFeatures = createAction(
  '[Map] Set Selected Features',
  props<{ selectedFeatures: Feature[] }>()
)

export const clearSelectedFeatures = createAction(
  '[Map] Clear Selected Features'
)
