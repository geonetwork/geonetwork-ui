import { TestBed } from '@angular/core/testing'
import {
  DATASET_RECORDS,
  SAMPLE_AGGREGATIONS_RESULTS,
  SAMPLE_SEARCH_RESULTS,
} from '@geonetwork-ui/common/fixtures'

import { provideMockActions } from '@ngrx/effects/testing'
import { provideMockStore } from '@ngrx/store/testing'

import { Observable, of, throwError } from 'rxjs'

import * as MdViewActions from './mdview.actions'
import { MdViewEffects } from './mdview.effects'
import { hot } from 'jasmine-marbles'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/records-repository.interface'

const full = {
  uniqueIdentifier: '1231321321',
  title: 'title',
  abstract: 'abstract',
} as CatalogRecord

class RecordsRepositoryMock {
  aggregate = jest.fn(() => of(SAMPLE_AGGREGATIONS_RESULTS))
  search = jest.fn(() => of(SAMPLE_SEARCH_RESULTS))
  getByUniqueIdentifier = jest.fn(() => of(DATASET_RECORDS[0]))
  getSimilarRecords = jest.fn(() => of(DATASET_RECORDS))
}

describe('MdViewEffects', () => {
  let actions: Observable<any>
  let effects: MdViewEffects
  let repository: RecordsRepositoryInterface

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
      ],
    })

    repository = TestBed.inject(RecordsRepositoryInterface)
    effects = TestBed.inject(MdViewEffects)
  })

  describe('loadFullRecord$', () => {
    describe('when api success and at least one record found', () => {
      it('dispatch loadFullSuccess', () => {
        actions = hot('-a-|', {
          a: MdViewActions.loadFullMetadata({ uuid: full.uniqueIdentifier }),
        })
        const expected = hot('-a-|', {
          a: MdViewActions.loadFullSuccess({ full: DATASET_RECORDS[0] }),
        })
        expect(effects.loadFull$).toBeObservable(expected)
      })
    })
    describe('when api success and at no record found', () => {
      beforeEach(() => {
        repository.getByUniqueIdentifier = jest.fn(() => of(null))
      })
      it('dispatch loadFullSuccess', () => {
        actions = hot('-a-|', {
          a: MdViewActions.loadFullMetadata({ uuid: full.uniqueIdentifier }),
        })
        const expected = hot('-a-|', {
          a: MdViewActions.loadFullFailure({ notFound: true }),
        })
        expect(effects.loadFull$).toBeObservable(expected)
      })
    })

    describe('when api fails', () => {
      beforeEach(() => {
        repository.getByUniqueIdentifier = jest.fn(() =>
          throwError(() => new Error('api'))
        )
      })
      it('dispatch loadFullFailure', () => {
        actions = hot('-a-|', {
          a: MdViewActions.loadFullMetadata({ uuid: full.uniqueIdentifier }),
        })
        const expected = hot('-(a|)', {
          a: MdViewActions.loadFullFailure({ otherError: 'api' }),
        })
        expect(effects.loadFull$).toBeObservable(expected)
      })
    })
  })

  describe('loadRelatedRecords$', () => {
    describe('when load full success', () => {
      it('dispatch setRelated', () => {
        actions = hot('-a-|', {
          a: MdViewActions.loadFullSuccess({ full }),
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
          a: MdViewActions.loadFullSuccess({ full }),
        })
        const expected = hot('-(a|)', {
          a: MdViewActions.setRelated({ related: null }),
        })
        expect(effects.loadRelatedRecords$).toBeObservable(expected)
      })
    })
  })
})
