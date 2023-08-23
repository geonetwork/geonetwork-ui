import * as MdViewActions from './mdview.actions'
import { initialMdviewState, reducer } from './mdview.reducer'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'

const chartConfigMock = {
  aggregation: 'sum',
  xProperty: 'anneeappro',
  yProperty: 'nbre_com',
  chartType: 'bar',
}

const withErrorMdViewState = {
  ...initialMdviewState,
  error: { otherError: 'Some error' },
}

describe('MdView Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any
      const state = reducer(undefined, action)

      expect(state).toBe(initialMdviewState)
    })
  })

  describe('loadFullMetadata', () => {
    let action
    beforeEach(() => {
      action = MdViewActions.loadFullMetadata({
        uniqueIdentifier: '123132132132132132',
      })
    })
    it('store the loading state', () => {
      const state = reducer(withErrorMdViewState, action)
      expect(state).toEqual({
        ...withErrorMdViewState,
        error: null,
        loadingFull: true,
      })
    })
  })
  describe('setIncompleteMetadata', () => {
    let action
    beforeEach(() => {
      const { uniqueIdentifier, title, ...rest } = DATASET_RECORDS[0]
      action = MdViewActions.setIncompleteMetadata({
        incomplete: {
          uniqueIdentifier,
          title,
        },
      })
    })
    it('saves incomplete metadata', () => {
      const state = reducer(withErrorMdViewState, action)
      expect(state).toEqual({
        ...withErrorMdViewState,
        error: null,
        metadata: {
          title:
            'A very interesting dataset (un jeu de données très intéressant)',
          uniqueIdentifier: 'my-dataset-001',
        },
      })
    })
  })
  describe('loadFullRecordSuccess', () => {
    let action
    beforeEach(() => {
      action = MdViewActions.loadFullSuccess({
        full: DATASET_RECORDS[0],
      })
    })
    it('saves full metadata ', () => {
      const state = reducer(
        { ...withErrorMdViewState, loadingFull: true },
        action
      )
      expect(state).toEqual({
        ...withErrorMdViewState,
        error: null,
        loadingFull: false,
        metadata: DATASET_RECORDS[0],
      })
    })
  })
  describe('loadFullRecordFailure', () => {
    let action
    beforeEach(() => {
      action = MdViewActions.loadFullFailure({
        otherError: 'error',
        notFound: true,
      })
    })
    it('set error', () => {
      const state = reducer(
        { ...initialMdviewState, loadingFull: true },
        action
      )
      expect(state).toEqual({
        ...initialMdviewState,
        loadingFull: false,
        error: { otherError: 'error', notFound: true },
      })
    })
  })
  describe('setRelated', () => {
    let action
    beforeEach(() => {
      action = MdViewActions.setRelated({
        related: [DATASET_RECORDS[1]],
      })
    })
    it('set related records', () => {
      const state = reducer({ ...initialMdviewState }, action)
      expect(state).toEqual({
        ...initialMdviewState,
        related: [DATASET_RECORDS[1]],
      })
    })
  })
  describe('setChartConfig', () => {
    let action
    beforeEach(() => {
      action = MdViewActions.setChartConfig({
        chartConfig: [chartConfigMock],
      })
    })
    it('set chart config', () => {
      const state = reducer({ ...initialMdviewState }, action)
      expect(state).toEqual({
        ...initialMdviewState,
        chartConfig: [chartConfigMock],
      })
    })
  })
  describe('close', () => {
    let action
    beforeEach(() => {
      action = MdViewActions.close()
    })
    it('set error', () => {
      const state = reducer(
        {
          ...initialMdviewState,
          related: [DATASET_RECORDS[1]],
          loadingFull: false,
          metadata: DATASET_RECORDS[0],
        },
        action
      )
      expect(state).toEqual(initialMdviewState)
    })
  })
})
