import { Injectable } from '@angular/core'
import { SearchApiService } from '../../../../gn-api/src'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { SearchResponse } from 'elasticsearch'
import {
  AddResults,
  ClearResults,
  REQUEST_MORE_RESULTS,
  RequestMoreResults,
  SORT_BY,
  UPDATE_PARAMS,
} from './actions'
import { map, switchMap, withLatestFrom } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { getSearchParams, getSearchSortBy } from './selectors'
import { SearchState, RESULTS_PAGE_SIZE, RecordSimple } from '../model'
import { select, Store } from '@ngrx/store'
import { of } from 'rxjs'

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private searchService: SearchApiService,
    private store$: Store<SearchState>
  ) {}

  clearResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SORT_BY, UPDATE_PARAMS),
      switchMap(() => of(new ClearResults(), new RequestMoreResults()))
    )
  )

  loadResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(REQUEST_MORE_RESULTS),
      withLatestFrom(
        this.store$.pipe(select(getSearchSortBy)),
        this.store$.pipe(select(getSearchParams))
      ),
      switchMap(([_, sortBy, params]) =>
        this.searchService.call(
          '_search',
          'bucket',
          JSON.stringify({
            from: 0,
            size: RESULTS_PAGE_SIZE,
            sort: sortBy ? [sortBy] : undefined,
            query: {
              bool: { must: [{ query_string: { query: params.any || '*' } }] },
            },
          })
        )
      ),
      map<any, RecordSimple[]>((response: SearchResponse<any>) =>
        response.hits.hits.map((hit) => ({
          title: hit._source.resourceTitleObject
            ? hit._source.resourceTitleObject.default
            : 'no title',
          abstract: hit._source.resourceAbstractObject
            ? hit._source.resourceAbstractObject.default
            : 'no abstract',
          thumbnailUrl: hit._source.overview ? hit._source.overview.url : '',
          url: `/geonetwork/srv/eng/catalog.search#/metadata/${hit._source.uuid}`,
        }))
      ),
      map((records: RecordSimple[]) => new AddResults(records))
    )
  )
}
