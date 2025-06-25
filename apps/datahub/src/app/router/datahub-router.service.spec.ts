import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { HomePageComponent } from '../home/home-page/home-page.component'
import { NewsPageComponent } from '../home/news-page/news-page.component'
import { OrganisationsPageComponent } from '../home/organisations-page/organisations-page.component'
import { SearchPageComponent } from '../home/search/search-page/search-page.component'
import { RecordPageComponent } from '../record/record-page/record-page.component'

import { DatahubRouterService } from './datahub-router.service'
import { ROUTER_ROUTE_ORGANIZATION } from '@geonetwork-ui/feature/router'
import { OrganizationPageComponent } from '../organization/organization-page/organization-page.component'

const RouterMock = {
  resetConfig: jest.fn(),
}

const expectedRoutes = [
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'prefix',
  },
  {
    path: '',
    component: HomePageComponent,
    data: {
      shouldDetach: true,
    },
    children: [
      {
        path: '',
        redirectTo: 'news',
        pathMatch: 'prefix',
      },
      {
        path: 'news',
        component: NewsPageComponent,
        data: {
          shouldDetach: true,
        },
      },
      {
        path: 'search',
        component: SearchPageComponent,
        data: {
          shouldDetach: true,
        },
      },
      {
        path: 'organisations',
        component: OrganisationsPageComponent,
        data: {
          shouldDetach: true,
        },
      },
    ],
  },
  {
    path: `dataset/:metadataUuid`,
    component: RecordPageComponent,
  },
  {
    path: `service/:metadataUuid`,
    component: RecordPageComponent,
  },
  {
    path: `reuse/:metadataUuid`,
    component: RecordPageComponent,
  },
  {
    path: `${ROUTER_ROUTE_ORGANIZATION}/:name`,
    component: OrganizationPageComponent,
    data: {
      shouldDetach: true,
    },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]
describe('DatahubRouterService', () => {
  let service: DatahubRouterService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: RouterMock,
        },
      ],
    })
    service = TestBed.inject(DatahubRouterService)
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
