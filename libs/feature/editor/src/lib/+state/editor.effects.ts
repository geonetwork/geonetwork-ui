import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of, withLatestFrom } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import * as EditorActions from './editor.actions'
import { EditorService } from '../services/editor.service'
import { Store } from '@ngrx/store'
import { selectRecord, selectRecordFieldsConfig } from './editor.selectors'

@Injectable()
export class EditorEffects {
  private actions$ = inject(Actions)
  private editorService = inject(EditorService)
  private store = inject(Store)

  saveRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.saveRecord),
      withLatestFrom(
        this.store.select(selectRecord),
        this.store.select(selectRecordFieldsConfig)
      ),
      switchMap(([, record, fieldsConfig]) =>
        this.editorService.saveRecord(record, fieldsConfig).pipe(
          switchMap((newRecord) =>
            of(
              EditorActions.saveRecordSuccess(),
              EditorActions.openRecord({ record: newRecord })
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
}
