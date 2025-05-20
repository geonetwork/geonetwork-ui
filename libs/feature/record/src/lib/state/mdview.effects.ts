import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { exhaustMap, mergeMap, of } from 'rxjs'
import { catchError, filter, map, switchMap } from 'rxjs/operators'
import * as MdViewActions from './mdview.actions'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { Router } from '@angular/router'
@Injectable()
export class MdViewEffects {
  constructor(
    private actions$: Actions,
    private recordsRepository: RecordsRepositoryInterface,
    private platformServiceInterface: PlatformServiceInterface,
    private router: Router
  ) {}

  /*
    Metadata effects
  */
  loadFullMetadata$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MdViewActions.loadFullMetadata),
      switchMap(({ uuid }) => this.recordsRepository.getRecord(uuid)),
      map((record) => {
        if (record === null || !this.router.url.includes(record.kind)) {
          return MdViewActions.loadFullMetadataFailure({ notFound: true })
        }
        return MdViewActions.loadFullMetadataSuccess({ full: record })
      }),
      catchError((error) =>
        of(MdViewActions.loadFullMetadataFailure({ otherError: error.message }))
      )
    )
  )

  loadFeatureCatalog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MdViewActions.loadFullMetadataSuccess),
      filter(({ full }) => full !== undefined),
      switchMap(({ full }) => this.recordsRepository.getFeatureCatalog(full)),
      map((featureCatalog) =>
        MdViewActions.loadFeatureCatalogSuccess({
          datasetCatalog: featureCatalog,
        })
      ),
      catchError((error) =>
        of(
          MdViewActions.loadFeatureCatalogFailure({
            error: error.message,
          })
        )
      )
    )
  )

  /*
    Related effects
  */
  loadRelatedRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MdViewActions.loadFullMetadataSuccess),
      switchMap(({ full }) => this.recordsRepository.getSimilarRecords(full)),
      map((related) => {
        return MdViewActions.setRelated({ related })
      }),
      catchError((error) => of(MdViewActions.setRelated({ related: null })))
    )
  )

  loadSources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MdViewActions.loadFullMetadataSuccess),
      switchMap(({ full }) => this.recordsRepository.getSources(full)),
      map((sources) => {
        return MdViewActions.setSources({ sources })
      }),
      catchError(() => of(MdViewActions.setSources({ sources: null })))
    )
  )

  loadSourceOf$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MdViewActions.loadFullMetadataSuccess),
      switchMap(({ full }) => this.recordsRepository.getSourceOf(full)),
      map((sourceOf) => {
        return MdViewActions.setSourceOf({ sourceOf })
      }),
      catchError(() => of(MdViewActions.setSourceOf({ sourceOf: null })))
    )
  )

  /*
    UserFeedback effects
  */
  loadUserFeedbacks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MdViewActions.loadUserFeedbacks),
      exhaustMap(({ datasetUuid }) =>
        this.platformServiceInterface.getUserFeedbacks(datasetUuid).pipe(
          map((userFeedbacks) =>
            MdViewActions.loadUserFeedbacksSuccess({ userFeedbacks })
          ),
          catchError((error) =>
            of(
              MdViewActions.loadUserFeedbacksFailure({
                otherError: error.message,
              })
            )
          )
        )
      )
    )
  )

  reloadUserFeedbacks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MdViewActions.addUserFeedbackSuccess),
      exhaustMap(({ datasetUuid }) =>
        this.platformServiceInterface.getUserFeedbacks(datasetUuid).pipe(
          map((userFeedbacks) =>
            MdViewActions.loadUserFeedbacksSuccess({ userFeedbacks })
          ),
          catchError((error) =>
            of(
              MdViewActions.loadUserFeedbacksFailure({
                otherError: error.message,
              })
            )
          )
        )
      )
    )
  )

  addUserFeedback$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MdViewActions.addUserFeedback),
      mergeMap((action) =>
        this.platformServiceInterface
          .postUserFeedbacks(action.userFeedback)
          .pipe(
            map(() =>
              MdViewActions.addUserFeedbackSuccess({
                datasetUuid: action.userFeedback.metadataUUID,
              })
            ),
            catchError((error) => {
              return of(
                MdViewActions.addUserFeedbackFailure({
                  otherError: error.message,
                })
              )
            })
          )
      )
    )
  )
}
