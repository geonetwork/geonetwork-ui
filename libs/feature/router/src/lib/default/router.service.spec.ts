import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'

import { RouterService } from './router.service'
import { ROUTER_CONFIG } from './router.config'

const SearchRouteComponent = {
  name: 'searchRoute',
}
const RecordRouteComponent = {
  name: 'recordhRoute',
}

const routerConfigMock = {
  searchStateId: 'main',
  searchRouteComponent: SearchRouteComponent,
  recordRouteComponent: RecordRouteComponent,
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
      name: 'recordhRoute',
    },
    path: 'dataset/:metadataUuid',
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
