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
      aggregations: state.config.aggregations,
      from: 0,
      size: RESULTS_PAGE_SIZE,
      sort: state.params.sortBy ? [state.params.sortBy] : undefined,
      query: {
        bool: {
          must: [{ query_string: { query: state.params.filters.any || '*' } }],
        },
      },
    }
    return payload
  }
}
