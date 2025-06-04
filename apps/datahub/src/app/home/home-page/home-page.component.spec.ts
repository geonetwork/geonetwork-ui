import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HomePageComponent } from './home-page.component'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { globalConfigFilters } from '../../app.config'

class SearchFacadeMock {
  setResultsLayout = jest.fn(() => this)
  setConfigFilters = jest.fn(() => this)
}
describe('HomePageComponent', () => {
  let component: HomePageComponent
  let fixture: ComponentFixture<HomePageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      imports: [UiLayoutModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should setResultsLayout to ROW', () => {
    expect(component.searchFacade.setResultsLayout).toHaveBeenCalledWith('ROW')
  })
  it('should setConfigFilters call with globalConfigFilters', () => {
    expect(component.searchFacade.setConfigFilters).toHaveBeenCalledWith(
      globalConfigFilters
    )
  })
})
