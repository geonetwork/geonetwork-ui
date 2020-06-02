import { SearchEffects } from './effects'
import { TestBed } from '@angular/core/testing'
import { initialState, reducer, SEARCH_FEATURE_KEY } from './reducer'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { provideMockActions } from '@ngrx/effects/testing'
import { Observable } from 'rxjs'

describe('Effects', () => {
  let effects: SearchEffects
  let actions: Observable<any>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreModule.forFeature(SEARCH_FEATURE_KEY, reducer, {
          initialState,
        }),
      ],
      providers: [provideMockActions(() => actions), SearchEffects],
    })
  })

  it('should be created', () => {
    effects = TestBed.inject(SearchEffects)
    expect(effects).toBeTruthy()
  })
})
