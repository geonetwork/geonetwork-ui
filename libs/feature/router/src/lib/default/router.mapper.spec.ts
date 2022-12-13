import {
  getSearchFilters,
  getSortBy,
  routeParamsToState,
  stateToRouteParams,
} from './router.mapper'

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
          resolutionScaleDenominator: {
            '10000': true,
          },
          linkProtocol: {
            'OGC:WFS': true,
          },
          keyword: {},
        }
      })
      it('transform to route object', () => {
        expect(stateToRouteParams(state)).toEqual({
          publisher: ['org sample'],
          q: 'scot',
          resolution: ['10000'],
          format: ['OGC:WFS'],
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
          resolution: '10000',
          format: 'OGC:WFS?ignore-after-questionmark',
          ticket: 'should be ignored',
        }
      })
      it('transform to route object', () => {
        expect(routeParamsToState(routeParams)).toEqual({
          any: 'scot',
          OrgForResource: {
            'org sample': true,
          },
          resolutionScaleDenominator: {
            '10000': true,
          },
          linkProtocol: {
            'OGC:WFS': true,
          },
        })
      })
    })
    describe('params with multiple values', () => {
      beforeEach(() => {
        routeParams = {
          publisher: ['org 1', 'org (%2)', '123[]<>;:!'],
          q: 'scot',
          resolution: ['10000', '200000?ignore-after-questionmark'],
          format: ['OGC:WFS', 'WWW:DOWNLOAD:application/json'],
          ticket: ['should', 'also', 'be', 'ignored'],
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
          resolutionScaleDenominator: {
            '10000': true,
            '200000': true,
          },
          linkProtocol: {
            'OGC:WFS': true,
            'WWW:DOWNLOAD:application/json': true,
          },
        })
      })
    })
  })
  describe('extract search params types', () => {
    let routeParams
    beforeEach(() => {
      routeParams = {
        publisher: ['org 1', 'org (%2)', '123[]<>;:!'],
        q: 'scot',
        resolution: ['10000', '200000'],
        format: ['OGC:WFS', 'WWW:DOWNLOAD:application/json'],
        _sort: '_score',
      }
    })
    it('get search filters', () => {
      expect(getSearchFilters(routeParams)).toEqual({
        publisher: ['org 1', 'org (%2)', '123[]<>;:!'],
        q: 'scot',
        resolution: ['10000', '200000'],
        format: ['OGC:WFS', 'WWW:DOWNLOAD:application/json'],
      })
    })
    it('get sort option', () => {
      expect(getSortBy(routeParams)).toEqual('_score')
    })
  })
})
