import { createFeatureSelector, createSelector } from '@ngrx/store'
import { DATAFEEDER_STATE_KEY, DatafeederState } from './datafeeder.reducer'

export const getDatafeederState =
  createFeatureSelector<DatafeederState>(DATAFEEDER_STATE_KEY)

export const getUpload = createSelector(
  getDatafeederState,
  (state: DatafeederState) => state.upload
)
export const getPublication = createSelector(
  getDatafeederState,
  (state: DatafeederState) => state.publication
)
