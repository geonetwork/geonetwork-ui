import { Injectable } from '@angular/core'
import {
  BootstrapService,
  EsSearchParams,
  SortParams,
} from '@geonetwork-ui/util/shared'
import { Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { SearchStateSearch } from '../state/reducer'

@Injectable({
  providedIn: 'root',
})
export class ElasticsearchService {
  constructor(private bootstrap: BootstrapService) {}

  uiConf = this.bootstrap.uiConfReady('srv').pipe(take(1))

  getSearchRequestBody(state: SearchStateSearch): EsSearchParams {
    const { size, from } = state.params
    const payload = {
      aggregations: state.config.aggregations,
      from,
      size,
      sort: this.buildPayloadSort(state),
      query: this.buildPayloadQuery(state),
      _source: state.config.source,
    }
    return payload
  }

  getMetadataByIdPayload(uuid: string): EsSearchParams {
    return {
      query: {
        ids: {
          values: [uuid],
        },
      },
    }
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
  ): EsSearchParams {
    const payload = {
      aggregations: { [key]: state.config.aggregations[key] },
      size: 0,
      query: this.buildPayloadQuery(state),
    }
    return payload
  }

  buildAutocompletePayload(query: string): Observable<EsSearchParams> {
    return this.uiConf.pipe(
      map((config) => {
        const template = config.mods.search.autocompleteConfig
        return {
          ...template,
          query: {
            ...template.query,
            bool: {
              ...template.query.bool,
              must: [
                {
                  multi_match: {
                    ...template.query.bool.must[0].multi_match,
                    query,
                  },
                },
                ...template.query.bool.must.filter(
                  (clause) => !('multi_match' in clause)
                ),
              ],
            },
          },
        }
      })
    )
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
      if (indexKey in facetsState) {
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
