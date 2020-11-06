import { Injectable } from '@angular/core'
import { RESULTS_PAGE_SIZE } from '@lib/common'
import { SearchParams } from 'elasticsearch'
import { SearchState } from '../state/reducer'
import { ElasticsearchMetadataModels, ElasticSearchSources } from './constant'

@Injectable({
  providedIn: 'root',
})
export class ElasticsearchService {
  constructor() {}

  search(state: SearchState, model: ElasticsearchMetadataModels): SearchParams {
    const payload = this.buildPayload(state)
    payload._source = ElasticSearchSources[model]
    return payload
  }

  buildPayload(state: SearchState): SearchParams {
    const payload = {
      // TODO: read from state
      aggregations: {
        tag: { terms: { field: 'tag', include: '.*', size: 10 } },
      },
      from: 0,
      size: RESULTS_PAGE_SIZE,
      sort: state.sortBy ? [state.sortBy] : undefined,
      query: {
        bool: { must: [{ query_string: { query: state.params.any || '*' } }] },
      },
    }
    return payload
  }
}
