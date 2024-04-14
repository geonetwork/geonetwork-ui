import { inject, Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as EditorActions from './editor.actions'
import * as EditorSelectors from './editor.selectors'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { filter, Observable } from 'rxjs'
import { Actions, ofType } from '@ngrx/effects'

@Injectable()
export class EditorFacade {
  private readonly store = inject(Store)
  private actions$ = inject(Actions)

  record$ = this.store.pipe(select(EditorSelectors.selectRecord))
  saving$ = this.store.pipe(select(EditorSelectors.selectRecordSaving))
  saveError$ = this.store.pipe(
    select(EditorSelectors.selectRecordSaveError),
    filter((error) => !!error)
  )
  saveSuccess$ = this.actions$.pipe(ofType(EditorActions.saveRecordSuccess))
  changedSinceSave$ = this.store.pipe(
    select(EditorSelectors.selectRecordChangedSinceSave)
  )
  recordFields$ = this.store.pipe(select(EditorSelectors.selectRecordFields))

  openRecord(record: CatalogRecord) {
    this.store.dispatch(EditorActions.openRecord({ record }))
  }

  saveRecord() {
    this.store.dispatch(EditorActions.saveRecord())
  }

  updateRecordField(field: string, value: unknown) {
    this.store.dispatch(EditorActions.updateRecordField({ field, value }))
  }
}
