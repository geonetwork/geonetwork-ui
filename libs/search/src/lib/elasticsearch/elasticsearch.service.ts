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
    const { size, sortBy, filters } = state.params
    const payload = {
      aggs: state.config.aggs,
      from: 0,
      size,
      sort: sortBy ? [sortBy] : undefined,
      query: {
        bool: {
          must: [{ query_string: { query: filters.any || '*' } }],
        },
      },
    }
    return payload
  }
}
