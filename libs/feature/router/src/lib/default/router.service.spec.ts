import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'

import { RouterService } from './router.service'
import { ROUTER_CONFIG } from './router.config'
import { ROUTER_ROUTE_ORGANIZATION } from './constants'

const SearchRouteComponent = {
  name: 'searchRoute',
}
const RecordRouteComponent = {
  name: 'recordRoute',
}

const OrganizationRouteComponent = {
  name: 'organizationRoute',
}

const routerConfigMock = {
  searchStateId: 'main',
  searchRouteComponent: SearchRouteComponent,
  recordRouteComponent: RecordRouteComponent,
  serviceRouteComponent: RecordRouteComponent,
  reuseRouteComponent: RecordRouteComponent,
  organizationRouteComponent: OrganizationRouteComponent,
}
const RouterMock = {
  resetConfig: jest.fn(),
}

const expectedRoutes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/search',
  },
  {
    component: {
      name: 'searchRoute',
    },
    path: 'search',
    data: {
      shouldDetach: true,
    },
  },
  {
    component: {
      name: 'recordRoute',
    },
    path: 'dataset/:metadataUuid',
  },
  {
    component: {
      name: 'recordRoute',
    },
    path: 'service/:metadataUuid',
  },
  {
    component: {
      name: 'recordRoute',
    },
    path: 'reuse/:metadataUuid',
  },
  {
    path: `${ROUTER_ROUTE_ORGANIZATION}/:name`,
    component: {
      name: 'organizationRoute',
    },
  },
]
describe('RouterService', () => {
  let service: RouterService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ROUTER_CONFIG,
          useValue: routerConfigMock,
        },
        {
          provide: Router,
          useValue: RouterMock,
        },
      ],
    })
    service = TestBed.inject(RouterService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  it('build routes', () => {
    expect(service.buildRoutes()).toEqual(expectedRoutes)
  })
  it('reset config', () => {
    service.initRoutes()
    expect(RouterMock.resetConfig).toHaveBeenCalledWith(expectedRoutes)
  })
})
