import { TestBed } from '@angular/core/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import {
  initialMetadataViewState,
  METADATA_VIEW_FEATURE_STATE_KEY,
} from './mdview.reducer'
import { MdViewFacade } from './mdview.facade'
import * as MdViewActions from './mdview.actions'
import { hot } from 'jasmine-marbles'
import {
  A_USER_FEEDBACK,
  DATASET_RECORDS,
} from '@geonetwork-ui/common/fixtures'
import { DatavizConfigurationModel } from '@geonetwork-ui/common/domain/model/dataviz/dataviz-configuration.model'
import { AvatarServiceInterface } from '@geonetwork-ui/api/repository'

describe('MdViewFacade', () => {
  let store: MockStore
  let facade: MdViewFacade

  const chartConfigMock: DatavizConfigurationModel = {
    aggregation: 'sum',
    xProperty: 'anneeappro',
    yProperty: 'nbre_com',
    chartType: 'bar',
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MdViewFacade,
        AvatarServiceInterface,
        provideMockStore({
          initialState: {
            [METADATA_VIEW_FEATURE_STATE_KEY]: initialMetadataViewState,
          },
        }),
      ],
    })
    store = TestBed.inject(MockStore)
    facade = TestBed.inject(MdViewFacade)
  })

  describe('isPresent$', () => {
    it('emits false if no metadata', () => {
      const expected = hot('a', { a: false })
      expect(facade.isPresent$).toBeObservable(expected)
    })

    it('emits true if metadata', () => {
      store.setState({
        [METADATA_VIEW_FEATURE_STATE_KEY]: {
          ...initialMetadataViewState,
          metadata: DATASET_RECORDS[0],
        },
      })
      const expected = hot('a', { a: true })
      expect(facade.isPresent$).toBeObservable(expected)
    })
  })

  describe('metadata$', () => {
    it('does not emit if no metadata', () => {
      const expected = hot('-')
      expect(facade.metadata$).toBeObservable(expected)
    })

    it('emits metadata if present', () => {
      store.setState({
        [METADATA_VIEW_FEATURE_STATE_KEY]: {
          ...initialMetadataViewState,
          metadata: DATASET_RECORDS[0],
        },
      })
      const expected = hot('a', { a: DATASET_RECORDS[0] })
      expect(facade.metadata$).toBeObservable(expected)
    })
  })

  describe('allLinks$', () => {
    it('does not emit if no links', () => {
      const expected = hot('-')
      expect(facade.allLinks$).toBeObservable(expected)
    })

    it('emits allLinks if present', () => {
      store.setState({
        [METADATA_VIEW_FEATURE_STATE_KEY]: {
          ...initialMetadataViewState,
          metadata: DATASET_RECORDS[0],
        },
      })
      const expected = hot('a', { a: DATASET_RECORDS[0].distributions })
      expect(facade.allLinks$).toBeObservable(expected)
    })
  })

  describe('isIncomplete$', () => {
    it('emits true if full record is loading', () => {
      store.setState({
        [METADATA_VIEW_FEATURE_STATE_KEY]: {
          ...initialMetadataViewState,
          metadata: DATASET_RECORDS[0],
          loadingFull: true,
        },
      })
      const expected = hot('a', { a: true })
      expect(facade.isIncomplete$).toBeObservable(expected)
    })

    it('emits false if full metadata loaded', () => {
      store.setState({
        [METADATA_VIEW_FEATURE_STATE_KEY]: {
          ...initialMetadataViewState,
          metadata: DATASET_RECORDS[0],
          loadingFull: false,
        },
      })
      const expected = hot('a', { a: false })
      expect(facade.isIncomplete$).toBeObservable(expected)
    })

    it('does not emit if no metadata', () => {
      const expected = hot('-')
      expect(facade.isIncomplete$).toBeObservable(expected)
    })
  })

  describe('error$', () => {
    let values

    beforeEach(() => {
      values = []
      facade.error$.subscribe((v) => values.push(v))
    })

    it('emits the error if any', () => {
      store.setState({
        [METADATA_VIEW_FEATURE_STATE_KEY]: {
          ...initialMetadataViewState,
          error: 'something went wrong',
        },
      })
      expect(values).toEqual([null, 'something went wrong'])
    })

    it('emits null if no error', () => {
      expect(values).toEqual([null])
    })

    it('emits the error and null', () => {
      store.setState({
        [METADATA_VIEW_FEATURE_STATE_KEY]: {
          ...initialMetadataViewState,
          error: 'something went wrong',
        },
      })
      store.setState({
        [METADATA_VIEW_FEATURE_STATE_KEY]: {
          ...initialMetadataViewState,
          error: null,
        },
      })
      expect(values).toEqual([null, 'something went wrong', null])
    })
  })

  describe('setIncompleteMetadata', () => {
    it('dispatches a setIncompleteMetadata action', () => {
      facade.setIncompleteMetadata(DATASET_RECORDS[0])
      const expected = hot('a', {
        a: MdViewActions.setIncompleteMetadata({
          incomplete: DATASET_RECORDS[0],
        }),
      })
      expect(store.scannedActions$).toBeObservable(expected)
    })
  })

  describe('closeMetadata', () => {
    it('dispatches a close action', () => {
      facade.closeMetadata()
      const expected = hot('a', {
        a: MdViewActions.closeMetadata(),
      })
      expect(store.scannedActions$).toBeObservable(expected)
    })
  })

  describe('setChartConfig', () => {
    it('dispatches a setChartConfig action', () => {
      facade.setChartConfig(chartConfigMock)
      const expected = hot('a', {
        a: MdViewActions.setChartConfig({ chartConfig: chartConfigMock }),
      })
      expect(store.scannedActions$).toBeObservable(expected)
    })
  })

  describe('addUserFeedback', () => {
    it('dispatches a addUserFeedback action', () => {
      facade.addUserFeedback(A_USER_FEEDBACK)
      const expected = hot('a', {
        a: MdViewActions.addUserFeedback({ userFeedback: A_USER_FEEDBACK }),
      })
      expect(store.scannedActions$).toBeObservable(expected)
    })
  })

  describe('loadUserFeedbacks', () => {
    it('dispatches a loadUserFeedbacks action', () => {
      facade.loadUserFeedbacks(expect.any(Number))
      const expected = hot('a', {
        a: MdViewActions.loadUserFeedbacks({ datasetUuid: expect.any(Number) }),
      })
      expect(store.scannedActions$).toBeObservable(expected)
    })
  })
})
