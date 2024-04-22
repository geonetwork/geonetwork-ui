import { TestBed } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { Action } from '@ngrx/store'
import { provideMockStore } from '@ngrx/store/testing'
import { getTestScheduler, hot } from 'jasmine-marbles'
import { Observable, of, throwError } from 'rxjs'
import * as EditorActions from './editor.actions'
import { EditorEffects } from './editor.effects'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { EditorService } from '../services/editor.service'

class EditorServiceMock {
  saveRecord = jest.fn((record) => of([record, '<xml>blabla</xml>']))
  saveRecordAsDraft = jest.fn(() => of('<xml>blabla</xml>'))
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
          b: EditorActions.openRecord({
            record: DATASET_RECORDS[0],
            alreadySavedOnce: true,
            recordSource: '<xml>blabla</xml>',
          }),
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

  describe('saveRecordDraft$', () => {
    it('does not dispatch any action', () => {
      actions = hot('-a-', {
        a: EditorActions.updateRecordField({
          field: 'title',
          value: 'Hello world',
        }),
      })
      expect(effects.saveRecordDraft$).toBeObservable(hot('---'))
      expect(service.saveRecordAsDraft).not.toHaveBeenCalled()
    })
    it('calls editorService.saveRecordAsDraft after 1000ms', () => {
      getTestScheduler().run(() => {
        actions = hot('a-a 1050ms -', {
          a: EditorActions.updateRecordField({
            field: 'title',
            value: 'Hello world',
          }),
        })
        expect(effects.saveRecordDraft$).toBeObservable(
          hot('--- 999ms b', {
            b: '<xml>blabla</xml>', // this is emitted by the observable but not dispatched as an action
          })
        )
        expect(service.saveRecordAsDraft).toHaveBeenCalledWith(
          DATASET_RECORDS[0]
        )
      })
    })
  })
})
