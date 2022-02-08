import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { ROUTER_CONFIG } from './router.module'

import { RouterInitService } from './router-init.service'

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
  },
  {
    component: {
      name: 'recordhRoute',
    },
    path: 'dataset/:metadataUuid',
  },
]
describe('RouterInitService', () => {
  let service: RouterInitService

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
    service = TestBed.inject(RouterInitService)
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
