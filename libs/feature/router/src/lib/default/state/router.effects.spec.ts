import { Location } from '@angular/common'
import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { Params, Router } from '@angular/router'
import { MdViewActions } from '@geonetwork-ui/feature/record'
import {
  FieldsService,
  Paginate,
  SetFilters,
  SetSortBy,
} from '@geonetwork-ui/feature/search'
import { provideMockActions } from '@ngrx/effects/testing'
import { routerNavigationAction } from '@ngrx/router-store'
import { Action } from '@ngrx/store'
import { hot } from 'jasmine-marbles'
import { Observable, of, Subject } from 'rxjs'
import * as fromActions from './router.actions'
import { RouterGoActionPayload } from './router.actions'
import * as fromEffects from './router.effects'
import { RouterFacade } from './router.facade'
import { ROUTER_CONFIG } from '../router.config'
import { ROUTE_PARAMS } from '../constants'
import { provideI18n } from '@geonetwork-ui/util/i18n'

class SearchRouteComponent extends Component {}
class MetadataRouteComponent extends Component {}
class ServiceRouteComponent extends Component {}
class ReuseRouteComponent extends Component {}

const routerConfigMock = {
  searchStateId: 'main',
  searchRouteComponent: SearchRouteComponent,
  recordRouteComponent: MetadataRouteComponent,
  serviceRouteComponent: ServiceRouteComponent,
  reuseRouteComponent: ReuseRouteComponent,
}

class RouterFacadeMock {
  searchParams$ = new Subject<Params>()
}

const initialParams: Params = {
  q: 'any',
  [ROUTE_PARAMS.SORT]: '-createDate',
  [ROUTE_PARAMS.PAGE]: '2',
}

class FieldsServiceMock {
  mapping = {
    organization: 'OrgForResource',
    q: 'any',
  }
  buildFiltersFromFieldValues = jest.fn((fieldValues) =>
    of(
      Object.keys(fieldValues).reduce((prev, curr) => {
        const filterName = this.mapping[curr]
        if (!filterName) return prev
        const values = fieldValues[curr]
        return {
          ...prev,
          [filterName]: values,
        }
      }, {})
    )
  )
}

describe('RouterEffects', () => {
  let router: Router
  let routerFacade: RouterFacade
  let location: Location
  let effects: fromEffects.RouterEffects
  let actions: Observable<Action>

  const RouterMock = {
    navigate: jest.fn(),
  }
  const LocationMock = {
    back: jest.fn(),
    forward: jest.fn(),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        fromEffects.RouterEffects,
        provideMockActions(() => actions),
        {
          provide: Router,
          useValue: RouterMock,
        },
        {
          provide: Location,
          useValue: LocationMock,
        },
        {
          provide: ROUTER_CONFIG,
          useValue: routerConfigMock,
        },
        {
          provide: RouterFacade,
          useClass: RouterFacadeMock,
        },
        {
          provide: FieldsService,
          useClass: FieldsServiceMock,
        },
      ],
    })

    router = TestBed.inject(Router)
    routerFacade = TestBed.inject(RouterFacade) as any
    location = TestBed.inject(Location)
  })

  describe('navigateToMetadata$', () => {
    beforeEach(() => {
      effects = TestBed.inject(fromEffects.RouterEffects)
    })
    it('should dispatch a loadFullMetadata action', () => {
      actions = hot('-a', {
        a: routerNavigationAction({
          payload: {
            routerState: {
              root: {
                routeConfig: {
                  component: MetadataRouteComponent,
                },
                params: {
                  metadataUuid: 'abcdef',
                },
              },
            },
          },
        } as any),
      })
      const expected = hot('-(ba)', {
        a: MdViewActions.loadFullMetadata({ uuid: 'abcdef' }),
        b: MdViewActions.setIncompleteMetadata({
          incomplete: {
            uniqueIdentifier: 'abcdef',
            title: '',
          },
        }),
      })
      expect(effects.navigateToMetadata$).toBeObservable(expected)
    })
  })

  describe('navigateToSearch$', () => {
    beforeEach(() => {
      effects = TestBed.inject(fromEffects.RouterEffects)
    })
    it('should dispatch a loadFullMetadata action', () => {
      actions = hot('-a', {
        a: routerNavigationAction({
          payload: {
            routerState: {
              root: {
                routeConfig: {
                  component: SearchRouteComponent,
                },
                params: {},
              },
            },
          },
        } as any),
      })
      const expected = hot('-a', {
        a: MdViewActions.closeMetadata(),
      })
      expect(effects.navigateToSearch$).toBeObservable(expected)
    })
  })

  describe('navigate$', () => {
    beforeEach(() => {
      effects = TestBed.inject(fromEffects.RouterEffects)
    })
    it('should call router navigate', () => {
      const payload: RouterGoActionPayload = {
        path: '.',
        query: {
          id: 10,
        },
      }
      actions = hot('--a', { a: fromActions.goAction(payload) })

      effects.navigate$.subscribe(() => {
        const { path, query: queryParams } = payload
        expect(router.navigate).toHaveBeenCalledWith(path, {
          queryParams,
        })
      })
    })
  })

  describe('navigateBack$', () => {
    beforeEach(() => {
      effects = TestBed.inject(fromEffects.RouterEffects)
    })
    it('should call location back', () => {
      actions = hot('-a', { a: fromActions.backAction() })

      effects.navigate$.subscribe(() => {
        expect(location.back).toHaveBeenCalled()
      })
    })
  })

  describe('navigateForward$', () => {
    beforeEach(() => {
      effects = TestBed.inject(fromEffects.RouterEffects)
    })
    it('should call location forward', () => {
      actions = hot('-a', { a: fromActions.forwardAction() })

      effects.navigate$.subscribe(() => {
        expect(location.forward).toHaveBeenCalled()
      })
    })
  })

  describe('syncSearchState$', () => {
    describe('when a sort value in the route', () => {
      beforeEach(() => {
        routerFacade.searchParams$ = hot('-a', {
          a: initialParams,
        })
        effects = TestBed.inject(fromEffects.RouterEffects)
      })
      it('dispatches SetFilters, SortBy, Paginate actions on initial params', () => {
        const expected = hot('-(abc)', {
          a: new SetFilters({ any: 'any' }, 'main'),
          b: new SetSortBy(['desc', 'createDate'], 'main'),
          c: new Paginate(2, 'main'),
        })
        expect(effects.syncSearchState$).toBeObservable(expected)
      })
    })
    describe('when no sort or page value in the route', () => {
      beforeEach(() => {
        routerFacade.searchParams$ = hot('-a----b', {
          a: initialParams,
          b: {
            q: 'any',
          },
        })
        effects = TestBed.inject(fromEffects.RouterEffects)
      })
      it('dispatches SetFilters and SortBy and Paginate actions with default sort value', () => {
        const expected = hot('-(abc)(de)', {
          a: new SetFilters({ any: 'any' }, 'main'),
          b: new SetSortBy(['desc', 'createDate'], 'main'),
          c: new Paginate(2, 'main'),
          d: new SetSortBy(['desc', 'changeDate'], 'main'),
          e: new Paginate(1, 'main'),
        })
        expect(effects.syncSearchState$).toBeObservable(expected)
      })
    })
    describe('when a page number is in the route', () => {
      beforeEach(() => {
        routerFacade.searchParams$ = hot('-a----b', {
          a: initialParams,
          b: {
            q: 'any',
            [ROUTE_PARAMS.PAGE]: '12',
          },
        })
        effects = TestBed.inject(fromEffects.RouterEffects)
      })
      it('dispatches Paginate action accordingly', () => {
        const expected = hot('-(abc)(de)', {
          a: new SetFilters({ any: 'any' }, 'main'),
          b: new SetSortBy(['desc', 'createDate'], 'main'),
          c: new Paginate(2, 'main'),
          d: new SetSortBy(['desc', 'changeDate'], 'main'),
          e: new Paginate(12, 'main'),
        })
        expect(effects.syncSearchState$).toBeObservable(expected)
      })
    })
    describe('when only the sort param changes', () => {
      beforeEach(() => {
        routerFacade.searchParams$ = hot('-a----b----c', {
          a: initialParams,
          b: {
            [ROUTE_PARAMS.PAGE]: '12',
            [ROUTE_PARAMS.SORT]: 'createDate',
          },
          c: {
            [ROUTE_PARAMS.PAGE]: '12',
            [ROUTE_PARAMS.SORT]: '-title',
          },
        })
        effects = TestBed.inject(fromEffects.RouterEffects)
      })
      it('only dispatches a SortBy action', () => {
        const expected = hot('-(abc)(def)g', {
          a: new SetFilters({ any: 'any' }, 'main'),
          b: new SetSortBy(['desc', 'createDate'], 'main'),
          c: new Paginate(2, 'main'),
          d: new SetFilters({}, 'main'),
          e: new SetSortBy(['asc', 'createDate'], 'main'),
          f: new Paginate(12, 'main'),
          g: new SetSortBy(['desc', 'title'], 'main'),
        })
        expect(effects.syncSearchState$).toBeObservable(expected)
      })
    })
    describe('when identical params are received', () => {
      beforeEach(() => {
        routerFacade.searchParams$ = hot('-a----a', { a: initialParams })
        effects = TestBed.inject(fromEffects.RouterEffects)
      })
      it('dispatches no action', () => {
        const expected = hot('-(abc)-', {
          a: new SetFilters({ any: 'any' }, 'main'),
          b: new SetSortBy(['desc', 'createDate'], 'main'),
          c: new Paginate(2, 'main'),
        })
        expect(effects.syncSearchState$).toBeObservable(expected)
      })
    })
  })
})
