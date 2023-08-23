import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import * as MdViewActions from './mdview.actions'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/records-repository.interface'

@Injectable()
export class MdViewEffects {
  constructor(
    private actions$: Actions,
    private recordsRepository: RecordsRepositoryInterface
  ) {}

  loadFull$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MdViewActions.loadFullMetadata),
      switchMap(({ uuid }) =>
        this.recordsRepository.getByUniqueIdentifier(uuid)
      ),
      map((record) => {
        if (record === null) {
          return MdViewActions.loadFullFailure({ notFound: true })
        }
        return MdViewActions.loadFullSuccess({ full: record })
      }),
      catchError((error) =>
        of(MdViewActions.loadFullFailure({ otherError: error.message }))
      )
    )
  )

  loadRelatedRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MdViewActions.loadFullSuccess),
      switchMap(({ full }) => this.recordsRepository.getSimilarRecords(full)),
      map((related) => {
        return MdViewActions.setRelated({ related })
      }),
      catchError((error) => of(MdViewActions.setRelated({ related: null })))
    )
  )
}
