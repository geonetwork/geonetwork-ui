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
    const payload = {
      aggs: state.config.aggregations,
      from: 0,
      size,
      sort: sortBy ? [sortBy] : undefined,
      query: {
        bool: {
          must: [
            {
              query_string: {
                query:
                  `(${filters.any || '*'})` +
                  `${this.fromFiltersToQuery(filters)}`,
              },
            },
          ],
        },
      },
    }
    return payload
  }

  fromFiltersToQuery(filters) {
    const clone = JSON.parse(JSON.stringify(filters))
    delete clone.any
    let query = this.facetsToLuceneQuery(clone)
    if (query.length > 0) {
      query = ' AND ' + query
    }
    return query
  }

  combineQueryGroups(queryGroups) {
    return queryGroups ? queryGroups.join(' AND ').trim() : ''
  }

  /**
   * Facet state is an object like this:
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
   *
   * @param facetsState
   * @returns {string}
   */
  facetsToLuceneQuery(facetsState) {
    var query = []
    for (var indexKey in facetsState) {
      var query_chunk = this.parseStateNode(
        indexKey,
        facetsState[indexKey],
        undefined
      )
      if (query_chunk) {
        query.push(query_chunk)
      }
    }
    return this.combineQueryGroups(query)
  }

  parseStateNode(nodeName, node, indexKey) {
    let query_string = ''
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
          var chunk = this.parseStateNode(p, node[p], nodeName).trim()
          if (chunk) {
            chunks.push(chunk)
          }
        }
      }
      if (chunks && chunks.length) {
        query_string += '('
        query_string += chunks.join(' ')
        query_string += ')'
      }
    } else if (typeof node === 'string') {
      query_string += node
    } else if (node === true) {
      query_string += indexKey + ':"' + nodeName + '"'
    } else if (node === false) {
      query_string += '-' + indexKey + ':"' + nodeName + '"'
    }
    return query_string
  }
}
