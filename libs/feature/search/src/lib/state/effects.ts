import { Inject, Injectable, Optional } from '@angular/core'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { AuthService } from '@geonetwork-ui/feature/auth'
import { ElasticsearchMapper } from '../utils/mapper'
import {
  ElasticsearchService,
  EsSearchResponse,
} from '@geonetwork-ui/util-shared'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { from, of } from 'rxjs'
import {
  catchError,
  map,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs/operators'
import {
  AddResults,
  ClearError,
  ClearPagination,
  ClearResults,
  PatchResultsAggregations,
  REQUEST_MORE_ON_AGGREGATION,
  REQUEST_MORE_RESULTS,
  RequestMoreOnAggregation,
  RequestMoreResults,
  SCROLL,
  SearchActions,
  SET_FAVORITES_ONLY,
  SET_FILTERS,
  SET_INCLUDE_ON_AGGREGATION,
  SET_SEARCH,
  SET_SORT_BY,
  SET_SPATIAL_FILTER_ENABLED,
  SetError,
  SetIncludeOnAggregation,
  SetResultsAggregations,
  SetResultsHits,
  UPDATE_FILTERS,
  UPDATE_REQUEST_AGGREGATION_TERM,
  UpdateRequestAggregationTerm,
} from './actions'
import { SearchState, SearchStateSearch } from './reducer'
import { getSearchStateSearch } from './selectors'
import { HttpErrorResponse } from '@angular/common/http'
import { switchMapWithSearchId } from '../utils/operators/search.operator'
import { FavoritesService } from '../favorites/favorites.service'
import { Geometry } from 'geojson'
import { FILTER_GEOMETRY } from '../feature-search.module'

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchApiService,
    private store$: Store<SearchState>,
    private authService: AuthService,
    private esService: ElasticsearchService,
    private esMapper: ElasticsearchMapper,
    private favoritesService: FavoritesService,
    @Optional()
    @Inject(FILTER_GEOMETRY)
    private filterGeometry: Promise<Geometry>
  ) {}

  clearResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SET_SORT_BY,
        SET_FILTERS,
        UPDATE_FILTERS,
        SET_SEARCH,
        SET_FAVORITES_ONLY,
        SET_SPATIAL_FILTER_ENABLED
      ),
      switchMap((action: SearchActions) =>
        of(
          new ClearResults(action.id),
          new ClearPagination(action.id),
          new RequestMoreResults(action.id)
        )
      )
    )
  )

  scroll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SCROLL),
      map((action: SearchActions) => new RequestMoreResults(action.id))
    )
  )

  loadResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(REQUEST_MORE_RESULTS),
      switchMapWithSearchId((action: SearchActions) =>
        this.authService.authReady().pipe(
          withLatestFrom(
            this.store$.pipe(select(getSearchStateSearch, action.id))
          ),
          // Note: this could have been integrated in withLatestFrom above but
          // I could not get this to work (maybe a bug in rxjs?)
          switchMap(([, state]) =>
            this.favoritesService.myFavoritesUuid$.pipe(
              take(1),
              map(
                (favorites) =>
                  [state, favorites] as [SearchStateSearch, string[]]
              )
            )
          ),
          switchMap(([state, favorites]) => {
            if (!state.params.useSpatialFilter || !this.filterGeometry) {
              return of([state, favorites, null])
            }
            return from(this.filterGeometry).pipe(
              map((geom) => [state, favorites, geom]),
              catchError(() => of([state, favorites, null])) // silently opt out of spatial filter if an error happens
            )
          }),
          switchMap(
            ([state, favorites, geometry]: [
              SearchStateSearch,
              string[],
              Geometry | null
            ]) =>
              this.searchService.search(
                'bucket',
                JSON.stringify(
                  this.esService.getSearchRequestBody(
                    state.config.aggregations,
                    state.params.size,
                    state.params.from,
                    state.params.sortBy,
                    state.config.source,
                    state.params.filters,
                    state.config.filters,
                    state.params.favoritesOnly ? favorites : null,
                    geometry
                  )
                )
              )
          ),
          switchMap((response: EsSearchResponse) =>
            this.esMapper
              .toRecords(response)
              .pipe(map((records) => [records, response]))
          ),
          switchMap(([records, response]) => {
            const aggregations = response.aggregations
            return [
              new AddResults(records, action.id),
              new SetResultsAggregations(aggregations, action.id),
              new SetResultsHits(response.hits.total, action.id),
              new ClearError(action.id),
            ]
          }),
          catchError((error: HttpErrorResponse | Error) => {
            if ('status' in error) {
              return of(new SetError(error.status, error.message, action.id))
            } else {
              return of(new SetError(0, error.message, action.id))
            }
          })
        )
      )
    )
  )

  loadMoreOnAggregation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<RequestMoreOnAggregation>(REQUEST_MORE_ON_AGGREGATION),
      switchMap((action: RequestMoreOnAggregation) =>
        of(
          new UpdateRequestAggregationTerm(
            action.key,
            {
              increment: action.increment,
            },
            action.id
          )
        )
      )
    )
  })

  setIncludeOnAggregation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<SetIncludeOnAggregation>(SET_INCLUDE_ON_AGGREGATION),
      switchMap((action) =>
        of(
          new UpdateRequestAggregationTerm(
            action.key,
            {
              include: action.include,
            },
            action.id
          )
        )
      )
    )
  })

  updateRequestAggregationTerm$ = createEffect(() => {
    const updateTermAction$ = this.actions$.pipe(
      ofType<UpdateRequestAggregationTerm>(UPDATE_REQUEST_AGGREGATION_TERM)
    )

    return updateTermAction$.pipe(
      switchMap((action) =>
        this.authService.authReady().pipe(
          withLatestFrom(
            this.store$.pipe(select(getSearchStateSearch, action.id))
          ),
          switchMap(([, state]) =>
            this.searchService.search(
              'bucket',
              JSON.stringify(
                this.esService.buildMoreOnAggregationPayload(
                  state.config.aggregations,
                  action.key,
                  state.params.filters,
                  state.config.filters
                )
              )
            )
          ),
          map((response: EsSearchResponse) => {
            const aggregations = response.aggregations
            return new PatchResultsAggregations(
              action.key,
              aggregations,
              action.id
            )
          })
        )
      ) // wait for auth to be known
    )
  })
}
