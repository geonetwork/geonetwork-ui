import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterFacade } from '@geonetwork-ui/feature/router'

import { SearchPageComponent } from './search-page.component'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'

const RouterFacadeMock = {
  goToMetadata: jest.fn(),
}

const SearchFacadeMock = {
  setFilters: jest.fn(() => this),
  setResultsLayout: jest.fn(() => this),
  setConfigFilters: jest.fn(() => this),
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
      component.onMetadataSelection(datasetRecordsFixture[0])
      expect(RouterFacadeMock.goToMetadata).toHaveBeenCalledWith(
        datasetRecordsFixture[0]
      )
    })
  })
})
