import * as MdViewSelectors from './mdview.selectors'

describe('MdView Selectors', () => {
  let state

  beforeEach(() => {
    state = {
      uuid: '321321321321',
    }
  })

  describe('MdView Selectors', () => {
    it('getMdViewUuid() returns the uuid', () => {
      const results = MdViewSelectors.getMdViewUuid.projector(state)
      expect(results).toBe('321321321321')
    })
  })
})
