import { SearchRouteReuseStrategy } from './SearchRouteReuseStrategy'

const handle = {
  id: 'DetachedRouteHandle',
}

describe('SearchRouteReuseStrategy', () => {
  let reuseStrategy: SearchRouteReuseStrategy
  let route
  beforeEach(() => {
    reuseStrategy = new SearchRouteReuseStrategy()
    route = {
      routeConfig: {
        path: 'search',
      },
      data: {
        shouldDetach: true,
      },
    }
  })

  describe('#shouldDetach', () => {
    describe('when route has shouldDetach = true', () => {
      it('returns true', () => {
        expect(reuseStrategy.shouldDetach(route)).toBe(true)
      })
    })
    describe('when route is shouldDetach is undefined', () => {
      beforeEach(() => {
        route = {
          routeConfig: {
            path: 'dataset',
          },
          data: {
            shouldDetach: false,
          },
        }
      })
      it('returns false', () => {
        expect(reuseStrategy.shouldDetach(route)).toBe(false)
      })
    })
  })

  describe('#store', () => {
    beforeEach(() => {
      reuseStrategy.store(route, handle)
    })
    it('stores the detached route handle', () => {
      expect(reuseStrategy['storedRoutes'].get('search')).toBe(handle)
    })
  })

  describe('#shouldAttach', () => {
    describe('when route config', () => {
      describe('when route stored', () => {
        beforeEach(() => {
          reuseStrategy.store(route, handle)
        })
        it('returns true', () => {
          expect(reuseStrategy.shouldAttach(route)).toBe(true)
        })
      })
      describe('when route not stored', () => {
        it('returns false', () => {
          expect(reuseStrategy.shouldAttach(route)).toBe(false)
        })
      })
    })
    describe('when no route config', () => {
      beforeEach(() => {
        route = {}
      })
      it('returns false', () => {
        expect(reuseStrategy.shouldAttach(route)).toBe(false)
      })
    })
  })

  describe('#shouldReuseRoute', () => {
    describe('when routes are the same', () => {
      it('returns true', () => {
        expect(reuseStrategy.shouldReuseRoute(route, route)).toBe(true)
      })
    })
    describe('when routes are different', () => {
      it('returns false', () => {
        const curr: any = {
          routeConfig: {
            path: 'dataset',
          },
        }
        expect(reuseStrategy.shouldReuseRoute(route, curr)).toBe(false)
      })
    })
  })
})
