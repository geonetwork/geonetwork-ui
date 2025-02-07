import { NgModule } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { EffectsModule } from '@ngrx/effects'
import { Store, StoreModule } from '@ngrx/store'
import * as EditorActions from './editor.actions'
import { EditorFacade } from './editor.facade'
import {
  EDITOR_FEATURE_KEY,
  EditorState,
  initialEditorState,
} from './editor.reducer'
import { provideMockStore } from '@ngrx/store/testing'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'

interface TestSchema {
  editor: EditorState
}

describe('EditorFacade', () => {
  let facade: EditorFacade
  let store: Store<TestSchema>

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [],
        providers: [
          EditorFacade,
          provideMockStore({
            initialState: {
              [EDITOR_FEATURE_KEY]: initialEditorState,
            },
          }),
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] })

      store = TestBed.inject(Store)
      facade = TestBed.inject(EditorFacade)
    })

    it('openRecord() should dispatch openRecord action and set the currentPage to 0', () => {
      const spy = jest.spyOn(store, 'dispatch')
      facade.openRecord(datasetRecordsFixture()[0], '')
      const action = EditorActions.openRecord({
        record: datasetRecordsFixture()[0],
        recordSource: '',
      })
      const setPage = EditorActions.setCurrentPage({ page: 0 })
      expect(spy).toHaveBeenCalledWith(action)
      expect(spy).toHaveBeenCalledWith(setPage)
    })

    it('saveRecord() should dispatch saveRecord action', () => {
      const spy = jest.spyOn(store, 'dispatch')
      facade.saveRecord()
      const action = EditorActions.saveRecord()
      expect(spy).toHaveBeenCalledWith(action)
    })

    it('updateRecordField() should dispatch updateRecordField action', () => {
      const spy = jest.spyOn(store, 'dispatch')
      facade.updateRecordField('title', 'new title')
      const action = EditorActions.updateRecordField({
        field: 'title',
        value: 'new title',
      })
      expect(spy).toHaveBeenCalledWith(action)
    })
    it('checkHasRecordChanged() should dispatch hasRecordChangedSinceDraft action', () => {
      const spy = jest.spyOn(store, 'dispatch')
      const record = datasetRecordsFixture()[0]
      facade.checkHasRecordChanged(record)
      const action = EditorActions.hasRecordChangedSinceDraft({ record })
      expect(spy).toHaveBeenCalledWith(action)
    })
    it('isPublished() should dispatch isPublished action', () => {
      const spy = jest.spyOn(store, 'dispatch')
      facade.isPublished(false)
      const action = EditorActions.isPublished({
        isPublished: false,
      })
      expect(spy).toHaveBeenCalledWith(action)
    })
    it('canEditRecord() should dispatch canEditRecord action', () => {
      const spy = jest.spyOn(store, 'dispatch')
      facade.canEditRecord(true)
      const action = EditorActions.canEditRecord({
        canEditRecord: true,
      })
      expect(spy).toHaveBeenCalledWith(action)
    })
  })
})
