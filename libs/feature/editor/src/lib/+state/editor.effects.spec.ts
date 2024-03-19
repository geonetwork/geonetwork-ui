import { TestBed } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { Action } from '@ngrx/store'
import { provideMockStore } from '@ngrx/store/testing'
import { hot } from 'jasmine-marbles'
import { Observable, of, throwError } from 'rxjs'
import * as EditorActions from './editor.actions'
import { EditorEffects } from './editor.effects'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { EditorService } from '../services/editor.service'

class EditorServiceMock {
  loadRecordByUuid = jest.fn(() => of(DATASET_RECORDS[0]))
  saveRecord = jest.fn((record) => of(record))
}

describe('EditorEffects', () => {
  let actions: Observable<Action>
  let effects: EditorEffects
  let service: EditorService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        EditorEffects,
        provideMockActions(() => actions),
        provideMockStore({
          initialState: {
            editor: {
              record: DATASET_RECORDS[0],
              loading: false,
              loadError: null,
              saving: false,
              saveError: null,
              changedSinceSave: false,
            },
          },
        }),
        {
          provide: EditorService,
          useClass: EditorServiceMock,
        },
      ],
    })

    service = TestBed.inject(EditorService)
    effects = TestBed.inject(EditorEffects)
  })

  describe('saveRecord$', () => {
    describe('when api success', () => {
      it('dispatch saveRecordSuccess', () => {
        actions = hot('-a---|', {
          a: EditorActions.saveRecord(),
        })
        const expected = hot('-(ab)|', {
          a: EditorActions.saveRecordSuccess(),
          b: EditorActions.openRecord({ record: DATASET_RECORDS[0] }),
        })
        expect(effects.saveRecord$).toBeObservable(expected)
      })
    })

    describe('when api fails', () => {
      beforeEach(() => {
        service.saveRecord = jest.fn(() =>
          throwError(() => new Error('oopsie'))
        )
      })
      it('dispatch saveRecordFailure', () => {
        actions = hot('-a-|', {
          a: EditorActions.saveRecord(),
        })
        const expected = hot('-a-|', {
          a: EditorActions.saveRecordFailure({ error: 'oopsie' }),
        })
        expect(effects.saveRecord$).toBeObservable(expected)
      })
    })
  })

  describe('markAsChanged$', () => {
    it('dispatch markRecordAsChanged', () => {
      actions = hot('-a-|', {
        a: EditorActions.updateRecordField({
          field: 'title',
          value: 'Hello world',
        }),
      })
      const expected = hot('-a-|', {
        a: EditorActions.markRecordAsChanged(),
      })
      expect(effects.markAsChanged$).toBeObservable(expected)
    })
  })
})
