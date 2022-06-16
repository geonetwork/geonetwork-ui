import { TestBed } from '@angular/core/testing'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { ElasticsearchMapper } from '@geonetwork-ui/feature/search'
import {
  ElasticsearchService,
  MetadataRecord,
  simpleWithAgg,
} from '@geonetwork-ui/util/shared'

import { provideMockActions } from '@ngrx/effects/testing'
import { provideMockStore } from '@ngrx/store/testing'

import { Observable, of, throwError } from 'rxjs'

import * as MdViewActions from './mdview.actions'
import { MdViewEffects } from './mdview.effects'
import { hot } from 'jasmine-marbles'

const full = {
  uuid: '1231321321',
  title: 'title',
  abstract: 'abstract',
} as MetadataRecord

const searchServiceMock = {
  search: () => of(simpleWithAgg),
  configuration: {
    basePath: 'http://geonetwork/srv/api',
  },
}
const esMapperMock = {
  toRecords: () => [full],
}
const esServiceMock = {
  getMetadataByIdPayload: jest.fn,
  getRelatedRecordPayload: jest.fn,
}

describe('StationsEffects', () => {
  let actions: Observable<any>
  let effects: MdViewEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MdViewEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: SearchApiService,
          useValue: searchServiceMock,
        },
        {
          provide: ElasticsearchService,
          useValue: esServiceMock,
        },
        {
          provide: ElasticsearchMapper,
          useValue: esMapperMock,
        },
      ],
    })

    effects = TestBed.inject(MdViewEffects)
  })

  describe('loadFullRecord$', () => {
    describe('when api sucess', () => {
      it('dispatch loadFullSuccess', () => {
        actions = hot('-a-|', {
          a: MdViewActions.loadFullMetadata({ uuid: full.uuid }),
        })
        const expected = hot('-a-|', {
          a: MdViewActions.loadFullSuccess({ full }),
        })
        expect(effects.loadFull$).toBeObservable(expected)
      })
    })
    describe('when api fails', () => {
      beforeEach(() => {
        searchServiceMock.search = jest.fn(() => throwError('api'))
      })
      it('dispatch loadFullFailure', () => {
        actions = hot('-a-|', {
          a: MdViewActions.loadFullMetadata({ uuid: full.uuid }),
        })
        const expected = hot('-(a|)', {
          a: MdViewActions.loadFullFailure({ error: 'api' }),
        })
        expect(effects.loadFull$).toBeObservable(expected)
      })
    })
  })

  describe('loadRelatedRecords$', () => {
    describe('when load full success', () => {
      beforeEach(() => {
        searchServiceMock.search = jest.fn(() => of(simpleWithAgg))
      })
      it('dispatch setRelated', () => {
        actions = hot('-a-|', {
          a: MdViewActions.loadFullSuccess({ full }),
        })
        const expected = hot('-a-|', {
          a: MdViewActions.setRelated({ related: [full] }),
        })
        expect(effects.loadRelatedRecords$).toBeObservable(expected)
      })
    })
    describe('when api fails', () => {
      beforeEach(() => {
        searchServiceMock.search = jest.fn(() => throwError('api'))
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
