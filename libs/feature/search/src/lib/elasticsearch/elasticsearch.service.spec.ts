import { ElasticsearchService } from './elasticsearch.service'
import { Observable } from 'rxjs'
import { BootstrapService } from '@geonetwork-ui/util/shared'
import { DEFAULT_SEARCH_KEY } from '../state/actions'
import { initialState } from '../state/reducer'

const initialStateSearch = initialState[DEFAULT_SEARCH_KEY]

let autocompleteConfig

class MockBootstrapService {
  uiConfReady(uiIdentifier: string): Observable<any> {
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
  let state

  beforeEach(() => {
    service = new ElasticsearchService(
      new MockBootstrapService() as BootstrapService
    )
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#Sort', () => {
    it('One sort and default direction', () => {
      const sort = service['buildPayloadSort']({
        ...initialStateSearch,
        params: {
          filters: {
            any: '',
          },
          sortBy: '_score',
        },
      })
      expect(sort).toEqual(['_score'])
    })

    it('One sort and DESC direction', () => {
      const sort = service['buildPayloadSort']({
        ...initialStateSearch,
        params: {
          filters: {
            any: '',
          },
          sortBy: '-changeDate',
        },
      })
      expect(sort).toEqual([{ changeDate: 'desc' }])
    })

    it('Multiple sorts', () => {
      const sort = service['buildPayloadSort']({
        ...initialStateSearch,
        params: {
          filters: {
            any: '',
          },
          sortBy: '_score,-changeDate',
        },
      })
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
    it('return OR separated query', () => {
      const sort = service['buildPayloadQuery']({
        ...initialStateSearch,
        params: {
          filters: {
            'tag.default': {
              world: true,
              vector: true,
            },
            any: '',
          },
        },
      })
      expect(sort).toEqual({
        bool: {
          filter: [],
          must: [
            {
              query_string: {
                query: '(*) AND (tag.default:"world" tag.default:"vector")',
              },
            },
          ],
        },
      })
    })
  })

  describe('#buildPayloadFilter', () => {
    describe('when elastic object config', () => {
      beforeEach(() => {
        state = {
          ...initialStateSearch,
          config: {
            filters: {
              elastic: { term: { 'cl_hierarchyLevel.key': 'service' } },
            },
          },
        }
      })
      it('returns the input config', () => {
        const filter = service['buildPayloadFilter'](state)
        expect(filter).toEqual([
          { term: { 'cl_hierarchyLevel.key': 'service' } },
        ])
      })
    })
    describe('when elastic array config', () => {
      beforeEach(() => {
        state = {
          ...initialStateSearch,
          config: {
            filters: {
              elastic: [{ term: { 'cl_hierarchyLevel.key': 'service' } }],
            },
          },
        }
      })
      it('returns the input config', () => {
        const filter = service['buildPayloadFilter'](state)
        expect(filter).toEqual([
          { term: { 'cl_hierarchyLevel.key': 'service' } },
        ])
      })
    })
    describe('when custom config', () => {
      beforeEach(() => {
        state = {
          ...initialStateSearch,
          config: {
            filters: {
              custom: {
                'cl_hierarchyLevel.key': {
                  service: true,
                },
              },
            },
          },
        }
      })
      it('returns the corresponding query_string', () => {
        const filter = service['buildPayloadFilter'](state)
        expect(filter).toEqual([
          { query_string: { query: '(cl_hierarchyLevel.key:"service")' } },
        ])
      })
    })
    describe('when having both config', () => {
      beforeEach(() => {
        state = {
          ...initialStateSearch,
          config: {
            filters: {
              elastic: [{ term: { 'cl_hierarchyLevel.key': 'service' } }],
              custom: {
                'cl_hierarchyLevel.key': {
                  service: true,
                },
              },
            },
          },
        }
      })
      it('elastic config priors', () => {
        const filter = service['buildPayloadFilter'](state)
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
          query: {
            bool: {
              must: [
                {
                  multi_match: {
                    query: 'blarg',
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
})
