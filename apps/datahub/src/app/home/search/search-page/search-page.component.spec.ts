import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterFacade } from '@geonetwork-ui/feature/router'

import { SearchPageComponent } from './search-page.component'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { Params } from '@angular/router'
import { Subject } from 'rxjs'

const RouterFacadeMock = {
  goToMetadata: jest.fn(),
  searchParams$: new Subject<Params>(),
}

const SearchFacadeMock = {
  setFilters: jest.fn(() => this),
  setResultsLayout: jest.fn(() => this),
}

const SearchServiceMock = {
  setSortBy: jest.fn(),
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
        {
          provide: SearchService,
          useValue: SearchServiceMock,
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

  describe('initialize setSortBy', () => {
    it('not call setSortBy if other params exist', () => {
      RouterFacadeMock.searchParams$.next({ _sortBy: 'popularity' })
      expect(SearchServiceMock.setSortBy).toHaveBeenCalledTimes(0)
    })
    it('should setSortBy to last created if no other params', () => {
      RouterFacadeMock.searchParams$.next({})
      expect(SearchServiceMock.setSortBy).toHaveBeenCalledWith([
        'desc',
        'createDate',
      ])
    })
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
