import { TestBed } from '@angular/core/testing'
import {
  A_USER_FEEDBACK,
  DATASET_RECORDS,
  SAMPLE_AGGREGATIONS_RESULTS,
  SAMPLE_SEARCH_RESULTS,
  SOME_USER_FEEDBACKS,
} from '@geonetwork-ui/common/fixtures'

import { provideMockActions } from '@ngrx/effects/testing'
import { provideMockStore } from '@ngrx/store/testing'

import { Observable, of, throwError } from 'rxjs'

import * as MdViewActions from './mdview.actions'
import { MdViewEffects } from './mdview.effects'
import { hot } from 'jasmine-marbles'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'

const full = {
  uniqueIdentifier: '1231321321',
  title: 'title',
  abstract: 'abstract',
} as CatalogRecord

class RecordsRepositoryMock {
  aggregate = jest.fn(() => of(SAMPLE_AGGREGATIONS_RESULTS))
  search = jest.fn(() => of(SAMPLE_SEARCH_RESULTS))
  getRecord = jest.fn(() => of(DATASET_RECORDS[0]))
  getSimilarRecords = jest.fn(() => of(DATASET_RECORDS))
}

class PlatformServiceInterfaceMock {
  getUserFeedbacks = jest.fn(() => of(SOME_USER_FEEDBACKS))
  postUserFeedbacks = jest.fn(() => of(undefined))
}

describe('MdViewEffects', () => {
  let actions: Observable<any>
  let effects: MdViewEffects
  let repository: RecordsRepositoryInterface
  let platform: PlatformServiceInterface

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MdViewEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: RecordsRepositoryInterface,
          useClass: RecordsRepositoryMock,
        },
        {
          provide: PlatformServiceInterface,
          useClass: PlatformServiceInterfaceMock,
        },
      ],
    })

    repository = TestBed.inject(RecordsRepositoryInterface)
    effects = TestBed.inject(MdViewEffects)
    platform = TestBed.inject(PlatformServiceInterface)
  })

  describe('loadFullMetadata$', () => {
    describe('when api success and at least one record found', () => {
      it('dispatch loadFullSuccess', () => {
        actions = hot('-a-|', {
          a: MdViewActions.loadFullMetadata({ uuid: full.uniqueIdentifier }),
        })
        const expected = hot('-a-|', {
          a: MdViewActions.loadFullMetadataSuccess({
            full: DATASET_RECORDS[0],
          }),
        })
        expect(effects.loadFullMetadata$).toBeObservable(expected)
      })
    })
    describe('when api success and at no record found', () => {
      beforeEach(() => {
        repository.getRecord = jest.fn(() => of(null))
      })
      it('dispatch loadFullSuccess', () => {
        actions = hot('-a-|', {
          a: MdViewActions.loadFullMetadata({ uuid: full.uniqueIdentifier }),
        })
        const expected = hot('-a-|', {
          a: MdViewActions.loadFullMetadataFailure({ notFound: true }),
        })
        expect(effects.loadFullMetadata$).toBeObservable(expected)
      })
    })

    describe('when api fails', () => {
      beforeEach(() => {
        repository.getRecord = jest.fn(() => throwError(() => new Error('api')))
      })
      it('dispatch loadFullFailure', () => {
        actions = hot('-a-|', {
          a: MdViewActions.loadFullMetadata({ uuid: full.uniqueIdentifier }),
        })
        const expected = hot('-(a|)', {
          a: MdViewActions.loadFullMetadataFailure({ otherError: 'api' }),
        })
        expect(effects.loadFullMetadata$).toBeObservable(expected)
      })
    })
  })

  describe('loadRelatedRecords$', () => {
    describe('when load full success', () => {
      it('dispatch setRelated', () => {
        actions = hot('-a-|', {
          a: MdViewActions.loadFullMetadataSuccess({ full }),
        })
        const expected = hot('-a-|', {
          a: MdViewActions.setRelated({ related: DATASET_RECORDS }),
        })
        expect(effects.loadRelatedRecords$).toBeObservable(expected)
      })
    })
    describe('when api fails', () => {
      beforeEach(() => {
        repository.getSimilarRecords = jest.fn(() => throwError(() => 'api'))
      })
      it('dispatch loadFullFailure', () => {
        actions = hot('-a-|', {
          a: MdViewActions.loadFullMetadataSuccess({ full }),
        })
        const expected = hot('-(a|)', {
          a: MdViewActions.setRelated({ related: null }),
        })
        expect(effects.loadRelatedRecords$).toBeObservable(expected)
      })
    })
  })

  describe('loadUserFeedbacks$', () => {
    describe('when loadUserFeedbacks success', () => {
      it('should dispatch loadUserFeedbacksSuccess when API call is successful', () => {
        actions = hot('-a-', {
          a: MdViewActions.loadUserFeedbacks({ datasetUuid: '12345' }),
        })
        const expected = hot('-a-', {
          a: MdViewActions.loadUserFeedbacksSuccess({
            userFeedbacks: SOME_USER_FEEDBACKS,
          }),
        })

        expect(effects.loadUserFeedbacks$).toBeObservable(expected)
      })
    })

    describe('when api fails', () => {
      const error = 'API error'

      beforeEach(() => {
        platform.getUserFeedbacks = jest.fn(() =>
          throwError(() => new Error(error))
        )
      })

      it('should dispatch loadUserFeedbacksFailure when API call fails', () => {
        actions = hot('-a|', {
          a: MdViewActions.loadUserFeedbacks({ datasetUuid: '12345' }),
        })
        const expected = hot('-a|', {
          a: MdViewActions.loadUserFeedbacksFailure({ otherError: error }),
        })

        expect(effects.loadUserFeedbacks$).toBeObservable(expected)
      })
    })
  })

  describe('reloadUserFeedbacks$', () => {
    describe('when addUserFeedbackSuccess', () => {
      it('should dispatch loadUserFeedbacksSuccess when API call is successful', () => {
        actions = hot('-a-', {
          a: MdViewActions.addUserFeedbackSuccess({ datasetUuid: '12345' }),
        })
        const expected = hot('-a', {
          a: MdViewActions.loadUserFeedbacksSuccess({
            userFeedbacks: SOME_USER_FEEDBACKS,
          }),
        })

        expect(effects.reloadUserFeedbacks$).toBeObservable(expected)
      })
    })

    describe('when api fails', () => {
      const error = 'API error'

      beforeEach(() => {
        platform.getUserFeedbacks = jest.fn(() =>
          throwError(() => new Error(error))
        )
      })

      it('should dispatch loadUserFeedbacksFailure when API call fails', () => {
        const error = 'API error'

        actions = hot('-a-', {
          a: MdViewActions.addUserFeedbackSuccess({ datasetUuid: '12345' }),
        })
        const expected = hot('-a', {
          a: MdViewActions.loadUserFeedbacksFailure({ otherError: error }),
        })

        expect(effects.reloadUserFeedbacks$).toBeObservable(expected)
      })
    })
  })

  describe('addUserFeedback$', () => {
    describe('when addUserFeedback success', () => {
      it('should dispatch addUserFeedbackSuccess when API call is successful', () => {
        actions = hot('-a-', {
          a: MdViewActions.addUserFeedback({ userFeedback: A_USER_FEEDBACK }),
        })
        const expected = hot('-a-', {
          a: MdViewActions.addUserFeedbackSuccess({
            datasetUuid: A_USER_FEEDBACK.metadataUUID,
          }),
        })

        expect(effects.addUserFeedback$).toBeObservable(expected)
      })
    })

    describe('when api fails', () => {
      const error = 'API error'

      beforeEach(() => {
        platform.postUserFeedbacks = jest.fn(() =>
          throwError(() => new Error(error))
        )
      })

      it('should dispatch addUserFeedbackFailure when API call fails', () => {
        const error = 'API error'

        actions = hot('-a-', {
          a: MdViewActions.addUserFeedback({ userFeedback: A_USER_FEEDBACK }),
        })
        const expected = hot('-a', {
          a: MdViewActions.addUserFeedbackFailure({ otherError: error }),
        })

        expect(effects.addUserFeedback$).toBeObservable(expected)
      })
    })
  })
})
