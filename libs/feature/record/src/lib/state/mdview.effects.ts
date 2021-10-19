import { Injectable } from '@angular/core'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import {
  ElasticsearchMapper,
  ElasticsearchService,
  EsSearchResponse,
} from '@geonetwork-ui/util/shared'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import * as MdViewActions from './mdview.actions'
import { LINKS_FIXTURE } from './fixture'

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
      map((response: EsSearchResponse) => {
        const records = this.esMapper.toRecords(response)
        const full = records[0]
        //ADD FIXTURE FOR DEV
        full.links = full.links
          ? [...full.links, ...LINKS_FIXTURE]
          : LINKS_FIXTURE
        console.log(full.links)
        //END FIXTURE
        return MdViewActions.loadFullSuccess({ full })
      }),
      catchError((error) => of(MdViewActions.loadFullFailure({ error })))
    )
  )
}
