import { getActiveMenu } from './dashboard.selectors'

describe('Dashboard Selectors', () => {
  let state
  beforeEach(() => {
    state = {
      activeMenu: 'my-org',
    }
  })

  it('selects the active menu', () => {
    const result = getActiveMenu.projector(state)
    expect(result).toEqual('my-org')
  })
})
