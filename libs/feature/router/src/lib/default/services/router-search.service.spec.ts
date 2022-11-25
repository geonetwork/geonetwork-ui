import { SortByEnum } from '@geonetwork-ui/util/shared'
import { BehaviorSubject } from 'rxjs'
import { RouterSearchService } from './router-search.service'

let state = {}
class SearchFacadeMock {
  searchFilters$ = new BehaviorSubject(state)
  sortBy$ = new BehaviorSubject('_score')
}
class RouterFacadeMock {
  setSearch = jest.fn()
  updateSearch = jest.fn()
}
describe('RouterSearchService', () => {
  let service: RouterSearchService
  let routerFacade: RouterFacadeMock
  let searchFacade: SearchFacadeMock

  beforeEach(() => {
    state = { OrgForResource: { mel: true } }
    routerFacade = new RouterFacadeMock()
    searchFacade = new SearchFacadeMock()
    service = new RouterSearchService(searchFacade as any, routerFacade as any)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  describe('#setSearch', () => {
    it('dispatch setSearch with mapped params', () => {
      const state = {
        any: 'any',
        OrgForResource: {
          Org: true,
        },
      }
      service.setFilters(state)
      expect(routerFacade.setSearch).toHaveBeenCalledWith({
        q: 'any',
        publisher: ['Org'],
        _sort: '_score',
      })
    })
  })

  describe('#setSortAndFilters', () => {
    it('dispatch setSearch with mapped params', () => {
      const filters = {
        any: 'any',
        OrgForResource: {
          Org: true,
        },
      }
      const sort = SortByEnum.CREATE_DATE
      service.setSortAndFilters(filters, sort)
      expect(routerFacade.setSearch).toHaveBeenCalledWith({
        q: 'any',
        publisher: ['Org'],
        _sort: '-createDate',
      })
    })
  })

  describe('#setSortBy', () => {
    it('dispatch sortBy', () => {
      service.setSortBy(SortByEnum.RELEVANCY)
      expect(routerFacade.updateSearch).toHaveBeenCalledWith({
        _sort: SortByEnum.RELEVANCY,
      })
    })
  })

  describe('#updateSearch', () => {
    beforeEach(() => {
      const state = {
        any: 'any',
      }
      service.updateFilters(state)
    })
    it('dispatch updateSearch with merged mapped params', () => {
      expect(routerFacade.updateSearch).toHaveBeenCalledWith({
        q: 'any',
        publisher: ['mel'],
      })
    })
  })
})
