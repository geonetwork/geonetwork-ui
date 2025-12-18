import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { HomePageComponent } from '../home/home-page/home-page.component.js'
import { NewsPageComponent } from '../home/news-page/news-page.component.js'
import { OrganisationsPageComponent } from '../home/organisations-page/organisations-page.component.js'
import { SearchPageComponent } from '../home/search/search-page/search-page.component.js'
import { RecordPageComponent } from '../record/record-page/record-page.component.js'

import { DatahubRouterService } from './datahub-router.service.js'
import { ROUTER_ROUTE_ORGANIZATION } from '@geonetwork-ui/feature/router'
import { OrganizationPageComponent } from '../organization/organization-page/organization-page.component.js'

const RouterMock = {
  resetConfig: jest.fn(),
}

const expectedRoutes = [
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'prefix',
    title: 'datahub.pageTitle.home',
  },
  {
    path: '',
    title: 'datahub.pageTitle.home',
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
        title: 'datahub.pageTitle.home',
      },
      {
        path: 'search',
        component: SearchPageComponent,
        data: {
          shouldDetach: true,
        },
        title: 'datahub.pageTitle.recordSearch',
      },
      {
        path: 'organisations',
        component: OrganisationsPageComponent,
        data: {
          shouldDetach: true,
        },
        title: 'datahub.pageTitle.organizations',
      },
    ],
  },
  {
    path: `dataset/:metadataUuid`,
    component: RecordPageComponent,
    title: 'entityTitle',
  },
  {
    path: `service/:metadataUuid`,
    component: RecordPageComponent,
    title: 'entityTitle',
  },
  {
    path: `reuse/:metadataUuid`,
    component: RecordPageComponent,
    title: 'entityTitle',
  },
  {
    path: `${ROUTER_ROUTE_ORGANIZATION}/:name`,
    component: OrganizationPageComponent,
    data: {
      shouldDetach: true,
    },
    title: 'entityTitle',
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
