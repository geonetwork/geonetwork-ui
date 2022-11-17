import { inject, TestBed } from '@angular/core/testing'
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
  SetFavoritesOnly,
  SetFilters,
  SetIncludeOnAggregation,
  SetResultsAggregations,
  SetResultsHits,
  SetSearch,
  SetSortBy,
  SetSpatialFilterEnabled,
  UpdateFilters,
  UpdateRequestAggregationTerm,
} from './actions'
import { EffectsModule } from '@ngrx/effects'
import { provideMockActions } from '@ngrx/effects/testing'
import { Store, StoreModule } from '@ngrx/store'
import { getTestScheduler, hot } from 'jasmine-marbles'
import { Observable, of, throwError } from 'rxjs'
import { SearchEffects } from './effects'
import {
  initialState,
  reducer,
  SEARCH_FEATURE_KEY,
  SearchState,
} from './reducer'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import {
  ES_FIXTURE_AGGS_REQUEST,
  simpleWithAgg,
} from '@geonetwork-ui/util/shared/fixtures'
import { HttpErrorResponse } from '@angular/common/http'
import { delay } from 'rxjs/operators'
import { FavoritesService } from '../favorites/favorites.service'
import { readFirst } from '@nrwl/angular/testing'
import { ElasticsearchService } from '@geonetwork-ui/util/shared'
import { FILTER_GEOMETRY } from '../feature-search.module'

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
class FavoritesServiceMock {
  myFavoritesUuid$ = of(['fav001', 'fav002', 'fav003'])
}

class EsServiceMock {
  getSearchRequestBody = jest.fn()
  buildMoreOnAggregationPayload = jest.fn(() => ({
    aggregations: {},
    size: 0,
    query: {},
  }))
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
        {
          provide: FavoritesService,
          useClass: FavoritesServiceMock,
        },
        {
          provide: ElasticsearchService,
          useClass: EsServiceMock,
        },
        {
          provide: FILTER_GEOMETRY,
          useValue: null,
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
        a: new SetSearch({ filters: { any: 'abcd' } } as any, 'main'),
      })
      const expected = hot('-(bcd)', {
        b: new ClearResults('main'),
        c: new ClearPagination('main'),
        d: new RequestMoreResults('main'),
      })

      expect(effects.clearResults$).toBeObservable(expected)
    })
    it('clear results list on setSpatialFilterEnabled action', () => {
      actions$ = hot('-a---', {
        a: new SetSpatialFilterEnabled(true, 'main'),
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

    describe('when running multiple searches concurrently', () => {
      beforeEach(inject([SearchApiService], (searchService) => {
        searchService.search = () =>
          of(simpleWithAgg).pipe(delay(10, getTestScheduler()))
      }))
      it('cancels requests with the same search id', () => {
        actions$ = hot('-(aabab)-', {
          a: new RequestMoreResults('main'),
          b: new RequestMoreResults(DEFAULT_SEARCH_KEY),
        })
        const expected = hot('--(abcdwxyz)-', {
          a: new AddResults([], 'main'),
          b: new SetResultsAggregations({ abc: {} }, 'main'),
          c: new SetResultsHits(undefined, 'main'),
          d: new ClearError('main'),
          w: new AddResults([], DEFAULT_SEARCH_KEY),
          x: new SetResultsAggregations({ abc: {} }, DEFAULT_SEARCH_KEY),
          y: new SetResultsHits(undefined, DEFAULT_SEARCH_KEY),
          z: new ClearError(DEFAULT_SEARCH_KEY),
        })
        expect(effects.loadResults$).toBeObservable(expected)
      })
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

    describe('when asking for favorites only', () => {
      let esService: ElasticsearchService
      let store: Store<SearchState>
      beforeEach(() => {
        esService = TestBed.inject(ElasticsearchService)
        store = TestBed.inject(Store)
        store.dispatch(new SetFavoritesOnly(true, 'main'))
      })
      it('requests results', () => {
        actions$ = hot('-a-', {
          a: new RequestMoreResults('main'),
        })
        const expected = hot('-(abcd)-', {
          a: new AddResults([], 'main'),
          b: new SetResultsAggregations({ abc: {} }, 'main'),
          c: new SetResultsHits(undefined, 'main'),
          d: new ClearError('main'),
        })
        expect(effects.loadResults$).toBeObservable(expected)
      })
      it('filter results within a certain set of ids', async () => {
        actions$ = of(new RequestMoreResults('main'))
        await readFirst(effects.loadResults$)
        expect(esService.getSearchRequestBody).toHaveBeenCalledWith(
          expect.anything(), // FIXME: using an object argument would be better here...
          expect.anything(),
          expect.anything(),
          undefined,
          expect.anything(),
          expect.anything(),
          expect.anything(),
          ['fav001', 'fav002', 'fav003'],
          null
        )
      })
    })

    describe('when providing a filter geometry', () => {
      let esService: ElasticsearchService
      beforeEach(() => {
        effects['filterGeometry'] = Promise.resolve({
          type: 'Polygon',
          coordinates: [],
        })
        esService = TestBed.inject(ElasticsearchService)
      })
      describe('when useSpatialFilter is enabled', () => {
        beforeEach(() => {
          TestBed.inject(Store).dispatch(
            new SetSpatialFilterEnabled(true, 'main')
          )
        })
        it('passes the geometry to the ES service', async () => {
          actions$ = of(new RequestMoreResults('main'))
          await readFirst(effects.loadResults$)
          expect(esService.getSearchRequestBody).toHaveBeenCalledWith(
            expect.anything(),
            expect.anything(),
            expect.anything(),
            undefined,
            expect.anything(),
            expect.anything(),
            expect.anything(),
            null,
            { type: 'Polygon', coordinates: [] }
          )
        })
      })
      describe('when useSpatialFilter is disabled', () => {
        beforeEach(() => {
          TestBed.inject(Store).dispatch(
            new SetSpatialFilterEnabled(false, 'main')
          )
        })
        it('does not pass the geometry to the ES service', async () => {
          actions$ = of(new RequestMoreResults('main'))
          await readFirst(effects.loadResults$)
          expect(esService.getSearchRequestBody).toHaveBeenCalledWith(
            expect.anything(),
            expect.anything(),
            expect.anything(),
            undefined,
            expect.anything(),
            expect.anything(),
            expect.anything(),
            null,
            null
          )
        })
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
