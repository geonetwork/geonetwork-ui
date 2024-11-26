import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFiltersSummaryComponent } from './search-filters-summary.component'
import { MockComponent, MockProvider } from 'ng-mocks'
import { SearchService } from '../utils/service/search.service'
import { SearchFacade } from '../state/search.facade'
import { BehaviorSubject, firstValueFrom, of } from 'rxjs'
import { TranslateModule } from '@ngx-translate/core'
import { SearchFiltersSummaryItemComponent } from '../search-filters-summary-item/search-filters-summary-item.component'
import { FieldFilters } from '@geonetwork-ui/common/domain/model/search'

class SearchFacadeMock {
  searchFilters$ = new BehaviorSubject<FieldFilters>({
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
      imports: [TranslateModule.forRoot()],
      declarations: [
        SearchFiltersSummaryComponent,
        MockComponent(SearchFiltersSummaryItemComponent),
      ],
      providers: [
        MockProvider(SearchFacade, SearchFacadeMock, 'useClass'),
        MockProvider(SearchService, SearchServiceMock, 'useClass'),
      ],
    }).compileComponents()

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
    expect(searchService.setFilters).toHaveBeenCalledWith({})
  })
})
