import { Injectable } from '@angular/core'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { ElasticsearchMapper } from '@geonetwork-ui/feature/search'
import {
  ElasticsearchService,
  EsSearchResponse,
} from '@geonetwork-ui/util/shared'
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

  loadFull$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MdViewActions.loadFullMetadata),
      switchMap(({ uuid }) =>
        this.searchService.search(
          'bucket',
          JSON.stringify(this.esService.getMetadataByIdPayload(uuid))
        )
      ),
      switchMap((response: EsSearchResponse) =>
        this.esMapper.toRecords(response)
      ),
      map((records) => {
        const full = records[0]
        if (records.length === 0) {
          return MdViewActions.loadFullFailure({ notFound: true })
        }
        return MdViewActions.loadFullSuccess({ full })
      }),
      catchError((error) =>
        of(MdViewActions.loadFullFailure({ otherError: error.message }))
      )
    )
  )

  loadRelatedRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MdViewActions.loadFullSuccess),
      switchMap(({ full }) =>
        this.searchService.search(
          'bucket',
          JSON.stringify(
            this.esService.getRelatedRecordPayload(full.title, full.uuid, 3)
          )
        )
      ),
      switchMap((response: EsSearchResponse) =>
        this.esMapper.toRecords(response)
      ),
      map((related) => {
        return MdViewActions.setRelated({ related })
      }),
      catchError((error) => of(MdViewActions.setRelated({ related: null })))
    )
  )
}
