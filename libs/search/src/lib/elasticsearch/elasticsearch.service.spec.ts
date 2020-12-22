import { ElasticsearchService } from '@lib/search'

describe('ElasticsearchService', () => {
  let service: ElasticsearchService
  let searchFilters

  beforeEach(() => {
    service = new ElasticsearchService()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
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
