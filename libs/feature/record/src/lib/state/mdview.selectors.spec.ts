import * as MdViewSelectors from './mdview.selectors'

const relatedRecord = {
  title: 'title',
  id: 'id',
  uniqueIdentifier: 'uuid',
}

const chartConfigMock = {
  aggregation: 'sum',
  xProperty: 'anneeappro',
  yProperty: 'nbre_com',
  chartType: 'bar',
}

describe('MdView Selectors', () => {
  let state

  beforeEach(() => {
    state = {
      metadata: {
        uniqueIdentifier: '321321321321',
        title: 'title',
        abstract: 'abstract',
      },
      loadingFull: false,
      error: null,
    }
  })

  describe('MdView Selectors', () => {
    describe('getMetadataUuid', () => {
      it('returns the uuid of the metadata in the state', () => {
        const results = MdViewSelectors.getMetadataUuid.projector(state)
        expect(results).toBe('321321321321')
      })

      it('returns null if no metadata in the state', () => {
        const results = MdViewSelectors.getMetadataUuid.projector({
          loadingFull: false,
          error: null,
          allUserFeedbacksLoading: false,
          addUserFeedbackLoading: false,
          featureCatalogLoading: false,
        })
        expect(results).toBe(null)
      })
    })

    describe('getMetadata', () => {
      it('returns the metadata in the state', () => {
        const results = MdViewSelectors.getMetadata.projector(state)
        expect(results).toBe(state.metadata)
      })
    })

    describe('getMetadataIsIncomplete', () => {
      it('returns true when incomplete', () => {
        const results = MdViewSelectors.getMetadataIsIncomplete.projector({
          ...state,
          loadingFull: true,
        })
        expect(results).toBe(true)
      })

      it('returns false when complete', () => {
        const results = MdViewSelectors.getMetadataIsIncomplete.projector(state)
        expect(results).toBe(false)
      })

      it('returns null if no metadata', () => {
        const results = MdViewSelectors.getMetadataIsIncomplete.projector({
          loadingFull: false,
          error: null,
          allUserFeedbacksLoading: false,
          addUserFeedbackLoading: false,
          featureCatalogLoading: false,
        })
        expect(results).toBe(null)
      })
    })

    describe('getMetadataIsLoading', () => {
      it('returns false if not loading', () => {
        const results = MdViewSelectors.getMetadataIsLoading.projector(state)
        expect(results).toBe(false)
      })

      it('returns true if loading', () => {
        const results = MdViewSelectors.getMetadataIsLoading.projector({
          ...state,
          loadingFull: true,
        })
        expect(results).toBe(true)
      })
    })

    describe('getMetadataError', () => {
      it('returns error if present', () => {
        const results = MdViewSelectors.getMetadataError.projector({
          ...state,
          error: 'ouch',
        })
        expect(results).toBe('ouch')
      })

      it('returns null if no error', () => {
        const results = MdViewSelectors.getMetadataError.projector({
          loadingFull: false,
          error: null,
          allUserFeedbacksLoading: false,
          addUserFeedbackLoading: false,
          featureCatalogLoading: false,
        })
        expect(results).toBe(null)
      })
    })

    describe('getRelated', () => {
      it('returns related records', () => {
        const results = MdViewSelectors.getRelated.projector({
          ...state,
          related: [relatedRecord],
        })
        expect(results).toEqual([relatedRecord])
      })
    })

    describe('getChartConfig', () => {
      it('returns chart config', () => {
        const results = MdViewSelectors.getChartConfig.projector({
          ...state,
          chartConfig: [chartConfigMock],
        })
        expect(results).toEqual([chartConfigMock])
      })
    })
  })
})
