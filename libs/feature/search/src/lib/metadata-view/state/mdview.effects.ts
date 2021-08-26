import { Injectable } from '@angular/core'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { ElasticsearchService } from '../../elasticsearch'
import { ElasticsearchMapper } from '../../elasticsearch/mapper'
import { EsSearchResponse } from '@geonetwork-ui/util/shared'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import * as MdViewActions from './mdview.actions'

@Injectable()
export class MdViewEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchApiService,
    private esService: ElasticsearchService,
    private esMapper: ElasticsearchMapper
  ) {}

  loadFromIncomplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MdViewActions.setIncompleteMetadata),
      map(({ incomplete }) =>
        MdViewActions.loadFullMetadata({ uuid: incomplete.uuid })
      )
    )
  )

  loadFull$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MdViewActions.loadFullMetadata),
      switchMap(({ uuid }) =>
        this.searchService.search(
          'bucket',
          JSON.stringify(this.esService.getMetadataByIdPayload(uuid))
        )
      ),
      map((response: EsSearchResponse) => {
        const records = this.esMapper.toRecords(response)
        const full = records[0]
        return MdViewActions.loadFullSuccess({ full })
      }),
      catchError((error) => of(MdViewActions.loadFullFailure({ error })))
    )
  )
}
