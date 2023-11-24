import { FieldsService, SearchFacade } from '@geonetwork-ui/feature/search'
import {
  SortByEnum,
  SortByField,
} from '@geonetwork-ui/common/domain/model/search'
import { BehaviorSubject, of } from 'rxjs'
import { RouterFacade } from '../state'
import { RouterSearchService } from './router-search.service'

let state = {}
class SearchFacadeMock {
  searchFilters$ = new BehaviorSubject(state)
  sortBy$: BehaviorSubject<SortByField> = new BehaviorSubject(['asc', '_score'])
}

class RouterFacadeMock {
  setSearch = jest.fn()
  updateSearch = jest.fn()
}

class FieldsServiceMock {
  mapping = {
    OrgForResource: 'publisher',
    any: 'q',
  }
  readFieldValuesFromFilters = jest.fn((filters) =>
    of(
      Object.keys(filters).reduce((prev, curr) => {
        const fieldName = this.mapping[curr]
        const filter = filters[curr]
        let values = []
        if (typeof filter === 'string') {
          values = [filter]
        } else if (filter) {
          values = Object.keys(filter)
        }
        return {
          ...prev,
          [fieldName]: values,
        }
      }, {})
    )
  )
}

describe('RouterSearchService', () => {
  let service: RouterSearchService
  let routerFacade: RouterFacade
  let searchFacade: SearchFacade
  let fieldsService: FieldsService

  beforeEach(() => {
    state = { OrgForResource: { mel: true } }
    routerFacade = new RouterFacadeMock() as any
    searchFacade = new SearchFacadeMock() as any
    fieldsService = new FieldsServiceMock() as any
    service = new RouterSearchService(searchFacade, routerFacade, fieldsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  describe('#setSearch', () => {
    it('dispatch setSearch with mapped params', async () => {
      const state = {
        any: 'any',
        OrgForResource: {
          Org: true,
        },
      }
      await service.setFilters(state)
      expect(routerFacade.setSearch).toHaveBeenCalledWith({
        q: ['any'],
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
        q: ['any'],
        publisher: ['Org'],
        _sort: '-createDate',
      })
    })
  })

  describe('#setSortBy', () => {
    it('dispatch sortBy', () => {
      service.setSortBy(SortByEnum.RELEVANCY)
      expect(routerFacade.updateSearch).toHaveBeenCalledWith({
        _sort: '-_score',
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
        q: ['any'],
        publisher: ['mel'],
      })
    })
  })
})
