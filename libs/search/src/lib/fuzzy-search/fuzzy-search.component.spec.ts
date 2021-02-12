import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { UiModule } from '@lib/ui'
import { TranslateModule } from '@ngx-translate/core'
import { initialState, reducer, SEARCH_FEATURE_KEY } from '../state/reducer'

import { FuzzySearchComponent } from './fuzzy-search.component'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { SearchFacade } from '@lib/search'
import { of } from 'rxjs'

const searchFacadeMock = {
  isLoading$: of(true),
  results$: of(['one']),
  layout$: of('CARD'),
  setResultsLayout: jest.fn(),
  scroll: jest.fn(),
}

describe('FuzzySearchComponent', () => {
  let component: FuzzySearchComponent
  let fixture: ComponentFixture<FuzzySearchComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FuzzySearchComponent],
      providers: [
        {
          provide: SearchFacade,
          useValue: searchFacadeMock,
        },
      ],
      imports: [
        UiModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        TranslateModule.forRoot(),
        StoreModule.forFeature(SEARCH_FEATURE_KEY, reducer, {
          initialState,
        }),
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FuzzySearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
