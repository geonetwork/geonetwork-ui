import { ElasticsearchService } from './elasticsearch.service'
import { Observable } from 'rxjs'
import { ES_QUERY_STRING_FIELDS } from './constant'

let autocompleteConfig

class MockBootstrapService {
  uiConfReady(): Observable<any> {
    return new Observable((observer) => {
      observer.next({
        mods: {
          search: {
            autocompleteConfig,
          },
        },
      })
      observer.complete()
    })
  }
}

describe('ElasticsearchService', () => {
  let service: ElasticsearchService
  let searchFilters

  beforeEach(() => {
    service = new ElasticsearchService(new MockBootstrapService() as any)
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

  describe('#buildPayloadQuery', () => {
    it('return AND separated query', () => {
      const query = service['buildPayloadQuery'](
        {
          'tag.default': {
            world: true,
            vector: true,
          },
          any: '',
        },
        {}
      )
      expect(query).toEqual({
        bool: {
          filter: [],
          must: [
            {
              query_string: {
                fields: ES_QUERY_STRING_FIELDS,
                query: '(*) AND (tag.default:"world" tag.default:"vector")',
              },
            },
            {
              terms: {
                isTemplate: ['n'],
              },
            },
          ],
        },
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
      beforeEach(() => {
        autocompleteConfig = {
          query: {
            bool: {
              must: [
                {
                  multi_match: {
                    query: '',
                    type: 'bool_prefix',
                    fields: [
                      'resourceTitleObject.*',
                      'resourceAbstractObject.*',
                      'tag',
                      'resourceIdentifier',
                    ],
                  },
                },
                {
                  terms: {
                    isTemplate: ['n'],
                  },
                },
              ],
            },
          },
          _source: ['uuid', 'id', 'title', 'resourceTitleObject'],
        }
      })
      it('returns the search payload', async () => {
        const payload = await service
          .buildAutocompletePayload('blarg')
          .toPromise()
        expect(payload).toEqual({
          _source: ['id', 'title', 'resourceTitleObject', 'uuid'],
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
                      'resourceTitleObject.*',
                      'resourceAbstractObject.*',
                      'tag',
                      'resourceIdentifier',
                    ],
                    query: 'blarg',
                    type: 'bool_prefix',
                  },
                },
                {
                  terms: {
                    isTemplate: ['n'],
                  },
                },
              ],
            },
          },
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

  describe('#addTemplateClause', () => {
    let payload
    it('when array of templates', () => {
      payload = service.addTemplateClause(['n', 's'])
      expect(payload).toEqual({
        terms: {
          isTemplate: ['n', 's'],
        },
      })
    })
    it('when single template', () => {
      payload = service.addTemplateClause('n')
      expect(payload).toEqual({
        terms: {
          isTemplate: ['n'],
        },
      })
    })
    it('when undefined', () => {
      payload = service.addTemplateClause(undefined)
      expect(payload).toEqual({})
    })
    it('when empty array', () => {
      payload = service.addTemplateClause([])
      expect(payload).toEqual({})
    })
  })
})
