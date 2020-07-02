import { SearchApiService } from '@lib/gn-api'
import { SearchEffects } from './effects'
import { TestBed } from '@angular/core/testing'
import { EffectsModule } from '@ngrx/effects'
import { provideMockActions } from '@ngrx/effects/testing'
import { Observable } from 'rxjs'
import {
  AddResults,
  ClearResults,
  RequestMoreResults,
  SortBy,
  UpdateParams,
} from './actions'
import { hot } from 'jasmine-marbles'
import { StoreModule } from '@ngrx/store'
import { initialState, reducer, SEARCH_FEATURE_KEY } from './reducer'

const searchServiceMock = {
  call: jest.fn(),
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
      ],
    })
    effects = TestBed.inject(SearchEffects)
  })

  it('should be created', () => {
    expect(effects).toBeTruthy()
  })

  describe('clearResults$', () => {
    it('clear results list on sortBy action', () => {
      actions$ = hot('-a-', { a: new SortBy('fieldA') })
      const expected = hot('-b-', { b: new ClearResults() })

      expect(effects.clearResults$).toBeObservable(expected)
    })
    it('clear results list on updateParams action', () => {
      actions$ = hot('-a-', { a: new UpdateParams({ any: 'abcd' }) })
      const expected = hot('-b-', { b: new ClearResults() })

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
