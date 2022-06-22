import { Inject, Injectable } from '@angular/core'
import { Router, Routes } from '@angular/router'
import {
  RouterConfigModel,
  ROUTER_CONFIG,
  ROUTER_ROUTE_DATASET,
  ROUTER_ROUTE_SEARCH,
} from '@geonetwork-ui/feature/router'
import {
  ROUTER_ROUTE_HOME,
  ROUTER_ROUTE_NEWS,
  ROUTER_ROUTE_ORGANISATION,
} from './constants'

@Injectable({
  providedIn: 'root',
})
export class DatahubRouterInitServiceService {
  constructor(
    @Inject(ROUTER_CONFIG) private routerConfig: RouterConfigModel,
    private router: Router
  ) {}

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
        path: `${ROUTER_ROUTE_HOME}`,
        component: this.routerConfig.homeRouteComponent,
        children: [
          {
            path: ROUTER_ROUTE_NEWS,
            component: this.routerConfig.newsRouteComponent,
          },
          {
            path: ROUTER_ROUTE_SEARCH,
            component: this.routerConfig.searchRouteComponent,
          },
          {
            path: ROUTER_ROUTE_ORGANISATION,
            component: this.routerConfig.organisationsRouteComponent,
          },
        ],
      },
      {
        path: `${ROUTER_ROUTE_DATASET}/:metadataUuid`,
        component: this.routerConfig.recordRouteComponent,
      },
    ]
  }
}
