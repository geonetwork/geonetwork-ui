import { SortByEnum } from '@geonetwork-ui/common/domain/model/search'
import { BehaviorSubject } from 'rxjs'
import { SearchService } from './search.service'

const state = { Org: 'mel' }
const facadeMock: any = {
  setFilters: jest.fn(),
  setSortBy: jest.fn(),
  searchFilters$: new BehaviorSubject(state),
}
describe('SearchService', () => {
  let service: SearchService

  beforeEach(() => {
    service = new SearchService(facadeMock)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#setSearch', () => {
    it('dispatch setFilter', () => {
      const p = {
        any: 'any',
      }
      service.setFilters(p)
      expect(facadeMock.setFilters).toHaveBeenCalledWith(p)
    })
  })

  describe('#setSortBy', () => {
    it('dispatch sortBy', () => {
      service.setSortBy(SortByEnum.RELEVANCY)
      expect(facadeMock.setSortBy).toHaveBeenCalledWith(SortByEnum.RELEVANCY)
    })
  })

  describe('#setSortAndFilters', () => {
    const filters = {
      any: 'any',
    }
    beforeEach(() => {
      service.setSortAndFilters(filters, SortByEnum.RELEVANCY)
    })
    it('dispatch sortBy', () => {
      expect(facadeMock.setSortBy).toHaveBeenCalledWith(SortByEnum.RELEVANCY)
    })
    it('dispatch setSearchFilters', () => {
      expect(facadeMock.setFilters).toHaveBeenCalledWith(filters)
    })
  })

  describe('#updateSearch', () => {
    describe('#updateSearch', () => {
      beforeEach(() => {
        const params = {
          any: 'any',
        }
        service.updateFilters(params)
      })
      it('dispatch setFilter with merged params', () => {
        expect(facadeMock.setFilters).toHaveBeenCalledWith({
          any: 'any',
          Org: 'mel',
        })
      })
    })
  })
})
