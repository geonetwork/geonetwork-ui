import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { SearchPageComponent } from './search-page.component'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { MockBuilder } from 'ng-mocks'

const RouterFacadeMock = {
  goToMetadata: jest.fn(),
}

const SearchFacadeMock = {
  setFilters: jest.fn(() => this),
  setResultsLayout: jest.fn(() => this),
}

describe('SearchPageComponent', () => {
  let component: SearchPageComponent
  let fixture: ComponentFixture<SearchPageComponent>

  beforeEach(() => MockBuilder(SearchPageComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
  it('should display record kind filter by default (without searchConfig)', () => {
    expect(component.displayRecordKindFilter).toBe(true)
  })
  it('should display record kind filter when RECORD_KIND_QUICK_FILTER is true', () => {
    const searchConfig = {
      RECORD_KIND_QUICK_FILTER: true,
    }
    component.displayRecordKindFilter = searchConfig.RECORD_KIND_QUICK_FILTER
    expect(component.displayRecordKindFilter).toBe(true)
  })
  it('should not display record kind filter when RECORD_KIND_QUICK_FILTER is false', () => {
    const searchConfig = {
      RECORD_KIND_QUICK_FILTER: false,
    }
    component.displayRecordKindFilter = searchConfig.RECORD_KIND_QUICK_FILTER
    expect(component.displayRecordKindFilter).toBe(false)
  })
})
