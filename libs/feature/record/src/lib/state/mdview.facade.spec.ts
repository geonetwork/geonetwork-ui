import { TestBed } from '@angular/core/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { initialMdviewState, MD_VIEW_FEATURE_STATE_KEY } from './mdview.reducer'
import { MdViewFacade } from './mdview.facade'
import * as MdViewActions from './mdview.actions'
import { hot } from 'jasmine-marbles'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'

describe('MdViewFacade', () => {
  let store: MockStore
  let facade: MdViewFacade

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MdViewFacade,
        provideMockStore({
          initialState: {
            [MD_VIEW_FEATURE_STATE_KEY]: initialMdviewState,
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
        [MD_VIEW_FEATURE_STATE_KEY]: {
          ...initialMdviewState,
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
        [MD_VIEW_FEATURE_STATE_KEY]: {
          ...initialMdviewState,
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
        [MD_VIEW_FEATURE_STATE_KEY]: {
          ...initialMdviewState,
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
        [MD_VIEW_FEATURE_STATE_KEY]: {
          ...initialMdviewState,
          metadata: DATASET_RECORDS[0],
          loadingFull: true,
        },
      })
      const expected = hot('a', { a: true })
      expect(facade.isIncomplete$).toBeObservable(expected)
    })
    it('emits false if full metadata loaded', () => {
      store.setState({
        [MD_VIEW_FEATURE_STATE_KEY]: {
          ...initialMdviewState,
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
        [MD_VIEW_FEATURE_STATE_KEY]: {
          ...initialMdviewState,
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
        [MD_VIEW_FEATURE_STATE_KEY]: {
          ...initialMdviewState,
          error: 'something went wrong',
        },
      })
      store.setState({
        [MD_VIEW_FEATURE_STATE_KEY]: {
          ...initialMdviewState,
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
  describe('close', () => {
    it('dispatches a close action', () => {
      facade.close()
      const expected = hot('a', {
        a: MdViewActions.close(),
      })
      expect(store.scannedActions$).toBeObservable(expected)
    })
  })
  describe('setChartConfig', () => {
    it('dispatches a setChartConfig action', () => {
      facade.setChartConfig()
      const expected = hot('a', {
        a: MdViewActions.setChartConfig(),
      })
      expect(store.scannedActions$).toBeObservable(expected)
    })
  })
})
