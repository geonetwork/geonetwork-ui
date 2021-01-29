import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFilters } from '@lib/common'
import { SearchFacade } from '@lib/search'
import { of } from 'rxjs'
import { SEARCH_STATE_FILTERS_FIXTURE } from '../../state/fixtures/search-state.fixtures'

import { FacetsContainerComponent } from './facets-container.component'

const searchFacadeMock = {
  setConfigAggregations: jest.fn(),
  requestMoreResults: jest.fn(),
  setIncludeOnAggregation: jest.fn(),
  requestMoreOnAggregation: jest.fn(),
  searchFilters$: of({}),
  configAggregations$: of({}),
  resultsAggregations$: of({}),
}

describe('FacetsContainerComponent', () => {
  let component: FacetsContainerComponent
  let fixture: ComponentFixture<FacetsContainerComponent>
  let searchFilters: SearchFilters

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacetsContainerComponent],
      imports: [],
      providers: [
        {
          provide: SearchFacade,
          useValue: searchFacadeMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetsContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('#findSelectedPaths', () => {
    describe('when simple terms', () => {
      beforeEach(() => {
        searchFilters = SEARCH_STATE_FILTERS_FIXTURE['simpleTerms']
      })
      it('returns simple 2 elements paths', () => {
        const paths = component['findSelectedPaths'](searchFilters)
        expect(paths).toEqual([
          ['tag.default', 'land use'],
          ['tag.default', 'national'],
        ])
      })
    })
    describe('when recursive terms', () => {
      beforeEach(() => {
        searchFilters = SEARCH_STATE_FILTERS_FIXTURE['recursiveTerms']
      })
      it('nested elements are appended to the path', () => {
        const paths = component['findSelectedPaths'](searchFilters)
        expect(paths).toEqual([
          ['resourceType', 'service', 'serviceType', 'OGC:WMS'],
          ['resourceType', 'dataset'],
        ])
      })
    })
  })

  describe('#computeNewFilters', () => {
    let path, filters
    describe('when simple terms path', () => {
      beforeEach(() => {
        path = ['tag.default', 'Land use']
      })
      describe('when no previous filters', () => {
        beforeEach(() => {
          filters = {}
        })
        it('add filter in state', () => {
          const stateFilters = component['computeNewFilters'](
            filters,
            path,
            true
          )
          expect(stateFilters).toEqual({
            'tag.default': { 'Land use': true },
          })
        })
      })
      describe('when previous filters', () => {
        beforeEach(() => {
          filters = { 'tag.default': { national: true } }
        })
        it('merges previous and new filters', () => {
          const stateFilters = component['computeNewFilters'](
            filters,
            path,
            true
          )
          expect(stateFilters).toEqual({
            'tag.default': { 'Land use': true, national: true },
          })
        })
        it('removes previous filter', () => {
          const stateFilters = component['computeNewFilters'](
            filters,
            ['tag.default', 'national'],
            false
          )
          expect(stateFilters).toEqual({
            'tag.default': {},
          })
        })
      })
    })
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
})
