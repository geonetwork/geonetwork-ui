import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterFacade } from '@geonetwork-ui/feature/router'

import { SearchPageComponent } from './search-page.component'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { RECORDS_SUMMARY_FIXTURE } from '@geonetwork-ui/util-shared/fixtures'

const RouterFacadeMock = {
  goToMetadata: jest.fn(),
}

const SearchFacadeMock = {
  setFilters: jest.fn(() => this),
  setResultsLayout: jest.fn(() => this),
}

describe('MainSearchComponent', () => {
  let component: SearchPageComponent
  let fixture: ComponentFixture<SearchPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchPageComponent],
      imports: [UiLayoutModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: RouterFacade,
          useValue: RouterFacadeMock,
        },
        {
          provide: SearchFacade,
          useValue: SearchFacadeMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should setResultsLayout to ROW', () => {
    expect(SearchFacadeMock.setResultsLayout).toHaveBeenCalledWith('ROW')
  })

  describe('navigate to metadata record', () => {
    it('calls searchRouter goToMetdata with md record', () => {
      component.onMetadataSelection(RECORDS_SUMMARY_FIXTURE[0])
      expect(RouterFacadeMock.goToMetadata).toHaveBeenCalledWith(
        RECORDS_SUMMARY_FIXTURE[0]
      )
    })
  })
})
