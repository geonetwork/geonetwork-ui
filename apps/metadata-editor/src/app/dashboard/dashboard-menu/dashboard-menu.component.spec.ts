import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { TranslateModule } from '@ngx-translate/core'
import { cold, hot } from 'jasmine-marbles'
import { MockBuilder, MockProviders } from 'ng-mocks'
import { DashboardMenuComponent } from './dashboard-menu.component'
import { SearchFacade } from '@geonetwork-ui/feature/search'

describe('DashboardMenuComponent', () => {
  let component: DashboardMenuComponent
  let fixture: ComponentFixture<DashboardMenuComponent>
  let recordsRepository: RecordsRepositoryInterface
  let searchFacade: SearchFacade

  beforeEach(() => {
    return MockBuilder(DashboardMenuComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMenuComponent, TranslateModule.forRoot()],
      providers: [
        MockProviders(ActivatedRoute, RecordsRepositoryInterface, SearchFacade),
      ],
    }).compileComponents()
    recordsRepository = TestBed.inject(RecordsRepositoryInterface)
    searchFacade = TestBed.inject(SearchFacade)
    fixture = TestBed.createComponent(DashboardMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit draftsCount$ immediately and then on drafts change', () => {
    // Mock the source observable that draftsCount$ depends on
    recordsRepository.draftsChanged$ = hot('-a-|', {
      a: void 0,
    })
    recordsRepository.getAllDrafts = jest
      .fn()
      .mockReturnValue(hot('ab-|', { a: [], b: [{}] }))

    // Define the expected marble diagram
    const expected = cold('ab-|', { a: 0, b: 1 })

    // Assert that draftsCount$ behaves as expected
    expect(component.draftsCount$).toBeObservable(expected)
  })

  it('should reset filters in main search', () => {
    searchFacade.setFilters = jest.fn()
    component.resetMainSearch()
    expect(searchFacade.setFilters).toHaveBeenCalledWith({})
  })
})
