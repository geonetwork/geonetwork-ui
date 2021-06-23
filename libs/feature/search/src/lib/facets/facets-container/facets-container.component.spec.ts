import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFacade } from '../../state/search.facade'
import {
  EMPTY_BLOCK_MODEL_FIXTURE,
  FACET_ITEM_FIXTURE,
} from '@geonetwork-ui/ui/search'
import { of } from 'rxjs'
import { SEARCH_STATE_FILTERS_FIXTURE } from '../../state/fixtures/search-state.fixtures'
import { FacetsService } from '../facets.service'

import { FacetsContainerComponent } from './facets-container.component'

const mockStateFilters = { ...SEARCH_STATE_FILTERS_FIXTURE.simpleTerms }
const searchFacadeMock = {
  setConfigAggregations: jest.fn(),
  requestMoreResults: jest.fn(),
  setIncludeOnAggregation: jest.fn(),
  requestMoreOnAggregation: jest.fn(),
  setFilters: jest.fn(),
  searchFilters$: of(mockStateFilters),
  configAggregations$: of({}),
  resultsAggregations$: of({}),
}

const facetServiceMock = {
  createFacetModel: jest.fn(),
  findSelectedPaths: jest.fn(),
  computeItemPathValue: jest.fn(() => 'mock path'),
  computeNewFiltersFromState: jest.fn(() => {
    return { filters: 'mock' }
  }),
}

describe('FacetsContainerComponent', () => {
  let component: FacetsContainerComponent
  let fixture: ComponentFixture<FacetsContainerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacetsContainerComponent],
      imports: [],
      providers: [
        {
          provide: SearchFacade,
          useValue: searchFacadeMock,
        },
        {
          provide: FacetsService,
          useValue: facetServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetsContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('#onMore', () => {
    it('dispatches setIncludeOnAggregation', () => {
      component.onMore('tag.default')
      expect(searchFacadeMock.requestMoreOnAggregation).toHaveBeenCalledWith(
        'tag.default',
        20
      )
    })
  })

  describe('#onFilterChange', () => {
    it('dispatches setIncludeOnAggregation', () => {
      component.onFilterChange({
        field: 'tag.default',
        include: 'lan',
      })
      expect(searchFacadeMock.setIncludeOnAggregation).toHaveBeenCalledWith(
        'tag.default',
        '.*lan.*'
      )
    })
  })

  describe('#onItemChange', () => {
    it('update filters state', () => {
      component.onItemChange({
        block: EMPTY_BLOCK_MODEL_FIXTURE,
        item: FACET_ITEM_FIXTURE,
      })
      expect(facetServiceMock.computeItemPathValue).toHaveBeenCalledWith(
        EMPTY_BLOCK_MODEL_FIXTURE,
        FACET_ITEM_FIXTURE
      )
      expect(facetServiceMock.computeNewFiltersFromState).toHaveBeenCalledWith(
        mockStateFilters,
        FACET_ITEM_FIXTURE.path,
        'mock path'
      )
      expect(searchFacadeMock.setFilters).toHaveBeenCalledWith({
        filters: 'mock',
      })
    })
  })
})
