import { Injectable } from '@angular/core'
import { AuthService } from '@lib/auth'
import { SearchApiService } from '@lib/gn-api'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { SearchResponse } from 'elasticsearch'
import { of } from 'rxjs'
import { flatMap, map, switchMap, withLatestFrom } from 'rxjs/operators'
import { ElasticsearchMetadataModels } from '../elasticsearch/constant'
import { ElasticsearchMapper } from '../elasticsearch/elasticsearch.mapper'
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service'
import {
  AddResults,
  CLEAR_PAGINATION,
  ClearPagination,
  ClearResults,
  PAGINATE,
  PatchResultsAggregations,
  REQUEST_MORE_ON_AGGREGATION,
  REQUEST_MORE_RESULTS,
  RequestMoreOnAggregation,
  RequestMoreResults,
  SCROLL,
  SearchActions,
  SET_FILTERS,
  SET_INCLUDE_ON_AGGREGATION,
  SET_PAGINATION,
  SET_SEARCH,
  SET_SORT_BY,
  SetIncludeOnAggregation,
  SetResultsAggregations,
  SetResultsHits,
  UPDATE_FILTERS,
  UPDATE_REQUEST_AGGREGATION_TERM,
  UpdateRequestAggregationTerm,
} from './actions'
import { SearchState } from './reducer'
import { getSearchStateSearch } from './selectors'

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchApiService,
    private store$: Store<SearchState>,
    private authService: AuthService,
    private esService: ElasticsearchService,
    private esMapper: ElasticsearchMapper
  ) {}

  clearResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SET_SORT_BY,
        SET_FILTERS,
        UPDATE_FILTERS,
        SET_SEARCH,
        SET_PAGINATION,
        PAGINATE
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
      // flatMap is used because of multiple search concerns
      // TODO: should implement our own switchMap to filter by searchId
      switchMap((action: SearchActions) =>
        this.authService.authReady().pipe(
          withLatestFrom(
            this.store$.pipe(select(getSearchStateSearch, action.id))
          ),
          switchMap(([_, state]) =>
            this.searchService.search(
              'bucket',
              JSON.stringify(
                this.esService.getSearchRequestBody(
                  state,
                  ElasticsearchMetadataModels.BRIEF
                )
              )
            )
          ),
          switchMap((response: SearchResponse<any>) => {
            const records = this.esMapper.toRecordBrief(
              response,
              this.searchService.configuration.basePath
            )
            const aggregations = response.aggregations
            return [
              new AddResults(records, action.id),
              new SetResultsAggregations(aggregations, action.id),
              new SetResultsHits(response.hits.total, action.id),
            ]
          })
        )
      ) // wait for auth to be known
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
          withLatestFrom(this.store$.pipe(select(getSearchStateSearch))),
          switchMap(([_, state]) =>
            this.searchService.search(
              'bucket',
              JSON.stringify(
                this.esService.buildMoreOnAggregationPayload(state, action.key)
              )
            )
          ),
          map((response: SearchResponse<any>) => {
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
