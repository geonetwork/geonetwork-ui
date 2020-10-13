import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { initialState, reducer, SEARCH_FEATURE_KEY } from '../state/reducer'

import { FuzzySearchComponent } from './fuzzy-search.component'
import { UiModule } from '../../../../ui/src'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

describe('FuzzySearchComponent', () => {
  let component: FuzzySearchComponent
  let fixture: ComponentFixture<FuzzySearchComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FuzzySearchComponent],
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
