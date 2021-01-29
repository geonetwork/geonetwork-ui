import {
  DEFAULT_SEARCH_KEY,
  ElasticsearchService,
  initialState,
} from '@lib/search'

const initialStateSearch = initialState[DEFAULT_SEARCH_KEY]

describe('ElasticsearchService', () => {
  let service: ElasticsearchService
  let searchFilters

  beforeEach(() => {
    service = new ElasticsearchService()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#Sort', () => {
    it('One sort and default direction', () => {
      const body = service.buildPayload({
        ...initialStateSearch,
        params: {
          filters: {
            any: '',
          },
          sortBy: '_score',
        },
      })
      expect(body.sort).toEqual(['_score'])
    })

    it('One sort and DESC direction', () => {
      const body = service.buildPayload({
        ...initialStateSearch,
        params: {
          filters: {
            any: '',
          },
          sortBy: '-changeDate',
        },
      })
      expect(body.sort).toEqual([{ changeDate: 'desc' }])
    })

    it('Multiple sorts', () => {
      const body = service.buildPayload({
        ...initialStateSearch,
        params: {
          filters: {
            any: '',
          },
          sortBy: '_score,-changeDate',
        },
      })
      expect(body.sort).toEqual(['_score', { changeDate: 'desc' }])
    })
  })
  describe('#facetsToLuceneQuery', () => {
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
        const query = service.facetsToLuceneQuery(searchFilters)
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
        const query = service.facetsToLuceneQuery(searchFilters)
        expect(query).toBe(
          '((resourceType:"service" AND (serviceType:"OGC:WMS")) resourceType:"dataset")'
        )
      })
    })
  })
})
