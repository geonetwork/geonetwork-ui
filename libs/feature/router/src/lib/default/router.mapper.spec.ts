import { routeParamsToState, stateToRouteParams } from './router.mapper'

describe('RouterMapper', () => {
  describe('stateToRouteParams', () => {
    let state
    describe('params with unique value', () => {
      beforeEach(() => {
        state = {
          any: 'scot',
          OrgForResource: {
            'org sample': true,
          },
          keyword: {},
        }
      })
      it('transform to route object', () => {
        expect(stateToRouteParams(state)).toEqual({
          publisher: ['org sample'],
          q: 'scot',
        })
      })
    })
    describe('params with multiple values', () => {
      beforeEach(() => {
        state = {
          any: 'scot',
          OrgForResource: {
            'org 1': true,
            'org (%2)': true,
            'not org': false,
            '123[]<>;:!': true,
          },
          keyword: {},
        }
      })
      it('transform to route object', () => {
        expect(stateToRouteParams(state)).toEqual({
          publisher: ['org 1', 'org (%2)', '123[]<>;:!'],
          q: 'scot',
        })
      })
    })
  })
  describe('routeParamsToState', () => {
    let routeParams
    describe('params with unique value', () => {
      beforeEach(() => {
        routeParams = {
          publisher: 'org sample',
          q: 'scot',
        }
      })
      it('transform to route object', () => {
        expect(routeParamsToState(routeParams)).toEqual({
          any: 'scot',
          OrgForResource: {
            'org sample': true,
          },
        })
      })
    })
    describe('params with multiple values', () => {
      beforeEach(() => {
        routeParams = {
          publisher: ['org 1', 'org (%2)', '123[]<>;:!'],
          q: 'scot',
        }
      })
      it('transform to route object', () => {
        expect(routeParamsToState(routeParams)).toEqual({
          any: 'scot',
          OrgForResource: {
            'org 1': true,
            'org (%2)': true,
            '123[]<>;:!': true,
          },
        })
      })
    })
  })
})
