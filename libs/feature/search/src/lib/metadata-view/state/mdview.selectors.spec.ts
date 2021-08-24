import * as MdViewSelectors from './mdview.selectors'

describe('MdView Selectors', () => {
  let state

  beforeEach(() => {
    state = {
      uuid: '321321321321',
      preview: {
        uuid: '321321321321',
        title: 'title',
      },
      full: {
        uuid: '321321321321',
        title: 'title',
        abstract: 'abstract',
      },
    }
  })

  describe('MdView Selectors', () => {
    it('getMdViewUuid() returns the uuid', () => {
      const results = MdViewSelectors.getMdViewUuid.projector(state)
      expect(results).toBe('321321321321')
    })
    it('getMdViewPreview() returns the preview', () => {
      const results = MdViewSelectors.getMdViewPreview.projector(state)
      expect(results).toBe(state.preview)
    })
    it('getMdViewFull() returns the full metadata', () => {
      const results = MdViewSelectors.getMdViewFull.projector(state)
      expect(results).toBe(state.full)
    })
  })
})
