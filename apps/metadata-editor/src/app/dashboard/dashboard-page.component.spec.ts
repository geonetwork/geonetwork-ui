import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DashboardPageComponent } from './dashboard-page.component'
import { CommonModule } from '@angular/common'
import { SearchService } from '@geonetwork-ui/feature/search'

class SearchServiceMock {
  setSortBy = jest.fn()
}

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent
  let fixture: ComponentFixture<DashboardPageComponent>
  let searchService: SearchService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: SearchService,
          useClass: SearchServiceMock,
        },
      ],
    })
      .overrideComponent(DashboardPageComponent, {
        set: {
          imports: [CommonModule],
          providers: [],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(DashboardPageComponent)
    searchService = TestBed.inject(SearchService)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('orders the completion column', () => {
    expect(searchService.setSortBy).toHaveBeenCalledWith(['desc', 'changeDate'])
  })
})
