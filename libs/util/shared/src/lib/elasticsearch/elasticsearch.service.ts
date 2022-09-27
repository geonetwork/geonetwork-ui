import { Inject, Injectable, InjectionToken, Optional } from '@angular/core'
import { ES_QUERY_STRING_FIELDS, ES_SOURCE_SUMMARY } from './constant'
import {
  EsSearchParams,
  EsTemplateType,
  RequestFields,
  SearchFilters,
  SortParams,
  StateConfigFilters,
} from '../models'

export const METADATA_LANGUAGE = new InjectionToken<string>('metadata-language')

@Injectable({
  providedIn: 'root',
})
export class ElasticsearchService {
  constructor(
    @Optional() @Inject(METADATA_LANGUAGE) private metadataLang: string
  ) {}

  getSearchRequestBody(
    aggregations: any = {},
    size: number = 0,
    from: number = 0,
    sortBy: string = '',
    requestFields: RequestFields = [],
    searchFilters: SearchFilters = {},
    configFilters: StateConfigFilters = {},
    uuids?: string[]
  ): EsSearchParams {
    const payload = {
      aggregations,
      from,
      size,
      sort: this.buildPayloadSort(sortBy),
      query: this.buildPayloadQuery(searchFilters, configFilters, uuids),
      _source: requestFields,
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

  getRelatedRecordPayload(
    title: string,
    uuid: string,
    size: number = 6,
    _source = ES_SOURCE_SUMMARY
  ): EsSearchParams {
    return {
      query: {
        bool: {
          must: [
            {
              more_like_this: {
                fields: [
                  'resourceTitleObject.default',
                  'resourceAbstractObject.default',
                  'tag.raw',
                ],
                like: title,
                min_term_freq: 1,
                max_query_terms: 12,
              },
            },
            {
              terms: {
                isTemplate: ['n'],
              },
            },
            {
              terms: {
                draft: ['n', 'e'],
              },
            },
          ],
          must_not: [{ wildcard: { uuid: uuid } }],
        },
      },
      size,
      _source,
    }
  }

  private buildPayloadSort(sortBy: string): SortParams {
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

  private injectLangInQueryStringFields(
    queryStringFields: string[],
    lang: string
  ) {
    const queryLang = lang ? `lang${lang}` : `*`
    return queryStringFields.map((field) => {
      return field.replace(/\$\{searchLang\}/g, queryLang)
    })
  }

  private buildPayloadQuery(
    { any, ...fieldSearchFilters }: SearchFilters,
    configFilters: StateConfigFilters,
    uuids?: string[]
  ) {
    const queryFilters = this.stateFiltersToQueryString(fieldSearchFilters)

    return {
      bool: {
        must: [
          ...(any
            ? [
                {
                  query_string: {
                    query: this.escapeSpecialCharacters(any),
                    default_operator: 'AND',
                    fields: this.injectLangInQueryStringFields(
                      ES_QUERY_STRING_FIELDS,
                      this.metadataLang
                    ),
                  },
                },
              ]
            : []),
          ...(queryFilters
            ? [
                {
                  query_string: {
                    query: queryFilters,
                  },
                },
              ]
            : []),
          ...(uuids?.length > 0
            ? [
                {
                  ids: {
                    values: uuids,
                  },
                },
              ]
            : []),
          this.addTemplateClause('n'),
        ],
        filter: this.buildPayloadFilter(configFilters),
      },
    }
  }

  private buildPayloadFilter({ custom, elastic }: StateConfigFilters) {
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
          query: this.stateFiltersToQueryString(custom),
        },
      })
    }
    return query
  }

  buildMoreOnAggregationPayload(
    aggregations: any,
    key: string,
    searchFilters: SearchFilters,
    configFilters: StateConfigFilters
  ): EsSearchParams {
    return {
      aggregations: { [key]: aggregations[key] },
      size: 0,
      query: this.buildPayloadQuery(searchFilters, configFilters),
    }
  }

  addTemplateClause(value: EsTemplateType) {
    return !value || value.length <= 0
      ? {}
      : {
          terms: {
            isTemplate: [...value],
          },
        }
  }

  buildAutocompletePayload(query: string): EsSearchParams {
    return {
      query: {
        bool: {
          must: [
            this.addTemplateClause('n'),
            {
              multi_match: {
                query,
                type: 'bool_prefix',
                fields: this.injectLangInQueryStringFields(
                  [
                    'resourceTitleObject.${searchLang}',
                    'resourceAbstractObject.${searchLang}',
                    'tag',
                    'resourceIdentifier',
                  ],
                  this.metadataLang
                ),
              },
            },
          ],
        },
      },
      _source: ['resourceTitleObject', 'uuid'],
      from: 0,
      size: 20,
    }
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

  private escapeSpecialCharacters(querystring) {
    return querystring.replace(
      /(\+|-|\/|&&|\|\||!|\{|\}|\[|\]\^|~|\?|:|\\{1}|\(|\))/g,
      '\\$1'
    )
  }
}
