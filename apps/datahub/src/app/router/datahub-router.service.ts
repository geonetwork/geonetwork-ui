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
  ROUTER_ROUTE_ORGANISATION,
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
        path: '',
        redirectTo: `${ROUTER_ROUTE_HOME}/${ROUTER_ROUTE_SEARCH}`,
        pathMatch: 'full',
      },
      {
        path: ROUTER_ROUTE_HOME,
        component: HomePageComponent,
        children: [
          {
            path: ROUTER_ROUTE_NEWS,
            component: NewsPageComponent,
          },
          {
            path: ROUTER_ROUTE_SEARCH,
            component: SearchPageComponent,
          },
          {
            path: ROUTER_ROUTE_ORGANISATION,
            component: OrganisationsPageComponent,
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
