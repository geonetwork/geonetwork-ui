import { Injectable } from '@angular/core'
import { RESULTS_PAGE_SIZE } from '@lib/common'
import { SearchState } from '../state/reducer'

@Injectable({
  providedIn: 'root',
})
export class ElasticsearchService {
  constructor() {}

  buildPayload(state: SearchState) {
    const payload = {
      from: 0,
      size: RESULTS_PAGE_SIZE,
      sort: state.sortBy ? [state.sortBy] : undefined,
      query: {
        bool: { must: [{ query_string: { query: state.params.any || '*' } }] },
      },
    }
  }
}
