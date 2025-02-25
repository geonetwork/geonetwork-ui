import { Injectable } from '@angular/core'
import { Router, Routes } from '@angular/router'
import {
  ROUTER_ROUTE_DATASET,
  ROUTER_ROUTE_ORGANIZATION,
  ROUTER_ROUTE_SEARCH,
} from '@geonetwork-ui/feature/router'
import { HomePageComponent } from '../home/home-page/home-page.component'
import { NewsPageComponent } from '../home/news-page/news-page.component'
import { OrganisationsPageComponent } from '../home/organisations-page/organisations-page.component'
import { SearchPageComponent } from '../home/search/search-page/search-page.component'
import { RecordPageComponent } from '../record/record-page/record-page.component'
import {
  ROUTER_ROUTE_HOME,
  ROUTER_ROUTE_NEWS,
  ROUTER_ROUTE_ORGANIZATIONS,
} from './constants'
import { OrganizationPageComponent } from '../organization/organization-page/organization-page.component'

@Injectable({
  providedIn: 'root',
})
export class DatahubRouterService {
  constructor(private router: Router) {}

  initRoutes() {
    this.router.resetConfig(this.buildRoutes())
  }

  buildRoutes(): Routes {
    return [
      {
        path: ROUTER_ROUTE_HOME,
        redirectTo: ``,
        pathMatch: 'prefix',
        title: 'seo.page.title.home',
      },
      {
        path: '',
        title: 'seo.page.title.home',
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
            title: 'seo.page.title.news',
          },
          {
            path: ROUTER_ROUTE_SEARCH,
            component: SearchPageComponent,
            data: {
              shouldDetach: true,
            },
            title: 'seo.page.title.search',
          },
          {
            path: ROUTER_ROUTE_ORGANIZATIONS,
            component: OrganisationsPageComponent,
            data: {
              shouldDetach: true,
            },
            title: 'seo.page.title.organizations',
          },
        ],
      },
      {
        path: `${ROUTER_ROUTE_DATASET}/:metadataUuid`,
        component: RecordPageComponent,
        title: 'seo.page.title.metadata',
      },
      {
        path: `${ROUTER_ROUTE_ORGANIZATION}/:name`,
        component: OrganizationPageComponent,
        data: {
          shouldDetach: true,
        },
        title: 'seo.page.title.organization',
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
}
