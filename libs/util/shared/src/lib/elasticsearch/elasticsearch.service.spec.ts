import { ElasticsearchService } from './elasticsearch.service'
import { EsSearchParams } from '../models'

describe('ElasticsearchService', () => {
  let service: ElasticsearchService
  let searchFilters

  beforeEach(() => {
    service = new ElasticsearchService('fre')
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#Sort', () => {
    it('One sort and default direction', () => {
      const sort = service['buildPayloadSort']('_score')
      expect(sort).toEqual(['_score'])
    })

    it('One sort and DESC direction', () => {
      const sort = service['buildPayloadSort']('-changeDate')
      expect(sort).toEqual([{ changeDate: 'desc' }])
    })

    it('Multiple sorts', () => {
      const sort = service['buildPayloadSort']('_score,-changeDate')
      expect(sort).toEqual(['_score', { changeDate: 'desc' }])
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
    describe('#track_total_hits', () => {
      let size = 0
      let payload
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
    it('add any and other fields query_strings', () => {
      const query = service['buildPayloadQuery'](
        {
          Org: {
            world: true,
          },
          any: 'hello',
        },
        {}
      )
      expect(query).toEqual({
        bool: {
          filter: [],
          should: [],
          must: [
            {
              terms: {
                isTemplate: ['n'],
              },
            },
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
            {
              query_string: {
                query: '(Org:"world")',
              },
            },
          ],
          must_not: {
            terms: {
              resourceType: ['service', 'map', 'map/static', 'mapDigital'],
            },
          },
        },
      })
    })
    it('add any and other fields query_strings and limit search payload by ids', () => {
      const query = service['buildPayloadQuery'](
        {
          Org: {
            world: true,
          },
          any: 'hello',
        },
        {},
        ['record-1', 'record-2', 'record-3']
      )
      expect(query).toEqual({
        bool: {
          filter: [],
          should: [],
          must: [
            {
              terms: {
                isTemplate: ['n'],
              },
            },
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
            {
              query_string: {
                query: '(Org:"world")',
              },
            },
            {
              ids: {
                values: ['record-1', 'record-2', 'record-3'],
              },
            },
          ],
          must_not: {
            terms: {
              resourceType: ['service', 'map', 'map/static', 'mapDigital'],
            },
          },
        },
      })
    })
    it('add any and other fields query_strings and limit search payload by ids (also if id array is empty)', () => {
      const query = service['buildPayloadQuery'](
        {
          Org: {
            world: true,
          },
          any: 'hello',
        },
        {},
        []
      )
      expect(query).toEqual({
        bool: {
          filter: [],
          should: [],
          must: [
            {
              terms: {
                isTemplate: ['n'],
              },
            },
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
            {
              query_string: {
                query: '(Org:"world")',
              },
            },
            {
              ids: {
                values: [],
              },
            },
          ],
          must_not: {
            terms: {
              resourceType: ['service', 'map', 'map/static', 'mapDigital'],
            },
          },
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
        expect(query.bool.must[1].query_string.query).toEqual(
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
            Org: {
              world: true,
            },
            any: 'hello',
          },
          {},
          undefined,
          geojsonPolygon
        )
        expect(query).toEqual({
          bool: {
            filter: [],
            must: [
              {
                terms: {
                  isTemplate: ['n'],
                },
              },
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
              {
                query_string: {
                  query: '(Org:"world")',
                },
              },
            ],
            must_not: {
              terms: {
                resourceType: ['service', 'map', 'map/static', 'mapDigital'],
              },
            },
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

  describe('#buildPayloadFilter', () => {
    describe('when elastic object config', () => {
      it('returns the input config', () => {
        const filter = service['buildPayloadFilter']({
          elastic: { term: { 'cl_hierarchyLevel.key': 'service' } },
        })
        expect(filter).toEqual([
          { term: { 'cl_hierarchyLevel.key': 'service' } },
        ])
      })
    })
    describe('when elastic array config', () => {
      it('returns the input config', () => {
        const filter = service['buildPayloadFilter']({
          elastic: [{ term: { 'cl_hierarchyLevel.key': 'service' } }],
        })
        expect(filter).toEqual([
          { term: { 'cl_hierarchyLevel.key': 'service' } },
        ])
      })
    })
    describe('when custom config', () => {
      it('returns the corresponding query_string', () => {
        const filter = service['buildPayloadFilter']({
          custom: {
            'cl_hierarchyLevel.key': {
              service: true,
            },
          },
        })
        expect(filter).toEqual([
          { query_string: { query: '(cl_hierarchyLevel.key:"service")' } },
        ])
      })
    })
    describe('when having both config', () => {
      it('elastic config priors', () => {
        const filter = service['buildPayloadFilter']({
          elastic: [{ term: { 'cl_hierarchyLevel.key': 'service' } }],
          custom: {
            'cl_hierarchyLevel.key': {
              service: true,
            },
          },
        })
        expect(filter).toEqual([
          { term: { 'cl_hierarchyLevel.key': 'service' } },
        ])
      })
    })
  })

  describe('#buildAutocompletePayload', () => {
    describe('given an autocomplete config', () => {
      it('returns the search payload', () => {
        const payload = service.buildAutocompletePayload('blarg')
        expect(payload).toEqual({
          _source: ['resourceTitleObject', 'uuid'],
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
                      'resourceTitleObject.langfre',
                      'resourceAbstractObject.langfre',
                      'tag',
                      'resourceIdentifier',
                    ],
                    query: 'blarg',
                    type: 'bool_prefix',
                  },
                },
              ],
              must_not: {
                terms: {
                  resourceType: ['service', 'map', 'map/static', 'mapDigital'],
                },
              },
            },
          },
          from: 0,
          size: 20,
        })
      })
    })
  })

  describe('#getMetadataByIdPayload', () => {
    let uuid, payload
    beforeEach(() => {
      uuid = '132132132132321'
      payload = service.getMetadataByIdPayload(uuid)
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
    let payload
    beforeEach(() => {
      payload = service.getRelatedRecordPayload('record title', 'some-uuid', 4)
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
          'linkProtocol',
          'contactForResource.organisation',
          'contact.organisation',
          'userSavedCount',
          'cl_status.default',
        ],
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
                  like: 'record title',
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
            must_not: [{ wildcard: { uuid: 'some-uuid' } }],
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
            terms: {
              size: 100,
              field: 'myField',
            },
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
        query = service.getSearchRequestBody(undefined, 10, 0, '', undefined, {
          any: 'hello',
          myField: { check: true },
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
    describe('when a runtime field is used for sorting', () => {
      beforeEach(() => {
        query = service.getSearchRequestBody(undefined, 10, 0, 'myField')
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
              terms: {
                size: 100,
                field: 'otherField',
              },
            },
            myField: {
              terms: {
                size: 10,
                field: 'notARuntimeField',
              },
            },
          },
          10,
          0,
          '',
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
})
