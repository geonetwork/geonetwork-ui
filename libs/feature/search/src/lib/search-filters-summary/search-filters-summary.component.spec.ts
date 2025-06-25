import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  FILTER_SUMMARY_IGNORE_LIST,
  SearchFiltersSummaryComponent,
} from './search-filters-summary.component'
import { MockProvider } from 'ng-mocks'
import { SearchService } from '../utils/service/search.service'
import { SearchFacade } from '../state/search.facade'
import { BehaviorSubject, firstValueFrom } from 'rxjs'
import { FieldFilters } from '@geonetwork-ui/common/domain/model/search'
import { provideI18n } from '@geonetwork-ui/util/i18n'

class SearchFacadeMock {
  searchFilters$ = new BehaviorSubject<FieldFilters>({
    any: 'search should be ignored',
    format: {},
    isSpatial: {},
    license: {},
    'userInfo.keyword': {},
  })
}
class SearchServiceMock {
  setFilters = jest.fn()
}

describe('SearchFiltersSummaryComponent', () => {
  let component: SearchFiltersSummaryComponent
  let fixture: ComponentFixture<SearchFiltersSummaryComponent>
  let searchFacade: SearchFacade
  let searchService: SearchService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        MockProvider(SearchFacade, SearchFacadeMock, 'useClass'),
        MockProvider(SearchService, SearchServiceMock, 'useClass'),
      ],
    })
  })

  describe('no injection token provided', () => {
    beforeEach(async () => {
      await TestBed.compileComponents()
      fixture = TestBed.createComponent(SearchFiltersSummaryComponent)
      searchFacade = TestBed.inject(SearchFacade)
      searchService = TestBed.inject(SearchService)
      component = fixture.componentInstance
      fixture.detectChanges()
    })
    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it('should set searchFilterActive$ observable to false for empty filters', async () => {
      const isActive = await firstValueFrom(component.searchFilterActive$)
      expect(isActive).toBeFalsy()
    })

    it('should set searchFilterActive$ observable to true for NON empty value filters', async () => {
      const filters = {
        format: {},
        isSpatial: {},
        license: {},
        'userInfo.keyword': { 'admin|admin|admin|Administrator': true },
      }
      ;(searchFacade.searchFilters$ as BehaviorSubject<FieldFilters>).next(
        filters
      )
      const isActive = await firstValueFrom(component.searchFilterActive$)
      expect(isActive).toBeTruthy()
    })

    it('should set searchFilterActive$ observable to true for NON empty dateRange filters', async () => {
      const filters = {
        format: {},
        isSpatial: {},
        license: {},
        changeDate: {
          start: new Date('2021-01-01'),
          end: new Date('2021-01-02'),
        },
      }
      ;(searchFacade.searchFilters$ as BehaviorSubject<FieldFilters>).next(
        filters
      )
      const isActive = await firstValueFrom(component.searchFilterActive$)
      expect(isActive).toBeTruthy()
    })

    it('should clear filters', () => {
      component.clearFilters()
      expect(searchService.setFilters).toHaveBeenCalledWith({
        any: 'search should be ignored',
      })
    })
  })

  describe('FILTER_SUMMARY_IGNORE_LIST injection token provided', () => {
    beforeEach(async () => {
      TestBed.overrideProvider(FILTER_SUMMARY_IGNORE_LIST, {
        useValue: ['owner'],
      })
      await TestBed.compileComponents()
      fixture = TestBed.createComponent(SearchFiltersSummaryComponent)
      searchFacade = TestBed.inject(SearchFacade)
      searchService = TestBed.inject(SearchService)
      component = fixture.componentInstance
      fixture.detectChanges()
    })
    it('should ignore filters from FILTER_SUMMARY_IGNORE_LIST', async () => {
      const filters = {
        owner: { 1: true },
        isSpatial: {},
        license: {},
      }
      ;(searchFacade.searchFilters$ as BehaviorSubject<FieldFilters>).next(
        filters
      )
      const isActive = await firstValueFrom(component.searchFilterActive$)
      expect(isActive).toBeFalsy()
    })
    it('should set searchFilterActive$ observable to true for NON empty value filters', async () => {
      const filters = {
        owner: { 1: true },
        format: {},
        isSpatial: {},
        license: {},
        'userInfo.keyword': { 'admin|admin|admin|Administrator': true },
      }
      ;(searchFacade.searchFilters$ as BehaviorSubject<FieldFilters>).next(
        filters
      )
      const isActive = await firstValueFrom(component.searchFilterActive$)
      expect(isActive).toBeTruthy()
    })
    it('should clear filters except with keys from FILTER_SUMMARY_IGNORE_LIST', () => {
      const filters = {
        owner: { 1: true },
        any: 'search should be ignored',
        format: {},
        isSpatial: {},
        license: {},
        'userInfo.keyword': { 'admin|admin|admin|Administrator': true },
      }
      ;(searchFacade.searchFilters$ as BehaviorSubject<FieldFilters>).next(
        filters
      )
      component.clearFilters()
      expect(searchService.setFilters).toHaveBeenCalledWith({
        owner: { 1: true },
        any: 'search should be ignored',
      })
    })
  })
})
