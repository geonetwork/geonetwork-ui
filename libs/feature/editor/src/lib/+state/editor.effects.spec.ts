import { TestBed } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { Action } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { getTestScheduler, hot } from 'jasmine-marbles'
import { firstValueFrom, Observable, of, throwError } from 'rxjs'
import * as EditorActions from './editor.actions'
import { EditorEffects } from './editor.effects'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { EditorService } from '../services/editor.service'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { EditorPartialState } from './editor.reducer'
import { MockProvider } from 'ng-mocks'
import { Gn4PlatformService } from '@geonetwork-ui/api/repository'

class EditorServiceMock {
  saveRecord = jest.fn((record) => of([record, '<xml>blabla</xml>']))
  saveRecordAsDraft = jest.fn(() => of('<xml>blabla</xml>'))
  hasRecordChangedSinceDraft = jest.fn((record) => of(['change1', 'change2']))
}
class RecordsRepositoryMock {
  recordHasDraft = jest.fn(() => true)
}

const initialEditorState = {
  record: datasetRecordsFixture()[0],
  recordSource: '<xml>blabla</xml>',
  saving: false,
  saveError: null,
  changedSinceSave: false,
  alreadySavedOnce: true,
  editorConfig: [],
  currentPage: 0,
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
        provideMockStore<EditorPartialState>({
          initialState: {
            editor: initialEditorState,
          },
        }),
        {
          provide: EditorService,
          useClass: EditorServiceMock,
        },
        {
          provide: RecordsRepositoryInterface,
          useClass: RecordsRepositoryMock,
        },
        MockProvider(Gn4PlatformService, {
          cleanRecordAttachments: jest.fn(() => of(undefined)),
        }),
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
            record: datasetRecordsFixture()[0],
            alreadySavedOnce: true,
            recordSource: '<xml>blabla</xml>',
          }),
        })
        expect(effects.saveRecord$).toBeObservable(expected)
        expect(service.saveRecord).toHaveBeenCalledWith(
          datasetRecordsFixture()[0],
          '<xml>blabla</xml>',
          [],
          false
        )
      })
      it('asks for a new unique identifier if the record was never saved', async () => {
        const store = TestBed.inject(MockStore)
        store.setState({
          editor: {
            ...initialEditorState,
            alreadySavedOnce: false,
          },
        })
        actions = of(EditorActions.saveRecord())
        await firstValueFrom(effects.saveRecord$)
        expect(service.saveRecord).toHaveBeenCalledWith(
          datasetRecordsFixture()[0],
          '<xml>blabla</xml>',
          [],
          true
        )
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
          a: EditorActions.saveRecordFailure({ error: new Error('oopsie') }),
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
            b: EditorActions.draftSaveSuccess(),
          })
        )
        expect(service.saveRecordAsDraft).toHaveBeenCalledWith(
          datasetRecordsFixture()[0],
          '<xml>blabla</xml>'
        )
      })
    })
  })

  describe('checkHasChangesOnOpen$', () => {
    describe('if the record has a draft', () => {
      it('dispatch markRecordAsChanged', () => {
        actions = hot('-a-|', {
          a: EditorActions.openRecord({
            record: datasetRecordsFixture()[0],
            alreadySavedOnce: true,
          }),
        })
        const expected = hot('-a-|', {
          a: EditorActions.markRecordAsChanged(),
        })
        expect(effects.checkHasChangesOnOpen$).toBeObservable(expected)
      })
    })
    describe('if the record has no draft', () => {
      beforeEach(() => {
        ;(
          TestBed.inject(RecordsRepositoryInterface).recordHasDraft as jest.Mock
        ).mockImplementationOnce(() => false)
      })
      it('dispatches nothing', () => {
        actions = hot('-a-|', {
          a: EditorActions.openRecord({
            record: datasetRecordsFixture()[0],
            alreadySavedOnce: true,
          }),
        })
        const expected = hot('---|')
        expect(effects.checkHasChangesOnOpen$).toBeObservable(expected)
      })
    })
  })
  describe('hasRecordChangedSinceDraft$', () => {
    it('dispatches hasRecordChangedSinceDraftSuccess on success', () => {
      const record = datasetRecordsFixture()[0]
      actions = hot('-a-|', {
        a: EditorActions.hasRecordChangedSinceDraft({ record }),
      })
      const expected = hot('-a-|', {
        a: EditorActions.hasRecordChangedSinceDraftSuccess({
          changes: ['change1', 'change2'],
        }),
      })
      expect(effects.hasRecordChangedSinceDraft$).toBeObservable(expected)
      expect(service.hasRecordChangedSinceDraft).toHaveBeenCalledWith(record)
    })
  })
})
