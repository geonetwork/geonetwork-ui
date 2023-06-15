import { Injectable } from '@angular/core'
import { Router, Routes } from '@angular/router'
import {
  ROUTER_ROUTE_DATASET,
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
  ROUTER_ROUTE_ORGANISATIONS,
} from './constants'

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
            redirectTo: ROUTER_ROUTE_NEWS,
            pathMatch: 'prefix',
          },
          {
            path: ROUTER_ROUTE_NEWS,
            component: NewsPageComponent,
            data: {
              shouldDetach: true,
            },
          },
          {
            path: ROUTER_ROUTE_SEARCH,
            component: SearchPageComponent,
            data: {
              shouldDetach: true,
            },
          },
          {
            path: ROUTER_ROUTE_ORGANISATIONS,
            component: OrganisationsPageComponent,
            data: {
              shouldDetach: true,
            },
          },
        ],
      },
      {
        path: `${ROUTER_ROUTE_DATASET}/:metadataUuid`,
        component: RecordPageComponent,
      },
    ]
  }

  getSearchRoute(): string {
    return `${ROUTER_ROUTE_HOME}/${ROUTER_ROUTE_SEARCH}`
  }
}
