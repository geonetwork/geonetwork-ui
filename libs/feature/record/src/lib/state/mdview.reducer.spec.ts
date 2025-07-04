import * as MdViewActions from './mdview.actions'
import { initialMetadataViewState, reducer } from './mdview.reducer'
import {
  datasetRecordsFixture,
  someUserFeedbacksFixture,
  userFeedbackFixture,
} from '@geonetwork-ui/common/fixtures'
import { DatavizChartConfigModel } from '@geonetwork-ui/common/domain/model/dataviz/dataviz-configuration.model'

const chartConfigMock: DatavizChartConfigModel = {
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
      const { uniqueIdentifier, title, ...rest } = datasetRecordsFixture()[0]
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
        full: datasetRecordsFixture()[0],
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
        metadata: datasetRecordsFixture()[0],
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
        related: [datasetRecordsFixture()[1]],
      })
    })

    it('set related records', () => {
      const state = reducer({ ...initialMetadataViewState }, action)
      expect(state).toEqual({
        ...initialMetadataViewState,
        related: [datasetRecordsFixture()[1]],
      })
    })
  })

  describe('setSources', () => {
    let action
    const sources = [datasetRecordsFixture()[1]]
    beforeEach(() => {
      action = MdViewActions.setSources({
        sources,
      })
    })
    it('set sources', () => {
      const state = reducer({ ...initialMetadataViewState }, action)
      expect(state).toEqual({
        ...initialMetadataViewState,
        sources,
      })
    })
  })

  describe('setSourceOf', () => {
    let action
    const sourceOf = [datasetRecordsFixture()[1]]
    beforeEach(() => {
      action = MdViewActions.setSourceOf({
        sourceOf,
      })
    })
    it('set has sources', () => {
      const state = reducer({ ...initialMetadataViewState }, action)
      expect(state).toEqual({
        ...initialMetadataViewState,
        sourceOf,
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
          related: [datasetRecordsFixture()[1]],
          loadingFull: false,
          metadata: datasetRecordsFixture()[0],
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
        userFeedback: userFeedbackFixture(),
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
        userFeedbacks: someUserFeedbacksFixture,
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
        userFeedbacks: someUserFeedbacksFixture,
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

  describe('loadFeatureCatalog', () => {
    let action

    beforeEach(() => {
      action = MdViewActions.loadFeatureCatalog({
        metadata: datasetRecordsFixture()[0],
      })
    })

    it('should set loading state and clear errors', () => {
      const state = reducer(initialMetadataViewState, action)
      expect(state).toEqual({
        ...initialMetadataViewState,
        featureCatalogError: null,
        featureCatalogLoading: true,
      })
    })
  })

  describe('loadFeatureCatalogSuccess', () => {
    let action
    const mockDatasetCatalog = {
      attributes: [
        { name: 'feature1', title: 'Feature 1' },
        { name: 'feature2', title: 'Feature 2' },
      ],
    }

    beforeEach(() => {
      action = MdViewActions.loadFeatureCatalogSuccess({
        datasetCatalog: mockDatasetCatalog,
      })
    })

    it('should store the feature catalog and set loading to false', () => {
      const state = reducer(
        {
          ...initialMetadataViewState,
          featureCatalogLoading: true,
        },
        action
      )
      expect(state).toEqual({
        ...initialMetadataViewState,
        featureCatalog: mockDatasetCatalog,
        featureCatalogLoading: false,
      })
    })
  })

  describe('loadFeatureCatalogFailure', () => {
    let action

    beforeEach(() => {
      action = MdViewActions.loadFeatureCatalogFailure({
        error: 'Some error',
      })
    })

    it('should set error and set loading to false', () => {
      const state = reducer(
        {
          ...initialMetadataViewState,
          featureCatalogLoading: true,
        },
        action
      )
      expect(state).toEqual({
        ...initialMetadataViewState,
        featureCatalogError: 'Some error',
        featureCatalogLoading: false,
      })
    })
  })
})
