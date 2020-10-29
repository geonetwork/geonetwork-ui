import { TestBed } from '@angular/core/testing'
import { AuthService } from '@lib/auth'
import { SearchApiService } from '@lib/gn-api'
import { EffectsModule } from '@ngrx/effects'
import { provideMockActions } from '@ngrx/effects/testing'
import { StoreModule } from '@ngrx/store'
import { hot } from 'jasmine-marbles'
import { Observable, of } from 'rxjs'
import {
  AddResults,
  ClearResults,
  RequestMoreResults,
  SortBy,
  UpdateParams,
} from './actions'
import { SearchEffects } from './effects'
import { initialState, reducer, SEARCH_FEATURE_KEY } from './reducer'

const searchServiceMock = {
  search: () => of({ hits: { hits: [] } }), // TODO: use a fixture here
}
const authServiceMock = {
  authReady: () => of(true),
}

describe('Effects', () => {
  let effects: SearchEffects
  let actions$: Observable<any>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        EffectsModule.forRoot(),
        StoreModule.forRoot({}),
        StoreModule.forFeature(SEARCH_FEATURE_KEY, reducer, {
          initialState,
        }),
      ],
      providers: [
        provideMockActions(() => actions$),
        SearchEffects,
        {
          provide: SearchApiService,
          useValue: searchServiceMock,
        },
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    })
    effects = TestBed.inject(SearchEffects)
  })

  it('should be created', () => {
    expect(effects).toBeTruthy()
  })

  describe('clearResults$', () => {
    it('clear results list on sortBy action', () => {
      actions$ = hot('-a---', { a: new SortBy('fieldA') })
      const expected = hot('-(bc)', {
        b: new ClearResults(),
        c: new RequestMoreResults(),
      })

      expect(effects.clearResults$).toBeObservable(expected)
    })
    it('clear results list on updateParams action', () => {
      actions$ = hot('-a---', { a: new UpdateParams({ any: 'abcd' }) })
      const expected = hot('-(bc)', {
        b: new ClearResults(),
        c: new RequestMoreResults(),
      })

      expect(effects.clearResults$).toBeObservable(expected)
    })
  })

  describe('loadResults$', () => {
    it('load new results on requestMoreResults action', () => {
      actions$ = hot('-a-', { a: new RequestMoreResults() })
      const expected = hot('-b-', { b: new AddResults([]) })

      expect(effects.loadResults$).toBeObservable(expected)
    })
  })
})
