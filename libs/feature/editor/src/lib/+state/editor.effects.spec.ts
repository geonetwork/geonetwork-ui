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
  saveRecord = jest.fn((record) =>
    of([record, '<xml>blabla</xml>', false, false])
  )
  saveRecordAsDraft = jest.fn(() => of('<xml>blabla</xml>'))
  hasRecordChangedSinceDraft = jest.fn(() => of(['change1', 'change2']))
}
class RecordsRepositoryMock {
  recordHasDraft = jest.fn(() => true)
  getRecordPublicationStatus = jest.fn(() => of(true))
  saveRecord = jest.fn(() => of('uuid'))
  canEditRecord = jest.fn(() => of(true))
}

const initialEditorState = {
  record: datasetRecordsFixture()[0],
  recordSource: '<xml>blabla</xml>',
  saving: false,
  saveError: null,
  changedSinceSave: false,
  editorConfig: [],
  currentPage: 0,
  hasRecordChanged: null,
  isPublished: false,
  canEditRecord: true,
}

describe('EditorEffects', () => {
  let actions: Observable<Action>
  let effects: EditorEffects
  let service: EditorService
  let recordsRepository: RecordsRepositoryInterface

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
    recordsRepository = TestBed.inject(RecordsRepositoryInterface)
  })

  describe('saveRecord$', () => {
    describe('when api success', () => {
      it('dispatch saveRecordSuccess', () => {
        actions = hot('-a---|', {
          a: EditorActions.saveRecord(),
        })
        const expected = hot('-a---|', {
          a: EditorActions.saveRecordSuccess(),
        })
        expect(effects.saveRecord$).toBeObservable(expected)
        expect(service.saveRecord).toHaveBeenCalledWith(
          datasetRecordsFixture()[0],
          '<xml>blabla</xml>',
          []
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
  describe('checkIsRecordPublished$', () => {
    it('should dispatch isPublished action with correct payload', () => {
      const record = datasetRecordsFixture()[0]
      actions = hot('-a-|', {
        a: EditorActions.openRecord({
          record: datasetRecordsFixture()[0],
          recordSource: '<xml>blabla</xml>',
        }),
      })

      const expected = hot('-a-|', {
        a: EditorActions.isPublished({ isPublished: true }),
      })

      expect(effects.checkIsRecordPublished$).toBeObservable(expected)
      expect(recordsRepository.getRecordPublicationStatus).toHaveBeenCalledWith(
        record.uniqueIdentifier
      )
    })
    it('should handle error correctly', () => {
      recordsRepository.getRecordPublicationStatus = jest.fn(() =>
        throwError(() => new Error('oopsie'))
      )

      actions = hot('-a-|', {
        a: EditorActions.openRecord({
          record: datasetRecordsFixture()[0],
          recordSource: '<xml>blabla</xml>',
        }),
      })

      const expected = hot('-#', undefined, new Error('oopsie'))

      expect(effects.checkIsRecordPublished$).toBeObservable(expected)
    })
  })
  describe('checkCanEditRecord$', () => {
    it('should dispatch checkCanEditRecord action with correct payload', () => {
      const record = datasetRecordsFixture()[0]
      actions = hot('-a-|', {
        a: EditorActions.openRecord({
          record: datasetRecordsFixture()[0],
          recordSource: '<xml>blabla</xml>',
        }),
      })

      const expected = hot('-a-|', {
        a: EditorActions.canEditRecord({ canEditRecord: true }),
      })

      expect(effects.checkCanEditRecord$).toBeObservable(expected)
      expect(recordsRepository.canEditRecord).toHaveBeenCalledWith(
        record.uniqueIdentifier
      )
    })
    it('should handle error correctly', () => {
      recordsRepository.canEditRecord = jest.fn(() =>
        throwError(() => new Error('oopsie'))
      )

      actions = hot('-a-|', {
        a: EditorActions.openRecord({
          record: datasetRecordsFixture()[0],
          recordSource: '<xml>blabla</xml>',
        }),
      })

      const expected = hot('-#', undefined, new Error('oopsie'))

      expect(effects.checkCanEditRecord$).toBeObservable(expected)
    })
  })
})
