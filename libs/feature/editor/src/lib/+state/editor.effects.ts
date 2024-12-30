import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { debounceTime, EMPTY, filter, of, withLatestFrom } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import * as EditorActions from './editor.actions'
import { EditorService } from '../services/editor.service'
import { Store } from '@ngrx/store'
import {
  selectEditorConfig,
  selectRecord,
  selectRecordAlreadySavedOnce,
  selectRecordSource,
} from './editor.selectors'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { Gn4PlatformService } from '@geonetwork-ui/api/repository'

@Injectable()
export class EditorEffects {
  private actions$ = inject(Actions)
  private editorService = inject(EditorService)
  private recordsRepository = inject(RecordsRepositoryInterface)
  private gn4PlateformService = inject(Gn4PlatformService)
  private store = inject(Store)

  saveRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.saveRecord),
      withLatestFrom(
        this.store.select(selectRecord),
        this.store.select(selectRecordSource),
        this.store.select(selectEditorConfig),
        this.store.select(selectRecordAlreadySavedOnce)
      ),
      switchMap(([, record, recordSource, fieldsConfig, alreadySavedOnce]) =>
        this.editorService
          .saveRecord(record, recordSource, fieldsConfig, !alreadySavedOnce)
          .pipe(
            switchMap(([record, recordSource]) =>
              of(
                EditorActions.saveRecordSuccess(),
                EditorActions.openRecord({
                  record,
                  alreadySavedOnce: true,
                  recordSource,
                })
              )
            ),
            catchError((error) =>
              of(
                EditorActions.saveRecordFailure({
                  error,
                })
              )
            )
          )
      )
    )
  )

  cleanRecordAttachments$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EditorActions.saveRecordSuccess),
        withLatestFrom(this.store.select(selectRecord)),
        switchMap(([_, record]) => {
          this.gn4PlateformService.cleanRecordAttachments(record).subscribe({
            next: (_) => undefined,
            error: (err) => {
              console.error(err)
            },
          })
          return EMPTY
        }),
        catchError((error) => {
          console.error(error)
          return EMPTY
        })
      ),
    { dispatch: false }
  )

  markAsChanged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.updateRecordField),
      map(() => EditorActions.markRecordAsChanged())
    )
  )

  saveRecordDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.updateRecordField),
      debounceTime(1000),
      withLatestFrom(
        this.store.select(selectRecord),
        this.store.select(selectRecordSource)
      ),
      switchMap(([, record, recordSource]) =>
        this.editorService.saveRecordAsDraft(record, recordSource)
      ),
      map(() => EditorActions.draftSaveSuccess())
    )
  )

  undoRecordDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.undoRecordDraft),
      withLatestFrom(this.store.select(selectRecord)),
      switchMap(([, record]) => this.editorService.undoRecordDraft(record)),
      map(([record, recordSource, alreadySavedOnce]) =>
        EditorActions.openRecord({
          record,
          alreadySavedOnce,
          recordSource,
        })
      )
    )
  )

  checkHasChangesOnOpen$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.openRecord),
      map(({ record }) =>
        this.recordsRepository.recordHasDraft(record.uniqueIdentifier)
      ),
      filter((hasDraft) => hasDraft),
      map(() => EditorActions.markRecordAsChanged())
    )
  )

  hasRecordChangedSinceDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.hasRecordChangedSinceDraft),
      switchMap(({ record }) =>
        this.editorService
          .hasRecordChangedSinceDraft(record)
          .pipe(
            map((changes) =>
              EditorActions.hasRecordChangedSinceDraftSuccess({ changes })
            )
          )
      )
    )
  )
}
