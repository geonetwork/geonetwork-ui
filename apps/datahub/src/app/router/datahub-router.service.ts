import { inject, Injectable } from '@angular/core'
import { Router, Routes } from '@angular/router'
import {
  ROUTER_ROUTE_DATASET,
  ROUTER_ROUTE_ORGANIZATION,
  ROUTER_ROUTE_REUSE,
  ROUTER_ROUTE_SEARCH,
  ROUTER_ROUTE_SERVICE,
} from '@geonetwork-ui/feature/router'
import { HomePageComponent } from '../home/home-page/home-page.component.js'
import { NewsPageComponent } from '../home/news-page/news-page.component.js'
import { OrganisationsPageComponent } from '../home/organisations-page/organisations-page.component.js'
import { SearchPageComponent } from '../home/search/search-page/search-page.component.js'
import { RecordPageComponent } from '../record/record-page/record-page.component.js'
import {
  ROUTER_ROUTE_HOME,
  ROUTER_ROUTE_NEWS,
  ROUTER_ROUTE_ORGANIZATIONS,
} from './constants.js'
import { OrganizationPageComponent } from '../organization/organization-page/organization-page.component.js'
import {
  SortByEnum,
  SortByField,
} from '@geonetwork-ui/common/domain/model/search/index.js'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('datahub.pageTitle.home')
marker('datahub.pageTitle.recordSearch')
marker('datahub.pageTitle.organizations')

@Injectable({
  providedIn: 'root',
})
export class DatahubRouterService {
  private router = inject(Router)

  initRoutes() {
    this.router.resetConfig(this.buildRoutes())
  }

  buildRoutes(): Routes {
    return [
      {
        path: ROUTER_ROUTE_HOME,
        redirectTo: ``,
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
            redirectTo: ROUTER_ROUTE_NEWS,
            pathMatch: 'prefix',
          },
          {
            path: ROUTER_ROUTE_NEWS,
            component: NewsPageComponent,
            data: {
              shouldDetach: true,
            },
            title: 'datahub.pageTitle.home',
          },
          {
            path: ROUTER_ROUTE_SEARCH,
            component: SearchPageComponent,
            data: {
              shouldDetach: true,
            },
            title: 'datahub.pageTitle.recordSearch',
          },
          {
            path: ROUTER_ROUTE_ORGANIZATIONS,
            component: OrganisationsPageComponent,
            data: {
              shouldDetach: true,
            },
            title: 'datahub.pageTitle.organizations',
          },
        ],
      },
      {
        path: `${ROUTER_ROUTE_DATASET}/:metadataUuid`,
        component: RecordPageComponent,
        title: 'entityTitle',
      },
      {
        path: `${ROUTER_ROUTE_SERVICE}/:metadataUuid`,
        component: RecordPageComponent,
        title: 'entityTitle',
      },
      {
        path: `${ROUTER_ROUTE_REUSE}/:metadataUuid`,
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
  }

  getSearchRoute(): string {
    return `${ROUTER_ROUTE_HOME}/${ROUTER_ROUTE_SEARCH}`
  }

  getOrganizationPageRoute(): string {
    return ROUTER_ROUTE_ORGANIZATION
  }

  getDefaultSort(): SortByField {
    return SortByEnum.RESOURCE_DATES
  }
}
