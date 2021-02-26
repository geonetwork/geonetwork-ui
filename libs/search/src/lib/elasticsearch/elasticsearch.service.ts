import { Injectable } from '@angular/core'
import { SortParams } from '@lib/common'
import { NameList, SearchParams } from 'elasticsearch'
import { SearchStateSearch } from '../state/reducer'
import { ElasticsearchMetadataModels, ElasticSearchSources } from './constant'

@Injectable({
  providedIn: 'root',
})
export class ElasticsearchService {
  constructor() {}

  getSearchRequestBody(
    state: SearchStateSearch,
    model: ElasticsearchMetadataModels
  ): SearchParams {
    const { size, from } = state.params
    const payload = {
      aggregations: state.config.aggregations,
      from,
      size,
      sort: this.buildPayloadSort(state) as NameList,
      query: this.buildPayloadQuery(state),
      _source: ElasticSearchSources[model],
    }
    return payload
  }

  private buildPayloadSort(state: SearchStateSearch): SortParams {
    const { sortBy } = state.params
    return sortBy
      ? sortBy.split(',').map((s) => {
          if (s.startsWith('-')) {
            return { [s.substring(1)]: 'desc' }
          } else {
            return s
          }
        })
      : undefined
  }

  private buildPayloadQuery(state: SearchStateSearch) {
    const { filters } = state.params
    const { any, ...searchFilters } = filters
    const queryFilters = this.stateFiltersToQueryString(searchFilters)
    const queryAny = `(${any || '*'})`
    const query =
      queryAny + (queryFilters.length > 0 ? ` AND ${queryFilters}` : '')

    const partialQuery = {
      bool: {
        must: [{ query_string: { query } }],
        filter: this.buildPayloadFilter(state),
      },
    }
    return partialQuery
  }

  private buildPayloadFilter(state: SearchStateSearch) {
    const { filters } = state.config
    const { custom, elastic } = filters
    const queryString = this.stateFiltersToQueryString(custom)
    const query = []
    if (elastic) {
      if (!Array.isArray(elastic)) {
        query.push(elastic)
      } else {
        query.push(...elastic)
      }
    } else if (custom) {
      query.push({
        query_string: {
          query: queryString,
        },
      })
    }
    return query
  }

  buildMoreOnAggregationPayload(
    state: SearchStateSearch,
    key: string
  ): SearchParams {
    const payload = {
      aggregations: { [key]: state.config.aggregations[key] },
      size: 0,
      query: this.buildPayloadQuery(state),
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
  stateFiltersToQueryString(facetsState) {
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

  private parseStateNode(nodeName, node, indexKey) {
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
