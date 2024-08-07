import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { debounceTime, filter, of, withLatestFrom } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import * as EditorActions from './editor.actions'
import { EditorService } from '../services/editor.service'
import { Store } from '@ngrx/store'
import {
  selectEditorConfig,
  selectRecord,
  selectRecordAlreadySavedOnce,
} from './editor.selectors'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'

@Injectable()
export class EditorEffects {
  private actions$ = inject(Actions)
  private editorService = inject(EditorService)
  private recordsRepository = inject(RecordsRepositoryInterface)
  private store = inject(Store)

  saveRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.saveRecord),
      withLatestFrom(
        this.store.select(selectRecord),
        this.store.select(selectEditorConfig),
        this.store.select(selectRecordAlreadySavedOnce)
      ),
      switchMap(([, record, fieldsConfig, alreadySavedOnce]) =>
        this.editorService
          .saveRecord(record, fieldsConfig, !alreadySavedOnce)
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
                  error: error.message,
                })
              )
            )
          )
      )
    )
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
      withLatestFrom(this.store.select(selectRecord)),
      switchMap(([, record]) => this.editorService.saveRecordAsDraft(record)),
      map(() => EditorActions.draftSaveSuccess())
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
}
