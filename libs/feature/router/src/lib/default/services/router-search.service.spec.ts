import { BehaviorSubject } from 'rxjs'
import { RouterSearchService } from './router-search.service'

const state = { Org: { mel: true } }
const searchFacadeMock: any = {
  searchFilters$: new BehaviorSubject(state),
}
const routerFacadeMock: any = {
  setSearch: jest.fn(),
  updateSearch: jest.fn(),
}
describe('RouterSearchService', () => {
  let service: RouterSearchService

  beforeEach(() => {
    service = new RouterSearchService(searchFacadeMock, routerFacadeMock)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  describe('#setSearch', () => {
    it('dispatch setSearch with mapped params', () => {
      const state = {
        any: 'any',
        Org: {
          Org: true,
        },
      }
      service.setSearch(state)
      expect(routerFacadeMock.setSearch).toHaveBeenCalledWith({
        q: 'any',
        publisher: 'Org',
      })
    })
  })

  describe('#updateSearch', () => {
    beforeEach(() => {
      const state = {
        any: 'any',
      }
      service.updateSearch(state)
    })
    it('dispatch updateSearch with merged mapped params', () => {
      expect(routerFacadeMock.updateSearch).toHaveBeenCalledWith({
        q: 'any',
        publisher: 'mel',
      })
    })
  })
})
