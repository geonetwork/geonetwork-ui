import { Injectable } from '@angular/core'
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
    const sort = sortBy ? [sortBy] : undefined

    const { any, ...searchFilters } = filters
    const queryFilters = this.facetsToLuceneQuery(searchFilters)
    const queryAny = `(${filters.any || '*'})`
    const query =
      queryAny + (queryFilters.length > 0 ? ` AND ${queryFilters}` : '')

    const payload = {
      aggs: state.config.aggregations,
      from: 0,
      size,
      sort,
      query: {
        bool: {
          must: [
            {
              query_string: {
                query,
              },
            },
          ],
        },
      },
    }
    return payload
  }

  combineQueryGroups(queryGroups) {
    return queryGroups ? queryGroups.join(' AND ').trim() : ''
  }

  /**
   * Facets state is an object like this:
   *
   * {
   *   'tag': {
   *     'world': true,
   *     'vector': true
   *   },
   *   'availableInService' : {
   *     'availableInViewService': '+linkProtocol:\/OGC:WMS.*\/'
   *   },
   *   'resourceType': {
   *     'service': {
   *       'serviceType': {
   *         'OGC:WMS': true
   *         'OGC:WFS': false
   *       }
   *     },
   *     'download': {
   *       'serviceType': {
   *       }
   *     },
   *     'dataset': true
   *   }
   * }
   */
  facetsToLuceneQuery(facetsState) {
    const query = []
    for (const indexKey in facetsState) {
      if (facetsState.hasOwnProperty(indexKey)) {
        const queryChunk = this.parseStateNode(
          indexKey,
          facetsState[indexKey],
          undefined
        )
        if (queryChunk) {
          query.push(queryChunk)
        }
      }
    }
    return this.combineQueryGroups(query)
  }

  parseStateNode(nodeName, node, indexKey) {
    let queryString = ''
    if (node && typeof node === 'object') {
      const chunks = []
      for (const p in node) {
        // nesting
        if (node[p] && typeof node[p] === 'object') {
          const nextLvlKey = Object.keys(node[p])[0]
          const nextLvlState = node[p][nextLvlKey]
          if (Object.keys(nextLvlState).length) {
            const nestedChunks = [nodeName + ':' + '"' + p + '"']
            const chunk = this.parseStateNode(
              nextLvlKey,
              nextLvlState,
              nextLvlKey
            ).trim()
            if (chunk) {
              nestedChunks.push(chunk)
            }
            chunks.push('(' + nestedChunks.join(' AND ') + ')')
          }
        } else {
          const chunk = this.parseStateNode(p, node[p], nodeName).trim()
          if (chunk) {
            chunks.push(chunk)
          }
        }
      }
      if (chunks && chunks.length) {
        queryString += '('
        queryString += chunks.join(' ')
        queryString += ')'
      }
    } else if (typeof node === 'string') {
      queryString += node
    } else if (node === true) {
      queryString += indexKey + ':"' + nodeName + '"'
    } else if (node === false) {
      queryString += '-' + indexKey + ':"' + nodeName + '"'
    }
    return queryString
  }
}
