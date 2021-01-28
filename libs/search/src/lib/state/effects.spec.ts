import { TestBed } from '@angular/core/testing'
import { AuthService } from '@lib/auth'
import { SearchApiService } from '@lib/gn-api'
import { ElasticsearchMapper } from '../elasticsearch/elasticsearch.mapper'
import {
  DEFAULT_SEARCH_KEY,
  Scroll,
  SetIncludeOnAggregation,
  UpdateRequestAggregationTerm,
} from './actions'
import { EffectsModule } from '@ngrx/effects'
import { provideMockActions } from '@ngrx/effects/testing'
import { StoreModule } from '@ngrx/store'
import { hot } from 'jasmine-marbles'
import { Observable, of } from 'rxjs'
import {
  AddResults,
  ClearResults,
  PatchResultsAggregations,
  RequestMoreOnAggregation,
  RequestMoreResults,
  SetFilters,
  SetResultsAggregations,
  SetResultsHits,
  SetSearch,
  SetSortBy,
  UpdateFilters,
} from './actions'
import { SearchEffects } from './effects'
import { ES_FIXTURE_AGGS_REQUEST } from '../elasticsearch/fixtures/aggregations-request'
import { initialState, reducer, SEARCH_FEATURE_KEY } from './reducer'

const initialStateSearchMock = initialState[DEFAULT_SEARCH_KEY]
const initialStateMock = {
  ...initialState,
  [DEFAULT_SEARCH_KEY]: {
    ...initialStateSearchMock,
    config: {
      aggregations: ES_FIXTURE_AGGS_REQUEST,
    },
  },
  main: {
    ...initialStateSearchMock,
  },
}

const searchServiceMock = {
  search: () => of({ hits: { hits: [] }, aggregations: { abc: {} } }), // TODO: use a fixture here
  configuration: {
    basePath: 'http://geonetwork/srv/api',
  },
}
const authServiceMock = {
  authReady: () => of(true),
}
const esMapperMock = {
  toRecordSummary: () => [],
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
          initialState: initialStateMock,
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
        {
          provide: ElasticsearchMapper,
          useValue: esMapperMock,
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
      const expected = hot('-(bc)', {
        b: new ClearResults(),
        c: new RequestMoreResults(),
      })

      expect(effects.clearResults$).toBeObservable(expected)
    })
    it('clear results list on setFilters action', () => {
      actions$ = hot('-a---', {
        a: new SetFilters({ any: 'abcd', other: 'ef' }),
      })
      const expected = hot('-(bc)', {
        b: new ClearResults(),
        c: new RequestMoreResults(),
      })

      expect(effects.clearResults$).toBeObservable(expected)
    })
    it('clear results list on updateFilters action', () => {
      actions$ = hot('-a---', { a: new UpdateFilters({ any: 'abcd' }) })
      const expected = hot('-(bc)', {
        b: new ClearResults(),
        c: new RequestMoreResults(),
      })

      expect(effects.clearResults$).toBeObservable(expected)
    })
    it('clear results list on setSearch action', () => {
      actions$ = hot('-a---', {
        a: new SetSearch({ filters: { any: 'abcd' } }, 'main'),
      })
      const expected = hot('-(bc)', {
        b: new ClearResults('main'),
        c: new RequestMoreResults('main'),
      })

      expect(effects.clearResults$).toBeObservable(expected)
    })
  })

  describe('scroll$', () => {
    it('clear results list on sortBy action', () => {
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
      const expected = hot('-(bcd)-', {
        b: new AddResults([]),
        c: new SetResultsAggregations({ abc: {} }),
        d: new SetResultsHits(undefined),
      })

      expect(effects.loadResults$).toBeObservable(expected)
    })

    it('propagate action search id', () => {
      actions$ = hot('-a-', { a: new RequestMoreResults('main') })
      const expected = hot('-(bcd)-', {
        b: new AddResults([], 'main'),
        c: new SetResultsAggregations({ abc: {} }, 'main'),
        d: new SetResultsHits(undefined, 'main'),
      })

      expect(effects.loadResults$).toBeObservable(expected)
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

      expect(effects.upateRequestAggregationTerm$).toBeObservable(expected)
    })
  })
})
