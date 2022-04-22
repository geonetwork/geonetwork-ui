import { routeParamsToState, stateToRouteParams } from './router.mapper'

describe('RouterMapper', () => {
  describe('stateToRouteParams', () => {
    let state
    beforeEach(() => {
      state = {
        any: 'scot',
        Org: {
          'org sample': true,
        },
        keyword: {},
      }
    })
    it('transform to route object', () => {
      expect(stateToRouteParams(state)).toEqual({
        publisher: 'org sample',
        q: 'scot',
      })
    })
  })
  describe('routeParamsToState', () => {
    let routeParams
    beforeEach(() => {
      routeParams = {
        publisher: 'org sample',
        q: 'scot',
      }
    })
    it('transform to route object', () => {
      expect(routeParamsToState(routeParams)).toEqual({
        any: 'scot',
        Org: {
          'org sample': true,
        },
      })
    })
  })
})
