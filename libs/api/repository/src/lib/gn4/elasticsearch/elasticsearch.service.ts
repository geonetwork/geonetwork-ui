import { Injectable, Injector } from '@angular/core'
import { Geometry } from 'geojson'
import {
  ES_QUERY_FIELDS_PRIORITY,
  ES_SOURCE_SUMMARY,
  EsQueryFieldsPriorityType,
} from './constant'
import {
  Aggregation,
  AggregationParams,
  AggregationsParams,
  FieldFilter,
  FieldFilters,
  FilterQuery,
  FiltersAggregationParams,
  SortByField,
} from '@geonetwork-ui/common/domain/model/search'
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
import { getLang3FromLang2 } from '@geonetwork-ui/util/i18n'
import { formatDate, isDateRange } from './date-range.utils'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { TranslateService } from '@ngx-translate/core'

export type DateRange = { start?: Date; end?: Date }

@Injectable({
  providedIn: 'root',
})
export class ElasticsearchService {
  // runtime fields are computed using a Painless script
  // see: https://www.elastic.co/guide/en/elasticsearch/reference/current/runtime-mapping-fields.html
  private runtimeFields: Record<string, string> = {}

  // we're using getters in case the defined languages change over time
  private get lang3() {
    return getLang3FromLang2(this.translateService.currentLang)
  }
  private get metadataLang() {
    return this.injector.get(METADATA_LANGUAGE, null)
  }

  constructor(
    private translateService: TranslateService,
    private injector: Injector
  ) {}

  getSearchRequestBody(
    aggregations: any = {},
    size = 0,
    from = 0,
    sortBy: SortByField = null,
    requestFields: RequestFields = null,
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
      ...(requestFields && { _source: requestFields }),
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

  getMetadataByIdsPayload(uuids: string[]): EsSearchParams {
    return {
      query: {
        ids: {
          values: uuids,
        },
      },
    }
  }

  getRelatedRecordPayload(
    record: CatalogRecord,
    size = 6,
    _source = [...ES_SOURCE_SUMMARY, 'createDate']
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
                  'allKeywords',
                ],
                like: [
                  {
                    doc: {
                      resourceTitleObject: {
                        default: record.title,
                      },
                      resourceAbstractObject: {
                        default: record.abstract,
                      },
                      allKeywords: record.keywords.map(
                        (keyword) => keyword.label
                      ),
                    },
                  },
                ],
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
          must_not: [{ wildcard: { uuid: record.uniqueIdentifier } }],
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
    queryFieldsPriority: EsQueryFieldsPriorityType
  ) {
    const queryLang = this.getQueryLang()
    return Object.keys(queryFieldsPriority).reduce((query, field) => {
      const multiLangRegExp = /\$\{searchLang\}/g
      const isMultilangField = multiLangRegExp.test(field)
      const fieldPriority = queryFieldsPriority[field]
      return [
        ...query,
        ...(this.isCurrentSearchLang() && isMultilangField
          ? [
              `${field.replace(multiLangRegExp, queryLang)}^${
                fieldPriority + 10
              }`,
              field.replace(multiLangRegExp, '*') +
                (fieldPriority > 1 ? `^${fieldPriority}` : ''),
            ]
          : [
              field.replace(multiLangRegExp, queryLang) +
                (fieldPriority > 1 ? `^${fieldPriority}` : ''),
            ]),
      ]
    }, [])
  }

  private getQueryLang(): string {
    if (this.metadataLang) {
      return this.isCurrentSearchLang()
        ? `lang${this.lang3}`
        : `lang${this.metadataLang}`
    } else return '*'
  }
  private isCurrentSearchLang() {
    return this.metadataLang === 'current'
  }

  private filtersToQuery(
    filters: FieldFilters | FiltersAggregationParams | string
  ): FilterQuery {
    const addQuote = (key: string) => (/^\/.+\/$/.test(key) ? key : `"${key}"`)
    const makeQuery = (filter: FieldFilter): string => {
      if (typeof filter === 'string') {
        return filter
      }
      return Object.keys(filter)
        .map((key) => {
          if (filter[key] === true) {
            return addQuote(key)
          }
          return `-${addQuote(key)}`
        })
        .join(' OR ')
    }
    const queryString =
      typeof filters === 'string'
        ? filters
        : Object.keys(filters)
            .filter((fieldname) => !isDateRange(filters[fieldname]))
            .filter(
              (fieldname) =>
                filters[fieldname] &&
                JSON.stringify(filters[fieldname]) !== '{}'
            )
            .map(
              (fieldname) => `${fieldname}:(${makeQuery(filters[fieldname])})`
            )
            .join(' AND ')
    const queryRange = Object.entries(filters)
      .filter(([, value]) => isDateRange(value))
      .map(([searchField, dateRange]) => {
        return {
          searchField,
          dateRange,
        } as {
          searchField: string
          dateRange: DateRange
        }
      })[0]
    const queryParts = [
      queryString && {
        query_string: {
          query: queryString,
        },
      },
      queryRange &&
        queryRange.dateRange && {
          range: {
            [queryRange.searchField]: {
              ...(queryRange.dateRange.start && {
                gte: formatDate(queryRange.dateRange.start),
              }),
              ...(queryRange.dateRange.end && {
                lte: formatDate(queryRange.dateRange.end),
              }),
              format: 'yyyy-MM-dd',
            },
          },
        },
    ].filter(Boolean)
    return queryParts.length > 0 ? (queryParts as FilterQuery) : undefined
  }

  private mustNotFilters(): Record<string, unknown>[] {
    return [
      {
        query_string: {
          query:
            'resourceType:featureCatalog AND !resourceType:dataset AND !cl_level.key:dataset',
        },
      },
    ]
  }

  private buildPayloadQuery(
    { any, ...fieldSearchFilters }: SearchFilters,
    configFilters: SearchFilters,
    uuids?: string[],
    geometry?: Geometry
  ) {
    const must = [] as Record<string, unknown>[]
    const must_not = this.mustNotFilters()
    const should = [] as Record<string, unknown>[]
    const filter = [this.queryFilterOnValues('isTemplate', 'n')] as Record<
      string,
      unknown
    >[]

    if (any) {
      must.push({
        query_string: {
          query: this.escapeSpecialCharacters(any),
          default_operator: 'AND',
          fields: this.injectLangInQueryStringFields(ES_QUERY_FIELDS_PRIORITY),
        },
      })
    }
    const queryFilters = this.filtersToQuery(fieldSearchFilters)
    if (queryFilters) {
      filter.push(...queryFilters)
    }
    if (uuids) {
      filter.push({
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
        filter,
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
                fields: this.injectLangInQueryStringFields({
                  'resourceTitleObject.${searchLang}': 4,
                  'resourceAbstractObject.${searchLang}': 3,
                  tag: 2,
                  resourceIdentifier: 1,
                }),
              },
            },
          ],

          must_not: this.mustNotFilters(),
        },
      },
      _source: ['resourceTitleObject', 'uuid', 'resourceType'],
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
  // FIXME: this is not used anymore
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

  // FIXME: this is not used anymore
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
    const mapToESAggregation = (aggregation: AggregationParams) => {
      switch (aggregation.type) {
        case 'filters':
          return {
            filters: {
              filters: Object.keys(aggregation.filters).reduce((prev, curr) => {
                const filter = aggregation.filters[curr]
                return {
                  ...prev,
                  [curr]: this.filtersToQuery(filter)[0],
                }
              }, {}),
            },
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
