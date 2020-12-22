import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFilters } from '@lib/common'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { SEARCH_STATE_FILTERS_FIXTURE } from '../../state/fixtures/search-state.fixtures'
import { initialState, reducer, SEARCH_FEATURE_KEY } from '../../state/reducer'

import { FacetsContainerComponent } from './facets-container.component'

describe('FacetsContainerComponent', () => {
  let component: FacetsContainerComponent
  let fixture: ComponentFixture<FacetsContainerComponent>
  let searchFilters: SearchFilters

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacetsContainerComponent],
      imports: [
        EffectsModule.forRoot(),
        StoreModule.forRoot({}),
        StoreModule.forFeature(SEARCH_FEATURE_KEY, reducer, {
          initialState,
        }),
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
        const paths = component.findSelectedPaths(searchFilters)
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
        const paths = component.findSelectedPaths(searchFilters)
        expect(paths).toEqual([
          ['resourceType', 'service', 'serviceType', 'OGC:WMS'],
          ['resourceType', 'dataset'],
        ])
      })
    })
  })
})
