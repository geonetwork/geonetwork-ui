import {
  PublishJobStatusApiModel,
  UploadJobStatusApiModel,
} from '@geonetwork-ui/data-access/datafeeder'
import {
  DatafeederAction,
  SET_PUBLICATION,
  SET_UPLOAD,
} from './datafeeder.action'

export const DATAFEEDER_STATE_KEY = 'datafeeder'

export interface DatafeederState {
  id?: string
  upload?: UploadJobStatusApiModel
  publication?: PublishJobStatusApiModel
}

export const initialState: DatafeederState = {}

export function reducer(
  state = initialState,
  action: DatafeederAction
): DatafeederState {
  switch (action.type) {
    case SET_UPLOAD: {
      const upload = action.payload
      return {
        ...state,
        upload,
      }
    }
    case SET_PUBLICATION: {
      const publication = action.payload
      return {
        ...state,
        publication,
      }
    }
  }
  return state
}
