import { SortByEnum } from '@geonetwork-ui/util/shared'
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
      service.setSearch(p)
      expect(facadeMock.setFilters).toHaveBeenCalledWith(p)
    })
  })

  describe('#setSortBy', () => {
    it('dispatch sortBy', () => {
      service.setSortBy(SortByEnum.RELEVANCY)
      expect(facadeMock.setSortBy).toHaveBeenCalledWith(SortByEnum.RELEVANCY)
    })
  })

  describe('#updateSearch', () => {
    describe('#updateSearch', () => {
      beforeEach(() => {
        const params = {
          any: 'any',
        }
        service.updateSearch(params)
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
