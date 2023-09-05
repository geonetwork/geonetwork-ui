import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { DashboardSearchService } from '../../dashboard/dashboard-search.service'
import { AllRecordsComponent } from './all-records-list.component'

class searchFacadeMock {
  setFavoritesOnly = jest.fn()
  setSortBy = jest.fn()
}

class DashboardSearchServiceMock {}

describe('AllRecordsComponent', () => {
  let component: AllRecordsComponent
  let fixture: ComponentFixture<AllRecordsComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AllRecordsComponent],
      providers: [
        {
          provide: SearchFacade,
          useClass: searchFacadeMock,
        },
        {
          provide: DashboardSearchService,
          useClass: DashboardSearchServiceMock,
        },
      ],
    })
    fixture = TestBed.createComponent(AllRecordsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
