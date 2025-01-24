import { Inject, Injectable, Optional } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { buffer, combineLatestWith, debounceTime, from, of, tap } from 'rxjs'
import {
  catchError,
  map,
  shareReplay,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs/operators'
import {
  AddResults,
  ClearError,
  ClearResults,
  Paginate,
  PAGINATE,
  PatchResultsAggregations,
  REQUEST_MORE_ON_AGGREGATION,
  REQUEST_MORE_RESULTS,
  REQUEST_NEW_RESULTS,
  RequestMoreOnAggregation,
  RequestNewResults,
  SearchActions,
  SET_FAVORITES_ONLY,
  SET_FILTERS,
  SET_INCLUDE_ON_AGGREGATION,
  SET_PAGE_SIZE,
  SET_SEARCH,
  SET_SORT_BY,
  SET_SPATIAL_FILTER_ENABLED,
  SetError,
  SetIncludeOnAggregation,
  SetResultsAggregations,
  SetResultsHits,
  UPDATE_FILTERS,
} from './actions'
import { SearchState, SearchStateSearch } from './reducer'
import { getSearchStateSearch } from './selectors'
import { HttpErrorResponse } from '@angular/common/http'
import { switchMapWithSearchId } from '../utils/operators/search.operator'
import { Geometry } from 'geojson'
import { FILTER_GEOMETRY } from '../filter-geometry.token'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { FavoritesService } from '@geonetwork-ui/api/repository'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { valid as validGeoJson } from 'geojson-validation'

@Injectable()
export class SearchEffects {
  filterGeometry$ = this.filterGeometry
    ? from(this.filterGeometry).pipe(shareReplay())
    : undefined

  constructor(
    private actions$: Actions,
    private store$: Store<SearchState>,
    private recordsRepository: RecordsRepositoryInterface,
    private favoritesService: FavoritesService,
    private platformService: PlatformServiceInterface,
    @Optional()
    @Inject(FILTER_GEOMETRY)
    private filterGeometry: Promise<Geometry>
  ) {}

  resetPagination$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SET_FILTERS,
        UPDATE_FILTERS,
        SET_SEARCH,
        SET_FAVORITES_ONLY,
        SET_SPATIAL_FILTER_ENABLED
      ),
      map((action: SearchActions) => new Paginate(1, action.id))
    )
  )

  private actionsWithNewResults$ = this.actions$.pipe(
    ofType(
      SET_SORT_BY,
      SET_FILTERS,
      UPDATE_FILTERS,
      SET_SEARCH,
      SET_FAVORITES_ONLY,
      SET_SPATIAL_FILTER_ENABLED,
      PAGINATE,
      SET_PAGE_SIZE
    )
  )

  requestNewResults$ = createEffect(() =>
    this.actionsWithNewResults$.pipe(
      // this will aggregate actions until the debounceTime ticks
      buffer(this.actionsWithNewResults$.pipe(debounceTime(0))),
      switchMap((actions: SearchActions[]) => {
        // once we have a list of actions emitted since last time, we can split them by search id
        const requestNewResults = actions
          .map((action) => action.id)
          .filter((value, index, array) => array.indexOf(value) === index)
          .map((searchId) => new RequestNewResults(searchId))
        return of(...requestNewResults)
      })
    )
  )

  loadResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(REQUEST_MORE_RESULTS, REQUEST_NEW_RESULTS),
      switchMapWithSearchId((action: SearchActions) =>
        this.platformService.getMe().pipe(
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
            if (!state.params.useSpatialFilter || !this.filterGeometry$) {
              return of([state, favorites, undefined])
            }
            return this.filterGeometry$.pipe(
              tap((geom) => {
                if (!geom) return
                try {
                  const trace = validGeoJson(geom, true) as string[]
                  if (trace?.length > 0) {
                    throw new Error(trace.join('\n'))
                  }
                } catch (error) {
                  console.warn(
                    'Error while parsing the geometry filter\n',
                    error
                  )
                  throw new Error()
                }
              }),
              map((geom) => [state, favorites, geom]),
              catchError((e) => {
                return of([state, favorites, undefined])
              })
            )
          }),
          switchMap(
            ([state, favorites, geometry]: [
              SearchStateSearch,
              string[],
              Geometry | undefined,
            ]) => {
              const { currentPage, pageSize, sort } = state.params
              const filters = {
                ...state.config.filters,
                ...state.params.filters,
              }
              const results$ = this.recordsRepository.search({
                filters,
                offset: currentPage * pageSize,
                limit: pageSize,
                sort,
                fields: state.config.source,
                filterIds:
                  state.params.favoritesOnly && favorites
                    ? favorites
                    : undefined,
                filterGeometry: geometry ?? undefined,
              })
              const aggregations$ = this.recordsRepository.aggregate(
                state.config.aggregations
              )
              return results$.pipe(combineLatestWith(aggregations$))
            }
          ),
          switchMap(([results, aggregations]) => {
            const actions: SearchActions[] = [
              new ClearError(action.id),
              new AddResults(results.records, action.id),
              new SetResultsAggregations(aggregations, action.id),
              new SetResultsHits(results.count, action.id),
            ]
            if (action.type === REQUEST_NEW_RESULTS) {
              actions.unshift(new ClearResults(action.id))
            }
            return of(...actions)
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

  updateRequestAggregation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<SetIncludeOnAggregation | RequestMoreOnAggregation>(
        SET_INCLUDE_ON_AGGREGATION,
        REQUEST_MORE_ON_AGGREGATION
      ),
      switchMap((action) =>
        this.platformService.getMe().pipe(
          withLatestFrom(
            this.store$.pipe(select(getSearchStateSearch, action.id))
          ),
          switchMap(([, state]) =>
            this.recordsRepository.aggregate({
              [action.aggregationName]:
                state.config.aggregations[action.aggregationName],
            })
          ),
          map((aggregations) => {
            return new PatchResultsAggregations(
              action.aggregationName,
              aggregations[action.aggregationName],
              action.id
            )
          })
        )
      ) // wait for auth to be known
    )
  })
}
