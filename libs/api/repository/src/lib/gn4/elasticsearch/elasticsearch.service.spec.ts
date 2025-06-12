import { ElasticsearchService } from './elasticsearch.service'
import {
  datasetRecordsFixture,
  elasticAggsResponseFixture,
} from '@geonetwork-ui/common/fixtures'
import { EsSearchParams } from '@geonetwork-ui/api/metadata-converter'
import { TestBed } from '@angular/core/testing'
import { METADATA_LANGUAGE } from '../../metadata-language'
import { TranslateService } from '@ngx-translate/core'

class TranslateServiceMock {
  currentLang = 'en'
}

let currentMetadataLang: string

describe('ElasticsearchService', () => {
  let service: ElasticsearchService
  let searchFilters

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TranslateService,
          useClass: TranslateServiceMock,
        },
        {
          provide: METADATA_LANGUAGE,
          useFactory: () => currentMetadataLang,
        },
      ],
    })
    currentMetadataLang = 'fre'
    service = TestBed.inject(ElasticsearchService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#Sort', () => {
    it('One sort and default direction', () => {
      const sort = service['buildPayloadSort'](['asc', '_score'])
      expect(sort).toEqual([{ _score: 'asc' }])
    })

    it('One sort and DESC direction', () => {
      const sort = service['buildPayloadSort'](['desc', 'changeDate'])
      expect(sort).toEqual([{ changeDate: 'desc' }])
    })

    it('Multiple sorts', () => {
      const sort = service['buildPayloadSort']([
        ['asc', '_score'],
        ['desc', 'changeDate'],
      ])
      expect(sort).toEqual([{ _score: 'asc' }, { changeDate: 'desc' }])
    })
  })
  describe('#stateFiltersToQueryString', () => {
    describe('when simple terms', () => {
      beforeEach(() => {
        searchFilters = {
          'tag.default': {
            world: true,
            vector: true,
          },
        }
      })
      it('return OR separated query', () => {
        const query = service.stateFiltersToQueryString(searchFilters)
        expect(query).toBe('(tag.default:"world" tag.default:"vector")')
      })
    })

    describe('when recursive terms', () => {
      beforeEach(() => {
        searchFilters = {
          resourceType: {
            service: {
              serviceType: {
                'OGC:WMS': true,
              },
            },
            dataset: true,
          },
        }
      })
      it('nest sub key with AND operator', () => {
        const query = service.stateFiltersToQueryString(searchFilters)
        expect(query).toBe(
          '((resourceType:"service" AND (serviceType:"OGC:WMS")) resourceType:"dataset")'
        )
      })
    })
  })

  describe('#getSearchRequestBody', () => {
    let payload
    describe('request fields', () => {
      it('includes the _source property if fields are specified', () => {
        payload = service.getSearchRequestBody({}, 4, 0, null, ['uuid', 'tag'])
        expect(payload).toEqual({
          _source: ['uuid', 'tag'],
          from: 0,
          size: 4,
          query: expect.any(Object),
          aggregations: expect.any(Object),
          track_total_hits: true,
        })
      })
      it('does not include the _source property if no field specified', () => {
        payload = service.getSearchRequestBody({}, 4, 0, null, null)
        expect(payload).toEqual({
          from: 0,
          size: 4,
          query: expect.any(Object),
          aggregations: expect.any(Object),
          track_total_hits: true,
        })
      })
    })
    describe('track_total_hits', () => {
      let size = 0
      describe('when size is 0', () => {
        beforeEach(() => {
          payload = service.getSearchRequestBody({}, size)
        })
        it('request body does not contain track_total_hits', () => {
          expect(payload).not.toHaveProperty('track_total_hits')
        })
      })
      describe('when size is not 0', () => {
        beforeEach(() => {
          size = 10
          payload = service.getSearchRequestBody({}, size)
        })
        it('request body contains track_total_hits', () => {
          expect(payload).toHaveProperty('track_total_hits')
          expect(payload.track_total_hits).toBe(true)
        })
      })
    })
  })
  describe('#buildPayloadQuery', () => {
    it('should not add fields query_strings if fieldsSearchFilters Object is empty', () => {
      const query = service['buildPayloadQuery'](
        {
          any: 'hello',
        },
        {},
        ['record-1', 'record-2', 'record-3']
      )

      expect(query).toEqual({
        bool: {
          filter: [
            {
              terms: {
                isTemplate: ['n'],
              },
            },
            {
              ids: {
                values: ['record-1', 'record-2', 'record-3'],
              },
            },
          ],
          should: [],
          must: [
            {
              query_string: {
                default_operator: 'AND',
                fields: [
                  'resourceTitleObject.langfre^5',
                  'tag.langfre^4',
                  'resourceAbstractObject.langfre^3',
                  'lineageObject.langfre^2',
                  'any.langfre',
                  'uuid',
                ],
                query: 'hello',
              },
            },
          ],
          must_not: [
            {
              query_string: {
                query:
                  'resourceType:featureCatalog AND !resourceType:dataset AND !cl_level.key:dataset',
              },
            },
          ],
        },
      })
    })
    it('add any, other fields query_strings and date range and limit search payload by ids', () => {
      const query = service['buildPayloadQuery'](
        {
          Org: {
            world: true,
          },
          someDate: {
            start: new Date('2020-01-01'),
            end: new Date('2020-12-31'),
          },
          any: 'hello',
        },
        {},
        ['record-1', 'record-2', 'record-3']
      )
      expect(query).toEqual({
        bool: {
          filter: [
            {
              terms: {
                isTemplate: ['n'],
              },
            },
            {
              query_string: {
                query: 'Org:("world")',
              },
            },
            {
              range: {
                someDate: {
                  gte: '2020-01-01',
                  lte: '2020-12-31',
                  format: 'yyyy-MM-dd',
                },
              },
            },
            {
              ids: {
                values: ['record-1', 'record-2', 'record-3'],
              },
            },
          ],
          should: [],
          must: [
            {
              query_string: {
                default_operator: 'AND',
                fields: [
                  'resourceTitleObject.langfre^5',
                  'tag.langfre^4',
                  'resourceAbstractObject.langfre^3',
                  'lineageObject.langfre^2',
                  'any.langfre',
                  'uuid',
                ],
                query: 'hello',
              },
            },
          ],
          must_not: [
            {
              query_string: {
                query:
                  'resourceType:featureCatalog AND !resourceType:dataset AND !cl_level.key:dataset',
              },
            },
          ],
        },
      })
    })
    it('handles date range object with start only, and limit search payload by ids', () => {
      const query = service['buildPayloadQuery'](
        {
          Org: {
            world: true,
          },
          otherDate: {
            start: new Date('2021-03-03'),
          },
          any: 'hello',
        },
        {},
        ['record-1', 'record-2', 'record-3']
      )
      expect(query).toEqual({
        bool: {
          filter: [
            {
              terms: {
                isTemplate: ['n'],
              },
            },
            {
              query_string: {
                query: 'Org:("world")',
              },
            },
            {
              range: {
                otherDate: {
                  gte: '2021-03-03',
                  format: 'yyyy-MM-dd',
                },
              },
            },
            {
              ids: {
                values: ['record-1', 'record-2', 'record-3'],
              },
            },
          ],
          should: [],
          must: [
            {
              query_string: {
                default_operator: 'AND',
                fields: [
                  'resourceTitleObject.langfre^5',
                  'tag.langfre^4',
                  'resourceAbstractObject.langfre^3',
                  'lineageObject.langfre^2',
                  'any.langfre',
                  'uuid',
                ],
                query: 'hello',
              },
            },
          ],
          must_not: [
            {
              query_string: {
                query:
                  'resourceType:featureCatalog AND !resourceType:dataset AND !cl_level.key:dataset',
              },
            },
          ],
        },
      })
    })
    it('add any and other fields query_strings and limit search payload by ids (also if id array is empty)', () => {
      const query = service['buildPayloadQuery'](
        {
          Org: {
            world: true,
            world2: true,
          },
          name: {
            john: true,
          },
          any: 'hello',
        },
        {},
        []
      )
      expect(query).toEqual({
        bool: {
          filter: [
            {
              terms: {
                isTemplate: ['n'],
              },
            },
            {
              query_string: {
                query: 'Org:("world" OR "world2") AND name:("john")',
              },
            },
            {
              ids: {
                values: [],
              },
            },
          ],
          should: [],
          must: [
            {
              query_string: {
                default_operator: 'AND',
                fields: [
                  'resourceTitleObject.langfre^5',
                  'tag.langfre^4',
                  'resourceAbstractObject.langfre^3',
                  'lineageObject.langfre^2',
                  'any.langfre',
                  'uuid',
                ],
                query: 'hello',
              },
            },
          ],
          must_not: [
            {
              query_string: {
                query:
                  'resourceType:featureCatalog AND !resourceType:dataset AND !cl_level.key:dataset',
              },
            },
          ],
        },
      })
    })
    it('handle negative and empty filters', () => {
      const query = service['buildPayloadQuery'](
        {
          Org: {
            world: false,
          },
          name: {},
          message: '',
        },
        {},
        []
      )
      expect(query).toEqual({
        bool: {
          filter: [
            {
              terms: {
                isTemplate: ['n'],
              },
            },
            {
              query_string: {
                query: 'Org:(-"world")',
              },
            },
            {
              ids: {
                values: [],
              },
            },
          ],
          should: [],
          must: [],
          must_not: [
            {
              query_string: {
                query:
                  'resourceType:featureCatalog AND !resourceType:dataset AND !cl_level.key:dataset',
              },
            },
          ],
        },
      })
    })
    it('handle filters expressed as queries', () => {
      const query = service['buildPayloadQuery'](
        {
          Org: 'world AND world2',
          any: 'hello',
        },
        {},
        []
      )
      expect(query).toEqual({
        bool: {
          filter: [
            {
              terms: {
                isTemplate: ['n'],
              },
            },
            {
              query_string: {
                query: 'Org:(world AND world2)',
              },
            },
            {
              ids: {
                values: [],
              },
            },
          ],
          should: [],
          must: [
            {
              query_string: {
                default_operator: 'AND',
                fields: [
                  'resourceTitleObject.langfre^5',
                  'tag.langfre^4',
                  'resourceAbstractObject.langfre^3',
                  'lineageObject.langfre^2',
                  'any.langfre',
                  'uuid',
                ],
                query: 'hello',
              },
            },
          ],
          must_not: [
            {
              query_string: {
                query:
                  'resourceType:featureCatalog AND !resourceType:dataset AND !cl_level.key:dataset',
              },
            },
          ],
        },
      })
    })
    it('handle values expressed as reg exp', () => {
      const query = service['buildPayloadQuery'](
        {
          Org: {
            '/world.*/': true,
            '/*country^[fr|en]/': false,
          },
        },
        {},
        []
      )
      expect(query).toMatchObject({
        bool: {
          filter: [
            {
              terms: {
                isTemplate: ['n'],
              },
            },
            {
              query_string: {
                query: 'Org:(/world.*/ OR -/*country^[fr|en]/)',
              },
            },
            {
              ids: { values: [] },
            },
          ],
        },
      })
    })
    describe('any has special characters', () => {
      let query
      beforeEach(() => {
        const any = 'scot (){?[ / test'
        query = service['buildPayloadQuery'](
          {
            any,
          },
          {}
        )
      })
      it('escapes special char', () => {
        expect(query.bool.must[0].query_string.query).toEqual(
          `scot \\(\\)\\{\\?\\[ \\/ test`
        )
      })
    })
    describe('specify an input polygon geometry', () => {
      let geojsonPolygon
      beforeEach(() => {
        geojsonPolygon = {
          coordinates: [
            [
              [3.017921158755172, 50.65759907920972],
              [3.017921158755172, 50.613483610573155],
              [3.1098886148436122, 50.613483610573155],
              [3.017921158755172, 50.65759907920972],
            ],
          ],
          type: 'Polygon',
        }
      })
      it('adds boosting of 7 for intersecting with it and boosting of 10 on geoms within', () => {
        const query = service['buildPayloadQuery'](
          {
            Org: 'world',
            any: 'hello',
          },
          {},
          undefined,
          geojsonPolygon
        )
        expect(query).toEqual({
          bool: {
            filter: [
              {
                terms: {
                  isTemplate: ['n'],
                },
              },
              {
                query_string: {
                  query: 'Org:(world)',
                },
              },
            ],
            must: [
              {
                query_string: {
                  default_operator: 'AND',
                  fields: [
                    'resourceTitleObject.langfre^5',
                    'tag.langfre^4',
                    'resourceAbstractObject.langfre^3',
                    'lineageObject.langfre^2',
                    'any.langfre',
                    'uuid',
                  ],
                  query: 'hello',
                },
              },
            ],
            must_not: [
              {
                query_string: {
                  query:
                    'resourceType:featureCatalog AND !resourceType:dataset AND !cl_level.key:dataset',
                },
              },
            ],
            should: [
              {
                geo_shape: {
                  geom: {
                    shape: geojsonPolygon,
                    relation: 'within',
                  },
                  boost: 10.0,
                },
              },
              {
                geo_shape: {
                  geom: {
                    shape: geojsonPolygon,
                    relation: 'intersects',
                  },
                  boost: 7.0,
                },
              },
            ],
          },
        })
      })
    })
  })

  describe('#injectLangInQueryStringFields - Search language', () => {
    let queryStringFields: Record<string, number> = {
      'resourceTitleObject.${searchLang}': 1,
    }
    describe('When no lang from config', () => {
      beforeEach(() => {
        currentMetadataLang = undefined
      })
      it('use * wildcard', () => {
        expect(
          service['injectLangInQueryStringFields'](queryStringFields)[0].split(
            '.'
          )[1]
        ).toEqual('*')
      })
    })
    describe('When one lang in config', () => {
      beforeEach(() => {
        currentMetadataLang = 'fre'
      })
      it('search in the config language', () => {
        expect(
          service['injectLangInQueryStringFields'](queryStringFields)[0].split(
            '.'
          )[1]
        ).toEqual('langfre')
      })
    })
    describe('When "current" language from config"', () => {
      beforeEach(() => {
        currentMetadataLang = 'current'
      })
      it('search in the UI language', () => {
        expect(
          service['injectLangInQueryStringFields'](queryStringFields)[0].split(
            '.'
          )[1]
        ).toEqual('langeng^11')
      })
      it('add * fallback with low priority', () => {
        queryStringFields = {
          'resourceTitleObject.${searchLang}': 5,
          'tag.${searchLang}': 4,
          'resourceAbstractObject.${searchLang}': 3,
          'lineageObject.${searchLang}': 2,
          'any.${searchLang}': 1,
          uuid: 1,
        }
        expect(
          service['injectLangInQueryStringFields'](queryStringFields)
        ).toEqual([
          'resourceTitleObject.langeng^15',
          'resourceTitleObject.*^5',
          'tag.langeng^14',
          'tag.*^4',
          'resourceAbstractObject.langeng^13',
          'resourceAbstractObject.*^3',
          'lineageObject.langeng^12',
          'lineageObject.*^2',
          'any.langeng^11',
          'any.*',
          'uuid',
        ])
      })
    })
  })

  describe('#buildAutocompletePayload', () => {
    describe('given an autocomplete config', () => {
      it('returns the search payload', () => {
        const payload = service.buildAutocompletePayload('blarg')
        expect(payload).toEqual({
          _source: ['resourceTitleObject', 'uuid', 'resourceType'],

          query: {
            bool: {
              must: [
                {
                  terms: {
                    isTemplate: ['n'],
                  },
                },
                {
                  multi_match: {
                    fields: [
                      'resourceTitleObject.langfre^4',
                      'resourceAbstractObject.langfre^3',
                      'tag^2',
                      'resourceIdentifier',
                    ],
                    query: 'blarg',
                    type: 'bool_prefix',
                  },
                },
              ],
              must_not: [
                {
                  query_string: {
                    query:
                      'resourceType:featureCatalog AND !resourceType:dataset AND !cl_level.key:dataset',
                  },
                },
              ],
            },
          },

          from: 0,
          size: 20,
        })
      })
    })
  })

  describe('#getMetadataByIdsPayload', () => {
    let uuid, payload
    beforeEach(() => {
      uuid = '132132132132321'
      payload = service.getMetadataByIdsPayload([uuid])
    })
    it('returns ES payload', () => {
      expect(payload).toEqual({
        query: {
          ids: {
            values: [uuid],
          },
        },
      })
    })
  })

  describe('#getRelatedRecordPayload', () => {
    const record = datasetRecordsFixture()[0]
    let payload
    beforeEach(() => {
      payload = service.getRelatedRecordPayload(record, 4)
    })
    it('returns ES payload', () => {
      expect(payload).toEqual({
        _source: [
          'uuid',
          'id',
          'title',
          'resource*',
          'resourceTitleObject',
          'resourceAbstractObject',
          'overview',
          'logo',
          'codelist_status_text',
          'link',
          'linkProtocol',
          'contactForResource.organisation',
          'contact.organisation',
          'contact.email',
          'userSavedCount',
          'updateFrequency',
          'cl_topic',
          'cl_maintenanceAndUpdateFrequency',
          'tag',
          'MD_LegalConstraints*Object',
          'qualityScore',
          'allKeywords',
          'recordLink',
          'createDate',
        ],
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
                          default:
                            'A very interesting dataset (un jeu de données très intéressant)',
                        },
                        resourceAbstractObject: {
                          default: `# Introduction
This dataset has been established for testing purposes.

## Details
This is a section about details. Here is an HTML tag: <img src="http://google.com" />. And [a link](https://google.com).

## Informations intéressantes
Cette section contient des *caractères internationaux* (ainsi que des "caractères spéciaux"). 'çàü^@/~^&`,
                        },
                        allKeywords: [
                          'international',
                          'test',
                          '_another_keyword_',
                        ],
                      },
                    },
                  ],
                  max_query_terms: 12,
                  min_term_freq: 1,
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
            must_not: [{ wildcard: { uuid: 'my-dataset-001' } }],
          },
        },
        size: 4,
      })
    })
  })

  describe('#queryFilterOnValues', () => {
    let payload
    it('when array of templates', () => {
      payload = service.queryFilterOnValues('isTemplate', ['n', 's'])
      expect(payload).toEqual({
        terms: {
          isTemplate: ['n', 's'],
        },
      })
    })
    it('when single template', () => {
      payload = service.queryFilterOnValues('isTemplate', 'n')
      expect(payload).toEqual({
        terms: {
          isTemplate: ['n'],
        },
      })
    })
    it('when undefined', () => {
      payload = service.queryFilterOnValues('isTemplate', undefined)
      expect(payload).toEqual({})
    })
    it('when empty array', () => {
      payload = service.queryFilterOnValues('isTemplate', [])
      expect(payload).toEqual({})
    })
  })

  describe('#registerRuntimeField', () => {
    let query: EsSearchParams
    beforeEach(() => {
      service.registerRuntimeField('myField', 'emit("hello world!")')
    })
    describe('when a runtime field is used in an aggregation', () => {
      beforeEach(() => {
        query = service.getSearchRequestBody({
          anAggregation: {
            type: 'terms',
            limit: 100,
            field: 'myField',
            sort: ['asc', 'count'],
          },
        })
      })
      it('includes the field as a runtime mapping', () => {
        expect(query.runtime_mappings).toEqual({
          myField: {
            script: 'emit("hello world!")',
            type: 'keyword',
          },
        })
      })
    })
    describe('when a runtime field is used in a query string', () => {
      beforeEach(() => {
        query = service.getSearchRequestBody(
          undefined,
          10,
          0,
          null,
          undefined,
          {
            any: 'hello',
            myField: { check: true },
          }
        )
      })
      it('includes the field as a runtime mapping', () => {
        expect(query.runtime_mappings).toEqual({
          myField: {
            script: 'emit("hello world!")',
            type: 'keyword',
          },
        })
      })
    })
    describe('when a runtime field is used for sorting', () => {
      beforeEach(() => {
        query = service.getSearchRequestBody(undefined, 10, 0, [
          'asc',
          'myField',
        ])
      })
      it('includes the field as a runtime mapping', () => {
        expect(query.runtime_mappings).toEqual({
          myField: {
            script: 'emit("hello world!")',
            type: 'keyword',
          },
        })
      })
    })
    describe('when a runtime field is not used', () => {
      beforeEach(() => {
        query = service.getSearchRequestBody(
          {
            otherAgg: {
              type: 'terms',
              limit: 100,
              field: 'otherField',
              sort: ['desc', 'key'],
            },
            myField: {
              type: 'terms',
              limit: 10,
              field: 'notARuntimeField',
              sort: ['desc', 'key'],
            },
          },
          10,
          0,
          null,
          undefined,
          {
            any: 'hello',
            otherField: 'check',
          }
        )
      })
      it('does not include the field in the query', () => {
        expect(query.runtime_mappings).toBeUndefined()
      })
    })
  })

  describe('#buildAggregationsPayload', () => {
    it('transforms to ES syntax', () => {
      expect(
        service.buildAggregationsPayload({
          myTerm: {
            type: 'terms',
            sort: ['asc', 'key'],
            field: 'field2',
            limit: 30,
            filter: 'field1 < 100',
          },
          myFilters: {
            type: 'filters',
            filters: {
              filter1: { field1: '100' },
              filter2: { field2: { value1: true, value3: true } },
              filter3: 'my own query',
            },
          },
          myHistogram: {
            type: 'histogram',
            field: 'field3',
            interval: 100,
          },
        })
      ).toStrictEqual({
        myFilters: {
          filters: {
            filters: {
              filter1: {
                query_string: { query: 'field1:(100)' },
              },
              filter2: {
                query_string: { query: 'field2:("value1" OR "value3")' },
              },
              filter3: {
                query_string: { query: 'my own query' },
              },
            },
          },
        },
        myHistogram: {
          histogram: {
            field: 'field3',
            interval: 100,
          },
        },
        myTerm: {
          terms: {
            field: 'field2',
            order: {
              _key: 'asc',
            },
            size: 30,
          },
        },
      })
    })
  })

  describe('#parseAggregationResult', () => {
    describe('terms aggregation', () => {
      it('parses the result', () => {
        expect(
          service.parseAggregationResult(
            elasticAggsResponseFixture()['tag.default'],
            {
              type: 'terms',
            } as any
          )
        ).toStrictEqual({
          buckets: [
            {
              count: 20,
              term: 'Hungary',
            },
            {
              count: 3,
              term: 'Austria',
            },
            {
              count: 8,
              term: 'Belgium',
            },
            {
              count: 2,
              term: 'Bulgaria',
            },
            {
              count: 15,
              term: 'Croatia',
            },
            {
              count: 5,
              term: 'Cyprus',
            },
          ],
        })
      })
    })
    describe('filters aggregation', () => {
      it('parses the result', () => {
        expect(
          service.parseAggregationResult(
            elasticAggsResponseFixture()['availableInServices'],
            { type: 'filters' } as any
          )
        ).toStrictEqual({
          buckets: [
            {
              count: 0,
              term: 'availableInDownloadService',
            },
            {
              count: 299,
              term: 'availableInViewService',
            },
          ],
        })
      })
    })
    describe('histogram aggregation', () => {
      const expectedHistogram = {
        buckets: [
          {
            count: 2,
            highValue: 10000,
            lowValue: 0,
          },
          {
            count: 291,
            highValue: 20000,
            lowValue: 10000,
          },
          {
            count: 1,
            highValue: 50000,
            lowValue: 20000,
          },
          {
            count: 9,
            highValue: 100000,
            lowValue: 50000,
          },
          {
            count: 135,
            highValue: 250000,
            lowValue: 100000,
          },
          {
            count: 54,
            highValue: 1000000,
            lowValue: 250000,
          },
          {
            count: 55,
            highValue: 2000000,
            lowValue: 1000000,
          },
          {
            count: 3,
            highValue: 3000000,
            lowValue: 2000000,
          },
          {
            count: 10,
            highValue: 10000000,
            lowValue: 3000000,
          },
          {
            count: 93,
            highValue: 20000000,
            lowValue: 10000000,
          },
          {
            count: 9,
            highValue: 60000000,
            lowValue: 20000000,
          },
        ],
      }
      it('parses the result (keyed)', () => {
        expect(
          service.parseAggregationResult(
            elasticAggsResponseFixture()['resolutionScaleDenominator'],
            { type: 'histogram' } as any
          )
        ).toStrictEqual(expectedHistogram)
      })
      it('parses the result (ordered array)', () => {
        expect(
          service.parseAggregationResult(
            elasticAggsResponseFixture()['resolutionScaleDenominatorArray'],
            { type: 'histogram' } as any
          )
        ).toStrictEqual(expectedHistogram)
      })
    })
  })
})
