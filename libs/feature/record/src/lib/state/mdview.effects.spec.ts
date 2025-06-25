import { TestBed } from '@angular/core/testing'
import {
  datasetRecordsFixture,
  SAMPLE_AGGREGATIONS_RESULTS,
  searchResultsFixture,
  someUserFeedbacksFixture,
  userFeedbackFixture,
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
import { Router } from '@angular/router'

const full = {
  uniqueIdentifier: '1231321321',
  title: 'title',
  abstract: 'abstract',
} as CatalogRecord

class RecordsRepositoryMock {
  aggregate = jest.fn(() => of(SAMPLE_AGGREGATIONS_RESULTS()))
  search = jest.fn(() => of(searchResultsFixture()))
  getRecord = jest.fn(() => of(datasetRecordsFixture()[0]))
  getSimilarRecords = jest.fn(() => of(datasetRecordsFixture()))
  getSources = jest.fn(() => of(datasetRecordsFixture()))
  getSourceOf = jest.fn(() => of(datasetRecordsFixture()))
}

class PlatformServiceInterfaceMock {
  getUserFeedbacks = jest.fn(() => of(someUserFeedbacksFixture()))
  postUserFeedbacks = jest.fn(() => of(undefined))
}

const RouterMock = {
  url: 'dataset/1231321321',
}

describe('MdViewEffects', () => {
  let actions: Observable<any>
  let effects: MdViewEffects
  let repository: RecordsRepositoryInterface
  let platform: PlatformServiceInterface
  let router: Router

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
        {
          provide: Router,
          useValue: RouterMock,
        },
      ],
    })
    router = TestBed.inject(Router)
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
            full: datasetRecordsFixture()[0] as CatalogRecord,
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
          a: MdViewActions.setRelated({
            related: datasetRecordsFixture() as CatalogRecord[],
          }),
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

  describe('loadSources$', () => {
    describe('when load full success', () => {
      it('dispatch setSources', () => {
        actions = hot('-a-|', {
          a: MdViewActions.loadFullMetadataSuccess({ full }),
        })
        const expected = hot('-a-|', {
          a: MdViewActions.setSources({
            sources: datasetRecordsFixture() as CatalogRecord[],
          }),
        })
        expect(effects.loadSources$).toBeObservable(expected)
      })
    })
    describe('when api fails', () => {
      beforeEach(() => {
        repository.getSources = jest.fn(() => throwError(() => 'api'))
      })
      it('dispatch loadFullFailure', () => {
        actions = hot('-a-|', {
          a: MdViewActions.loadFullMetadataSuccess({ full }),
        })
        const expected = hot('-(a|)', {
          a: MdViewActions.setSources({ sources: null }),
        })
        expect(effects.loadSources$).toBeObservable(expected)
      })
    })
  })

  describe('loadSourceOf$', () => {
    describe('when load full success', () => {
      it('dispatch setSourceOf', () => {
        actions = hot('-a-|', {
          a: MdViewActions.loadFullMetadataSuccess({ full }),
        })
        const expected = hot('-a-|', {
          a: MdViewActions.setSourceOf({
            sourceOf: datasetRecordsFixture() as CatalogRecord[],
          }),
        })
        expect(effects.loadSourceOf$).toBeObservable(expected)
      })
      describe('when api fails', () => {
        beforeEach(() => {
          repository.getSourceOf = jest.fn(() => throwError(() => 'api'))
        })
        it('dispatch loadFullFailure', () => {
          actions = hot('-a-|', {
            a: MdViewActions.loadFullMetadataSuccess({ full }),
          })
          const expected = hot('-(a|)', {
            a: MdViewActions.setSourceOf({ sourceOf: null }),
          })
          expect(effects.loadSourceOf$).toBeObservable(expected)
        })
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
            userFeedbacks: someUserFeedbacksFixture(),
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
            userFeedbacks: someUserFeedbacksFixture(),
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
          a: MdViewActions.addUserFeedback({
            userFeedback: userFeedbackFixture(),
          }),
        })
        const expected = hot('-a-', {
          a: MdViewActions.addUserFeedbackSuccess({
            datasetUuid: userFeedbackFixture().metadataUUID,
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
          a: MdViewActions.addUserFeedback({
            userFeedback: userFeedbackFixture(),
          }),
        })
        const expected = hot('-a', {
          a: MdViewActions.addUserFeedbackFailure({ otherError: error }),
        })

        expect(effects.addUserFeedback$).toBeObservable(expected)
      })
    })
  })

  describe('loadFeatureCatalog$', () => {
    const featureCatalog = {
      attributes: [{ name: 'test', title: 'Test' }],
    }

    describe('when api success and feature catalog found', () => {
      beforeEach(() => {
        repository.getFeatureCatalog = jest.fn(() => of(featureCatalog))
      })
      it('should dispatch loadFeatureCatalogSuccess', () => {
        actions = hot('-a-|', {
          a: MdViewActions.loadFullMetadataSuccess({ full }),
        })
        const expected = hot('-a-|', {
          a: MdViewActions.loadFeatureCatalogSuccess({
            datasetCatalog: featureCatalog,
          }),
        })
        expect(effects.loadFeatureCatalog$).toBeObservable(expected)
      })
    })

    describe('when api success but no feature catalog found', () => {
      beforeEach(() => {
        repository.getFeatureCatalog = jest.fn(() => of(null))
      })
      it('should dispatch loadFeatureCatalogSuccess', () => {
        actions = hot('-a-|', {
          a: MdViewActions.loadFullMetadataSuccess({ full }),
        })
        const expected = hot('-a-|', {
          a: MdViewActions.loadFeatureCatalogSuccess({
            datasetCatalog: null,
          }),
        })
        expect(effects.loadFeatureCatalog$).toBeObservable(expected)
      })
    })

    describe('when api fails', () => {
      beforeEach(() => {
        repository.getFeatureCatalog = jest.fn(() =>
          throwError(() => new Error('api error'))
        )
      })
      it('should dispatch loadFeatureCatalogFailure with error', () => {
        actions = hot('-a-|', {
          a: MdViewActions.loadFullMetadataSuccess({ full }),
        })
        const expected = hot('-(a|)', {
          a: MdViewActions.loadFeatureCatalogFailure({
            error: 'api error',
          }),
        })
        expect(effects.loadFeatureCatalog$).toBeObservable(expected)
      })
    })
  })
})
