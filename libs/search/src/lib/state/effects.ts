import { Injectable } from '@angular/core'
import { AuthService } from '@lib/auth'
import { RecordSimple, RESULTS_PAGE_SIZE } from '@lib/common'
import { SearchApiService } from '@lib/gn-api'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { SearchResponse } from 'elasticsearch'
import { of } from 'rxjs'
import { map, switchMap, withLatestFrom } from 'rxjs/operators'
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service'
import {
  AddResults,
  ClearResults,
  REQUEST_MORE_RESULTS,
  RequestMoreResults,
  SORT_BY,
  UPDATE_PARAMS,
} from './actions'
import { SearchState } from './reducer'
import { getSearchState } from './selectors'

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchApiService,
    private store$: Store<SearchState>,
    private authService: AuthService,
    private esService: ElasticsearchService
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
      switchMap(() => this.authService.authReady()), // wait for auth to be known
      withLatestFrom(this.store$.pipe(select(getSearchState))),
      switchMap(([_, state]) =>
        this.searchService.call(
          '_search',
          'bucket',
          JSON.stringify(this.esService.buildPayload(state))
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
