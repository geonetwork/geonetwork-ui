import { TestBed } from '@angular/core/testing'
import { AuthService } from '@geonetwork-ui/feature/auth'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { ElasticsearchMapper } from '../utils/mapper'
import {
  AddResults,
  ClearError,
  ClearPagination,
  ClearResults,
  DEFAULT_SEARCH_KEY,
  PatchResultsAggregations,
  RequestMoreOnAggregation,
  RequestMoreResults,
  Scroll,
  SetError,
  SetFilters,
  SetIncludeOnAggregation,
  SetResultsAggregations,
  SetResultsHits,
  SetSearch,
  SetSortBy,
  UpdateFilters,
  UpdateRequestAggregationTerm,
} from './actions'
import { EffectsModule } from '@ngrx/effects'
import { provideMockActions } from '@ngrx/effects/testing'
import { StoreModule } from '@ngrx/store'
import { hot } from 'jasmine-marbles'
import { Observable, of, throwError } from 'rxjs'
import { SearchEffects } from './effects'
import { initialState, reducer, SEARCH_FEATURE_KEY } from './reducer'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import {
  ES_FIXTURE_AGGS_REQUEST,
  simpleWithAgg,
} from '@geonetwork-ui/util/shared'
import { SearchService } from '@geonetwork-ui/feature/search'
import { HttpErrorResponse } from '@angular/common/http'

const defaultSearchState = initialState[DEFAULT_SEARCH_KEY]
const stateWithSearches = {
  ...initialState,
  [DEFAULT_SEARCH_KEY]: {
    ...defaultSearchState,
    config: {
      ...defaultSearchState.config,
      aggregations: ES_FIXTURE_AGGS_REQUEST,
    },
  },
  main: {
    ...defaultSearchState,
    config: {
      ...defaultSearchState.config,
      aggregations: {},
    },
  },
}

class SearchServiceMock {
  configuration = {
    basePath: 'http://geonetwork/srv/api',
  }
  search = () => of(simpleWithAgg)
}
class AuthServiceMock {
  authReady = () => of(true)
}
class EsMapperMock {
  toRecords = () => []
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
          initialState: stateWithSearches,
        }),
        HttpClientTestingModule,
      ],
      providers: [
        provideMockActions(() => actions$),
        SearchEffects,
        {
          provide: SearchApiService,
          useClass: SearchServiceMock,
        },
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
        {
          provide: ElasticsearchMapper,
          useClass: EsMapperMock,
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
      actions$ = hot('-a---', { a: new SetSortBy('fieldA') })
      const expected = hot('-(bcd)', {
        b: new ClearResults(),
        c: new ClearPagination(),
        d: new RequestMoreResults(),
      })

      expect(effects.clearResults$).toBeObservable(expected)
    })
    it('clear results list on setFilters action', () => {
      actions$ = hot('-a---', {
        a: new SetFilters({ any: 'abcd', other: 'ef' }),
      })
      const expected = hot('-(bcd)', {
        b: new ClearResults(),
        c: new ClearPagination(),
        d: new RequestMoreResults(),
      })

      expect(effects.clearResults$).toBeObservable(expected)
    })
    it('clear results list on updateFilters action', () => {
      actions$ = hot('-a---', { a: new UpdateFilters({ any: 'abcd' }) })
      const expected = hot('-(bcd)', {
        b: new ClearResults(),
        c: new ClearPagination(),
        d: new RequestMoreResults(),
      })

      expect(effects.clearResults$).toBeObservable(expected)
    })
    it('clear results list on setSearch action', () => {
      actions$ = hot('-a---', {
        a: new SetSearch({ filters: { any: 'abcd' } }, 'main'),
      })
      const expected = hot('-(bcd)', {
        b: new ClearResults('main'),
        c: new ClearPagination('main'),
        d: new RequestMoreResults('main'),
      })

      expect(effects.clearResults$).toBeObservable(expected)
    })
  })

  describe('scroll$', () => {
    it('request more results on scroll action', () => {
      actions$ = hot('-a---', { a: new Scroll('main') })
      const expected = hot('-(b)', {
        b: new RequestMoreResults('main'),
      })
      expect(effects.scroll$).toBeObservable(expected)
    })
  })

  describe('loadResults$', () => {
    it('load new results on requestMoreResults action', () => {
      actions$ = hot('-a-', { a: new RequestMoreResults() })
      const expected = hot('-(bcde)-', {
        b: new AddResults([]),
        c: new SetResultsAggregations({ abc: {} }),
        d: new SetResultsHits(undefined),
        e: new ClearError(),
      })
      expect(effects.loadResults$).toBeObservable(expected)
    })

    it('propagate action search id', () => {
      actions$ = hot('-a-', { a: new RequestMoreResults('main') })
      const expected = hot('-(bcde)-', {
        b: new AddResults([], 'main'),
        c: new SetResultsAggregations({ abc: {} }, 'main'),
        d: new SetResultsHits(undefined, 'main'),
        e: new ClearError('main'),
      })
      expect(effects.loadResults$).toBeObservable(expected)
    })

    describe('when search fails with HTTP error', () => {
      beforeEach(() => {
        const searchService = TestBed.inject(SearchApiService)
        searchService.search = () =>
          throwError(
            new HttpErrorResponse({
              status: 401,
            })
          )
      })
      it('stores the error', () => {
        actions$ = hot('-a-', { a: new RequestMoreResults() })
        const expected = hot('-b-', {
          b: new SetError(401, expect.stringContaining('401')),
        })
        expect(effects.loadResults$).toBeObservable(expected)
      })
      it('stores the error and propagates search id', () => {
        actions$ = hot('-a-', { a: new RequestMoreResults('main') })
        const expected = hot('-b-', {
          b: new SetError(401, expect.stringContaining('401'), 'main'),
        })
        expect(effects.loadResults$).toBeObservable(expected)
      })
    })

    describe('when search fails with unspecified error', () => {
      beforeEach(() => {
        const searchService = TestBed.inject(SearchApiService)
        searchService.search = () =>
          throwError(new Error('probably CORS related'))
      })
      it('stores the error with a 0 code and propagates search id', () => {
        actions$ = hot('-a-', { a: new RequestMoreResults('main') })
        const expected = hot('-b-', {
          b: new SetError(0, 'probably CORS related', 'main'),
        })
        expect(effects.loadResults$).toBeObservable(expected)
      })
    })
  })

  describe('loadMoreOnAggregation$', () => {
    it('dispatch UPDATE_REQUEST_AGGREGATION_TERM', () => {
      actions$ = hot('-a-', { a: new RequestMoreOnAggregation('abc', 1) })
      const expected = hot('-b-', {
        b: new UpdateRequestAggregationTerm('abc', { increment: 1 }),
      })

      expect(effects.loadMoreOnAggregation$).toBeObservable(expected)
    })
  })

  describe('setIncludeOnAggregation$', () => {
    it('dispatch UPDATE_REQUEST_AGGREGATION_TERM', () => {
      actions$ = hot('-a-', { a: new SetIncludeOnAggregation('abc', '*land*') })
      const expected = hot('-b-', {
        b: new UpdateRequestAggregationTerm('abc', { include: '*land*' }),
      })

      expect(effects.setIncludeOnAggregation$).toBeObservable(expected)
    })
  })

  describe('upateRequestAggregationTerm$', () => {
    it('patch aggregation results with new aggretation term definition', () => {
      actions$ = hot('-a-', {
        a: new UpdateRequestAggregationTerm('abc', {
          include: '*land*',
          increment: 1,
        }),
      })
      const expected = hot('-b-', {
        b: new PatchResultsAggregations('abc', { abc: {} }),
      })

      expect(effects.updateRequestAggregationTerm$).toBeObservable(expected)
    })
  })
})
