import { Location } from '@angular/common'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { Params, Router } from '@angular/router'
import { MdViewActions } from '@geonetwork-ui/feature/record'
import {
  FieldsService,
  SetFilters,
  SetSortBy,
} from '@geonetwork-ui/feature/search'
import { provideMockActions } from '@ngrx/effects/testing'
import { routerNavigationAction } from '@ngrx/router-store'
import { Action } from '@ngrx/store'
import { hot } from 'jasmine-marbles'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { ROUTER_CONFIG } from '../router.module'

import * as fromActions from './router.actions'
import { RouterGoActionPayload } from './router.actions'
import * as fromEffects from './router.effects'
import { RouterFacade } from './router.facade'
import { TranslateModule } from '@ngx-translate/core'

class SearchRouteComponent extends Component {}
class MetadataRouteComponent extends Component {}

const routerConfigMock = {
  searchStateId: 'main',
  searchRouteComponent: SearchRouteComponent,
  recordRouteComponent: MetadataRouteComponent,
}

class RouterFacadeMock {
  searchParams$ = new BehaviorSubject<Params>({
    q: 'any',
    _sort: '-createDate',
  })
}

class FieldsServiceMock {
  mapping = {
    publisher: 'OrgForResource',
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
  let routerFacade: RouterFacadeMock
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
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
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

    effects = TestBed.inject(fromEffects.RouterEffects)
    router = TestBed.inject(Router)
    routerFacade = TestBed.inject(RouterFacade) as any
    location = TestBed.inject(Location)
  })

  describe('navigateToMetadata$', () => {
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
        a: MdViewActions.close(),
      })
      expect(effects.navigateToSearch$).toBeObservable(expected)
    })
  })

  describe('navigate$', () => {
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
    it('should call location back', () => {
      actions = hot('-a', { a: fromActions.backAction() })

      effects.navigate$.subscribe(() => {
        expect(location.back).toHaveBeenCalled()
      })
    })
  })

  describe('navigateForward$', () => {
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
        actions = hot('-a', { a: routerFacade.searchParams$ })
      })
      it('dispatches SetFilters and SortBy actions', () => {
        const expected = hot('(ab)', {
          a: new SetFilters({ any: 'any' }, 'main'),
          b: new SetSortBy(['desc', 'createDate'], 'main'),
        })
        expect(effects.syncSearchState$).toBeObservable(expected)
      })
    })
    describe('when no sort value in the route', () => {
      beforeEach(() => {
        routerFacade.searchParams$.next({
          q: 'any',
        })
        actions = hot('-a', { a: routerFacade.searchParams$ })
      })
      it('dispatches SetFilters and SortBy actions with default sort value', () => {
        const expected = hot('(ab)', {
          a: new SetFilters({ any: 'any' }, 'main'),
          b: new SetSortBy(['desc', '_score'], 'main'),
        })
        expect(effects.syncSearchState$).toBeObservable(expected)
      })
    })
  })
})
