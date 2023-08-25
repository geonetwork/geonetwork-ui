import { Inject, Injectable, Optional } from '@angular/core'
import { Geometry } from 'geojson'
import { ES_QUERY_STRING_FIELDS, ES_SOURCE_SUMMARY } from './constant'
import {
  Aggregation,
  AggregationParams,
  AggregationsParams,
  FilterAggregationParams,
  SortByField,
} from '@geonetwork-ui/common/domain/search'
import { METADATA_LANGUAGE } from '../../metadata-language'
import {
  AggregationResult,
  EsSearchParams,
  FiltersAggregationResult,
  HistogramAggregationResult,
  RequestFields,
  SearchFilters,
  SortParams,
  TermsAggregationResult,
} from '@geonetwork-ui/api/metadata-converter'

@Injectable({
  providedIn: 'root',
})
export class ElasticsearchService {
  // runtime fields are computed using a Painless script
  // see: https://www.elastic.co/guide/en/elasticsearch/reference/current/runtime-mapping-fields.html
  private runtimeFields: Record<string, string> = {}

  constructor(
    @Optional() @Inject(METADATA_LANGUAGE) private metadataLang: string
  ) {}

  getSearchRequestBody(
    aggregations: any = {},
    size = 0,
    from = 0,
    sortBy: SortByField = null,
    requestFields: RequestFields = [],
    searchFilters: SearchFilters = {},
    configFilters: SearchFilters = {},
    uuids?: string[],
    geometry?: Geometry
  ): EsSearchParams {
    const payload = {
      aggregations,
      from,
      size,
      sort: this.buildPayloadSort(sortBy),
      query: this.buildPayloadQuery(
        searchFilters,
        configFilters,
        uuids,
        geometry
      ),
      ...(size > 0 ? { track_total_hits: true } : {}),
      _source: requestFields,
    }
    this.processRuntimeFields(payload)
    return payload
  }

  // payload object will be mutated
  private processRuntimeFields(payload: EsSearchParams): EsSearchParams {
    const addMapping = (fieldName: string) => {
      if (!payload.runtime_mappings) payload.runtime_mappings = {}
      payload.runtime_mappings[fieldName] = {
        type: 'keyword',
        script: this.runtimeFields[fieldName],
      }
    }
    const lookForField = (node: unknown) => {
      if (Array.isArray(node)) {
        node.forEach(lookForField)
        return
      }
      if (typeof node !== 'object') return
      if ('field' in node && typeof node.field === 'string') {
        if (node.field in this.runtimeFields) {
          addMapping(node.field)
        }
      }
      for (const runtimeField in this.runtimeFields) {
        if (
          runtimeField in node &&
          (node[runtimeField] === 'asc' || node[runtimeField] === 'desc')
        ) {
          addMapping(runtimeField)
        }
        if (
          'query' in node &&
          typeof node.query === 'string' &&
          node.query.indexOf(runtimeField + ':') > -1
        ) {
          addMapping(runtimeField)
        }
      }
      for (const key in node) {
        if (typeof node[key] === 'object') lookForField(node[key])
      }
    }
    lookForField(payload.aggregations)
    lookForField(payload.sort)
    lookForField(payload.query)
    return payload
  }

  registerRuntimeField(fieldName: string, expression: string) {
    this.runtimeFields[fieldName] = expression
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
    size = 6,
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

  private buildPayloadSort(sortBy: SortByField): SortParams {
    if (sortBy === null) return undefined
    const fields = Array.isArray(sortBy[0]) ? sortBy : [sortBy]
    return fields.map((field) => ({ [field[1]]: field[0] }))
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
    configFilters: SearchFilters,
    uuids?: string[],
    geometry?: Geometry
  ) {
    const queryFilters = this.stateFiltersToQueryString(fieldSearchFilters)
    const must = [this.queryFilterOnValues('isTemplate', 'n')] as Record<
      string,
      unknown
    >[]
    const must_not = {
      ...this.queryFilterOnValues('resourceType', [
        'service',
        'map',
        'map/static',
        'mapDigital',
      ]),
    }
    const should = [] as Record<string, unknown>[]

    if (any) {
      must.push({
        query_string: {
          query: this.escapeSpecialCharacters(any),
          default_operator: 'AND',
          fields: this.injectLangInQueryStringFields(
            ES_QUERY_STRING_FIELDS,
            this.metadataLang
          ),
        },
      })
    }
    if (queryFilters) {
      must.push({
        query_string: {
          query: queryFilters,
        },
      })
    }
    if (uuids) {
      must.push({
        ids: {
          values: uuids,
        },
      })
    }
    if (geometry) {
      should.push(
        {
          geo_shape: {
            geom: {
              shape: geometry,
              relation: 'within',
            },
            boost: 10.0,
          },
        },
        {
          geo_shape: {
            geom: {
              shape: geometry,
              relation: 'intersects',
            },
            boost: 7.0,
          },
        }
      )
    }

    return {
      bool: {
        must,
        must_not,
        should,
        filter: [],
      },
    }
  }

  buildMoreOnAggregationPayload(
    aggregations: any,
    key: string,
    searchFilters: SearchFilters,
    configFilters: SearchFilters
  ): EsSearchParams {
    return {
      aggregations: { [key]: aggregations[key] },
      size: 0,
      query: this.buildPayloadQuery(searchFilters, configFilters),
    }
  }

  queryFilterOnValues(key, values) {
    return !values || values.length <= 0
      ? {}
      : {
          terms: {
            [key]: [...values],
          },
        }
  }

  buildAutocompletePayload(query: string): EsSearchParams {
    return {
      query: {
        bool: {
          must: [
            this.queryFilterOnValues('isTemplate', 'n'),
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
          must_not: {
            ...this.queryFilterOnValues('resourceType', [
              'service',
              'map',
              'map/static',
              'mapDigital',
            ]),
          },
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

  buildAggregationsPayload(aggregations: AggregationsParams): any {
    const mapFilterAggregation = (filterAgg: FilterAggregationParams) => ({
      match: filterAgg,
    })
    const mapToESAggregation = (aggregation: AggregationParams) => {
      switch (aggregation.type) {
        case 'filters':
          return {
            filters: Object.keys(aggregation.filters).reduce(
              (prev, curr) => ({
                ...prev,
                [curr]: mapFilterAggregation(aggregation.filters[curr]),
              }),
              {}
            ),
          }
        case 'terms':
          return {
            terms: {
              size: aggregation.limit,
              field: aggregation.field,
              order: {
                [`_${aggregation.sort[1]}`]: aggregation.sort[0],
              },
            },
          }
        case 'histogram':
          return {
            histogram: {
              field: aggregation.field,
              interval: aggregation.interval,
            },
          }
      }
    }
    return Object.keys(aggregations).reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: mapToESAggregation(aggregations[curr]),
      }),
      {}
    )
  }

  parseAggregationResult(
    result: AggregationResult,
    requestParam: AggregationParams
  ): Aggregation {
    switch (requestParam.type) {
      case 'filters':
        return {
          buckets: Object.keys(
            (result as FiltersAggregationResult).buckets
          ).map((key) => {
            const bucket = (result as FiltersAggregationResult).buckets[key]
            return {
              term: key,
              count: bucket.doc_count,
            }
          }),
        }
      case 'terms':
        return {
          buckets: (result as TermsAggregationResult).buckets.map((bucket) => ({
            term: bucket.key,
            count: bucket.doc_count,
          })),
        }
      case 'histogram': {
        const histogramResult = result as HistogramAggregationResult
        let buckets = Array.isArray(histogramResult.buckets)
          ? histogramResult.buckets
          : Object.keys(histogramResult.buckets).map(
              (key) => histogramResult.buckets[key]
            )
        buckets = buckets.map((bucket, index) => ({
          lowValue: bucket.key,
          highValue: buckets[index + 1]?.key, // this will return undefined on the last element (which we remove later)
          count: bucket.doc_count,
        }))
        buckets.pop() // see above
        return {
          buckets,
        }
      }
    }
  }
}
