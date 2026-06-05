import { inject, Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as EditorActions from './editor.actions'
import * as EditorSelectors from './editor.selectors'
import {
  CatalogRecord,
  CatalogRecordKeys,
  LanguageCode,
} from '@geonetwork-ui/common/domain/model/record'
import { filter, map } from 'rxjs'
import { Actions, ofType } from '@ngrx/effects'
import { EditorConfig, EditorFieldIdentification } from '../models'

@Injectable()
export class EditorFacade {
  private readonly store = inject(Store)
  private actions$ = inject(Actions)

  record$ = this.store.pipe(select(EditorSelectors.selectRecord))
  recordSource$ = this.store.pipe(select(EditorSelectors.selectRecordSource))
  saving$ = this.store.pipe(select(EditorSelectors.selectRecordSaving))
  saveError$ = this.store.pipe(
    select(EditorSelectors.selectRecordSaveError),
    filter((error) => !!error)
  )
  saveSuccess$ = this.actions$.pipe(ofType(EditorActions.saveRecordSuccess))
  changedSinceSave$ = this.store.pipe(
    select(EditorSelectors.selectRecordChangedSinceSave)
  )
  currentSections$ = this.store.pipe(
    select(EditorSelectors.selectRecordSections)
  )
  draftSaveSuccess$ = this.actions$.pipe(ofType(EditorActions.draftSaveSuccess))
  currentPage$ = this.store.pipe(select(EditorSelectors.selectCurrentPage))
  editorConfig$ = this.store.pipe(select(EditorSelectors.selectEditorConfig))
  hasRecordChanged$ = this.store.pipe(
    select(EditorSelectors.selectHasRecordChanged)
  )
  isPublished$ = this.store.pipe(select(EditorSelectors.selectIsPublished))
  canEditRecord$ = this.store.pipe(select(EditorSelectors.selectCanEditRecord))
  focusedField$ = this.actions$.pipe(
    ofType(EditorActions.setFocusedField),
    map(({ model }) => model)
  )

  openRecord(record: CatalogRecord, recordSource: string | null) {
    this.store.dispatch(
      EditorActions.openRecord({
        record,
        recordSource,
      })
    )
    this.setCurrentPage(0)
  }

  saveRecord() {
    this.store.dispatch(EditorActions.saveRecord())
  }

  undoRecordDraft() {
    this.store.dispatch(EditorActions.undoRecordDraft())
  }

  updateRecordField(field: string, value: unknown) {
    this.store.dispatch(EditorActions.updateRecordField({ field, value }))
  }

  updateRecordLanguages(
    defaultLanguage: LanguageCode,
    otherLanguages: LanguageCode[]
  ) {
    this.store.dispatch(
      EditorActions.updateRecordLanguages({ defaultLanguage, otherLanguages })
    )
  }

  setConfiguration(configuration: EditorConfig) {
    this.store.dispatch(EditorActions.setEditorConfiguration({ configuration }))
  }

  setCurrentPage(page: number) {
    this.store.dispatch(EditorActions.setCurrentPage({ page }))
  }

  setFocusedField(model: CatalogRecordKeys) {
    this.store.dispatch(EditorActions.setFocusedField({ model }))
  }

  setFieldVisibility(field: EditorFieldIdentification, visible: boolean) {
    this.store.dispatch(EditorActions.setFieldVisibility({ field, visible }))
  }

  checkHasRecordChanged(record: CatalogRecord) {
    this.store.dispatch(EditorActions.hasRecordChangedSinceDraft({ record }))
  }

  isPublished(isPublished: boolean) {
    this.store.dispatch(EditorActions.isPublished({ isPublished }))
  }

  canEditRecord(canEditRecord: boolean) {
    this.store.dispatch(EditorActions.canEditRecord({ canEditRecord }))
  }
}
