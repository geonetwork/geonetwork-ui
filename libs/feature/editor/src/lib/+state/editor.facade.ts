import { inject, Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as EditorActions from './editor.actions'
import * as EditorSelectors from './editor.selectors'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { filter } from 'rxjs'

@Injectable()
export class EditorFacade {
  private readonly store = inject(Store)

  record$ = this.store.pipe(select(EditorSelectors.selectRecord))
  saving$ = this.store.pipe(select(EditorSelectors.selectRecordSaving))
  saveError$ = this.store.pipe(
    select(EditorSelectors.selectRecordSaveError),
    filter((error) => !!error)
  )
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
