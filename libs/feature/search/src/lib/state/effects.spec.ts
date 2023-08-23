import { TestBed } from '@angular/core/testing'
import { AuthService } from '@geonetwork-ui/feature/auth'
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
} from './actions'
import { EffectsModule } from '@ngrx/effects'
import { provideMockActions } from '@ngrx/effects/testing'
import { Store, StoreModule } from '@ngrx/store'
import { getTestScheduler, hot } from 'jasmine-marbles'
import { firstValueFrom, Observable, of, throwError } from 'rxjs'
import { SearchEffects } from './effects'
import {
  initialState,
  reducer,
  SEARCH_FEATURE_KEY,
  SearchState,
} from './reducer'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import {
  DATASET_RECORDS,
  SAMPLE_AGGREGATIONS_PARAMS,
  SAMPLE_AGGREGATIONS_RESULTS,
  SAMPLE_SEARCH_RESULTS,
} from '@geonetwork-ui/common/fixtures'
import { HttpErrorResponse } from '@angular/common/http'
import { delay } from 'rxjs/operators'
import { FavoritesService } from '../favorites/favorites.service'
import { FILTER_GEOMETRY } from '../feature-search.module'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/records-repository.interface'

const defaultSearchState = initialState[DEFAULT_SEARCH_KEY]
const stateWithSearches = {
  ...initialState,
  [DEFAULT_SEARCH_KEY]: {
    ...defaultSearchState,
    config: {
      ...defaultSearchState.config,
      aggregations: SAMPLE_AGGREGATIONS_PARAMS,
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

class AuthServiceMock {
  authReady = () => of(true)
}
class FavoritesServiceMock {
  myFavoritesUuid$ = of(['fav001', 'fav002', 'fav003'])
}

class RecordsRepositoryMock {
  aggregate = jest.fn(() => of(SAMPLE_AGGREGATIONS_RESULTS))
  search = jest.fn(() => of(SAMPLE_SEARCH_RESULTS))
}

describe('Effects', () => {
  let effects: SearchEffects
  let actions$: Observable<any>
  let repository: RecordsRepositoryInterface

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
          provide: AuthService,
          useClass: AuthServiceMock,
        },
        {
          provide: FavoritesService,
          useClass: FavoritesServiceMock,
        },
        {
          provide: RecordsRepositoryInterface,
          useClass: RecordsRepositoryMock,
        },
        {
          provide: FILTER_GEOMETRY,
          useValue: null,
        },
      ],
    })
    effects = TestBed.inject(SearchEffects)
    repository = TestBed.inject(RecordsRepositoryInterface)
  })

  it('should be created', () => {
    expect(effects).toBeTruthy()
  })

  describe('clearResults$', () => {
    it('clear results list on sortBy action', () => {
      actions$ = hot('-a---', { a: new SetSortBy(['asc', 'fieldA']) })
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
        b: new AddResults(DATASET_RECORDS),
        c: new SetResultsAggregations(SAMPLE_AGGREGATIONS_RESULTS),
        d: new SetResultsHits(123),
        e: new ClearError(),
      })
      expect(effects.loadResults$).toBeObservable(expected)
    })

    it('propagate action search id', () => {
      actions$ = hot('-a-', { a: new RequestMoreResults('main') })
      const expected = hot('-(bcde)-', {
        b: new AddResults(DATASET_RECORDS, 'main'),
        c: new SetResultsAggregations(SAMPLE_AGGREGATIONS_RESULTS, 'main'),
        d: new SetResultsHits(123, 'main'),
        e: new ClearError('main'),
      })
      expect(effects.loadResults$).toBeObservable(expected)
    })

    describe('when running multiple searches concurrently', () => {
      beforeEach(() => {
        repository.search = () =>
          of(SAMPLE_SEARCH_RESULTS).pipe(delay(10, getTestScheduler()))
      })
      it('cancels requests with the same search id', () => {
        actions$ = hot('-(aabab)-', {
          a: new RequestMoreResults('main'),
          b: new RequestMoreResults(DEFAULT_SEARCH_KEY),
        })
        const expected = hot('--(abcdwxyz)-', {
          a: new AddResults(SAMPLE_SEARCH_RESULTS.records, 'main'),
          b: new SetResultsAggregations(SAMPLE_AGGREGATIONS_RESULTS, 'main'),
          c: new SetResultsHits(123, 'main'),
          d: new ClearError('main'),
          w: new AddResults(SAMPLE_SEARCH_RESULTS.records, DEFAULT_SEARCH_KEY),
          x: new SetResultsAggregations(
            SAMPLE_AGGREGATIONS_RESULTS,
            DEFAULT_SEARCH_KEY
          ),
          y: new SetResultsHits(123, DEFAULT_SEARCH_KEY),
          z: new ClearError(DEFAULT_SEARCH_KEY),
        })
        expect(effects.loadResults$).toBeObservable(expected)
      })
    })

    describe('when search fails with HTTP error', () => {
      beforeEach(() => {
        repository.search = () =>
          throwError(
            () =>
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
        const repository = TestBed.inject(RecordsRepositoryInterface)
        repository.search = () =>
          throwError(() => new Error('probably CORS related'))
      })
      it('stores the error with a 0 code and propagates search id', () => {
        actions$ = hot('-a-', { a: new RequestMoreResults('main') })
        const expected = hot('-b-', {
          b: new SetError(0, 'probably CORS related', 'main'),
        })
        expect(effects.loadResults$).toBeObservable(expected)
      })
    })

    // FIXME: REACTIVATE THIS TEST
    describe.skip('when asking for favorites only', () => {
      let store: Store<SearchState>
      beforeEach(() => {
        store = TestBed.inject(Store)
        store.dispatch(new SetFavoritesOnly(true, 'main'))
      })
      it('requests results', () => {
        actions$ = hot('-a-', {
          a: new RequestMoreResults('main'),
        })
        const expected = hot('-(abcd)-', {
          a: new AddResults(DATASET_RECORDS, 'main'),
          b: new SetResultsAggregations(SAMPLE_AGGREGATIONS_RESULTS, 'main'),
          c: new SetResultsHits(123, 'main'),
          d: new ClearError('main'),
        })
        expect(effects.loadResults$).toBeObservable(expected)
      })
      it('filter results within a certain set of ids', async () => {
        actions$ = of(new RequestMoreResults('main'))
        await firstValueFrom(effects.loadResults$)
        expect(repository.search).toHaveBeenCalledWith(
          expect.objectContaining({
            uuids: ['fav001', 'fav002', 'fav003'],
          })
        )
      })
    })

    // FIXME: REACTIVATE THIS TEST
    describe.skip('when providing a filter geometry', () => {
      beforeEach(() => {
        effects['filterGeometry'] = Promise.resolve({
          type: 'Polygon',
          coordinates: [],
        })
      })
      describe('when useSpatialFilter is enabled', () => {
        beforeEach(() => {
          TestBed.inject(Store).dispatch(
            new SetSpatialFilterEnabled(true, 'main')
          )
        })
        it('passes the geometry to the ES service', async () => {
          actions$ = of(new RequestMoreResults('main'))
          await firstValueFrom(effects.loadResults$)
          expect(repository.search).toHaveBeenCalledWith(
            expect.objectContaining({
              geometry: { type: 'Polygon', coordinates: [] },
            })
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
          await firstValueFrom(effects.loadResults$)
          expect(repository.search).toHaveBeenCalledWith(
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

      describe('when providing a filter geometry', () => {
        beforeEach(() => {
          effects['filterGeometry'] = Promise.reject('blarg')
          TestBed.inject(Store).dispatch(
            new SetSpatialFilterEnabled(true, 'main')
          )
        })
        it('does not pass the geometry to the ES service', async () => {
          actions$ = of(new RequestMoreResults('main'))
          await firstValueFrom(effects.loadResults$)
          expect(repository.search).toHaveBeenCalledWith(
            expect.objectContaining({
              geometry: null,
            })
          )
        })
      })
    })
  })

  describe('updateRequestAggregation$', () => {
    describe('RequestMoreOnAggregation action', () => {
      it('dispatch PATCH_RESULTS_AGGREGATIONS', () => {
        actions$ = hot('-a-', { a: new RequestMoreOnAggregation('myField', 1) })
        const expected = hot('-b-', {
          b: new PatchResultsAggregations(
            'myField',
            SAMPLE_AGGREGATIONS_RESULTS['myField']
          ),
        })

        expect(effects.updateRequestAggregation$).toBeObservable(expected)
      })
    })
    describe('SetIncludeOnAggregation action', () => {
      it('dispatch UPDATE_REQUEST_AGGREGATION_TERM', () => {
        actions$ = hot('-a-', {
          a: new SetIncludeOnAggregation('myField', '*land*'),
        })
        const expected = hot('-b-', {
          b: new PatchResultsAggregations(
            'myField',
            SAMPLE_AGGREGATIONS_RESULTS['myField']
          ),
        })

        expect(effects.updateRequestAggregation$).toBeObservable(expected)
      })
    })
  })
})
