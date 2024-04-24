import * as MdViewActions from './mdview.actions'
import { initialMetadataViewState, reducer } from './mdview.reducer'
import {
  A_USER_FEEDBACK,
  DATASET_RECORDS,
  SOME_USER_FEEDBACKS,
} from '@geonetwork-ui/common/fixtures'
import { DatavizConfigurationModel } from '@geonetwork-ui/common/domain/model/dataviz/dataviz-configuration.model'

const chartConfigMock: DatavizConfigurationModel = {
  aggregation: 'sum',
  xProperty: 'anneeappro',
  yProperty: 'nbre_com',
  chartType: 'bar',
}

describe('metadataViewReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any
      const state = reducer(undefined, action)

      expect(state).toBe(initialMetadataViewState)
    })
  })

  describe('loadFullMetadata', () => {
    let action

    beforeEach(() => {
      action = MdViewActions.loadFullMetadata({
        uuid: '123132132132132132',
      })
    })

    it('store the loading state', () => {
      const state = reducer(initialMetadataViewState, action)
      expect(state).toEqual({
        ...initialMetadataViewState,
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
      const state = reducer(initialMetadataViewState, action)
      expect(state).toEqual({
        ...initialMetadataViewState,
        error: null,
        metadata: {
          title:
            'A very interesting dataset (un jeu de données très intéressant)',
          uniqueIdentifier: 'my-dataset-001',
        },
      })
    })
  })

  describe('loadFullMetadataSuccess', () => {
    let action

    beforeEach(() => {
      action = MdViewActions.loadFullMetadataSuccess({
        full: DATASET_RECORDS[0],
      })
    })

    it('saves full metadata ', () => {
      const state = reducer(
        { ...initialMetadataViewState, loadingFull: true },
        action
      )
      expect(state).toEqual({
        ...initialMetadataViewState,
        error: null,
        loadingFull: false,
        metadata: DATASET_RECORDS[0],
      })
    })
  })

  describe('loadFullRecordFailure', () => {
    let action

    beforeEach(() => {
      action = MdViewActions.loadFullMetadataFailure({
        otherError: 'Some error',
        notFound: true,
      })
    })

    it('set error', () => {
      const state = reducer(
        { ...initialMetadataViewState, loadingFull: true },
        action
      )
      expect(state).toEqual({
        ...initialMetadataViewState,
        loadingFull: false,
        error: { otherError: 'Some error', notFound: true },
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
      const state = reducer({ ...initialMetadataViewState }, action)
      expect(state).toEqual({
        ...initialMetadataViewState,
        related: [DATASET_RECORDS[1]],
      })
    })
  })

  describe('setChartConfig', () => {
    let action

    beforeEach(() => {
      action = MdViewActions.setChartConfig({
        chartConfig: chartConfigMock,
      })
    })

    it('set chart config', () => {
      const state = reducer({ ...initialMetadataViewState }, action)
      expect(state).toEqual({
        ...initialMetadataViewState,
        chartConfig: chartConfigMock,
      })
    })
  })

  describe('closeMetadata', () => {
    let action

    beforeEach(() => {
      action = MdViewActions.closeMetadata()
    })

    it('set error', () => {
      const state = reducer(
        {
          ...initialMetadataViewState,
          related: [DATASET_RECORDS[1]],
          loadingFull: false,
          metadata: DATASET_RECORDS[0],
        },
        action
      )
      expect(state).toEqual(initialMetadataViewState)
    })
  })

  describe('loadUserFeedbacks', () => {
    let action

    beforeEach(() => {
      action = MdViewActions.loadUserFeedbacks({
        datasetUuid: expect.any(Number),
      })
    })

    it('return states without error and with allUserFeedbacksLoading true', () => {
      const state = reducer(initialMetadataViewState, action)
      expect(state).toEqual({
        ...initialMetadataViewState,
        error: null,
        loadingFull: false,
        allUserFeedbacksLoading: true,
        addUserFeedbackLoading: false,
      })
    })
  })

  describe('addUserFeedback', () => {
    let action

    beforeEach(() => {
      action = MdViewActions.addUserFeedback({
        userFeedback: A_USER_FEEDBACK,
      })
    })

    it('return states without error and with addUserFeedbackLoading true', () => {
      const state = reducer({ ...initialMetadataViewState }, action)
      expect(state).toEqual({
        ...initialMetadataViewState,
        addUserFeedbackLoading: true,
      })
    })
  })

  describe('loadUserFeedbacksSuccess', () => {
    let action

    beforeEach(() => {
      action = MdViewActions.loadUserFeedbacksSuccess({
        userFeedbacks: SOME_USER_FEEDBACKS,
      })
    })

    it('return states without error and with userfeedbacks', () => {
      const state = reducer(
        { ...initialMetadataViewState, allUserFeedbacksLoading: true },
        action
      )
      expect(state).toEqual({
        ...initialMetadataViewState,
        error: null,
        addUserFeedbackLoading: false,
        allUserFeedbacksLoading: false,
        loadingFull: false,
        userFeedbacks: SOME_USER_FEEDBACKS,
      })
    })
  })

  describe('loadUserFeedbacksFailure', () => {
    let action

    beforeEach(() => {
      action = MdViewActions.loadUserFeedbacksFailure({
        otherError: 'Some error',
        notFound: true,
      })
    })

    it('set error', () => {
      const state = reducer({ ...initialMetadataViewState }, action)
      expect(state).toEqual({
        ...initialMetadataViewState,
        error: { otherError: 'Some error', notFound: true },
      })
    })
  })
})
