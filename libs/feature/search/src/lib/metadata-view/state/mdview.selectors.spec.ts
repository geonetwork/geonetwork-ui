import * as MdViewSelectors from './mdview.selectors'

describe('MdView Selectors', () => {
  let state

  beforeEach(() => {
    state = {
      metadata: {
        uuid: '321321321321',
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
        })
        expect(results).toBe(null)
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
        })
        expect(results).toBe(null)
      })
    })
  })
})
