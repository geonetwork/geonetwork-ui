import { SearchState } from '../model'
import * as fromActions from './actions'

export const SEARCH_FEATURE_KEY = 'searchState'

export const initialState: SearchState = {
  params: {},
}

export function reducer(
  state = initialState,
  action: fromActions.SearchActions
): SearchState {
  switch (action.type) {
    case fromActions.UPDATE_PARAMS: {
      return {
        ...state,
        params: {
          ...action.payload,
        },
      }
    }
    case fromActions.SORT_BY: {
      return {
        ...state,
        sortBy: action.sortBy,
      }
    }
  }

  return state
}
