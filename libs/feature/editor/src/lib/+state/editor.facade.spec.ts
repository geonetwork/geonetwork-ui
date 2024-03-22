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
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'

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

    it('openRecord() should dispatch openRecord action', () => {
      const spy = jest.spyOn(store, 'dispatch')
      facade.openRecord(DATASET_RECORDS[0])
      const action = EditorActions.openRecord({ record: DATASET_RECORDS[0] })
      expect(spy).toHaveBeenCalledWith(action)
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
  })
})
