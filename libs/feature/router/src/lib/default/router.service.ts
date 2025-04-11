import { Inject, Injectable } from '@angular/core'
import {
  ROUTER_ROUTE_DATASET,
  ROUTER_ROUTE_ORGANIZATION,
  ROUTER_ROUTE_SEARCH,
  ROUTER_ROUTE_SERVICE,
  ROUTER_ROUTE_REUSE,
} from '.'
import { Router, Routes } from '@angular/router'
import { ROUTER_CONFIG, RouterConfigModel } from './router.config'

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(
    @Inject(ROUTER_CONFIG) protected routerConfig: RouterConfigModel,
    private router: Router
  ) {}

  initRoutes() {
    this.router.resetConfig(this.buildRoutes())
  }

  buildRoutes(): Routes {
    return [
      { path: '', redirectTo: `/${ROUTER_ROUTE_SEARCH}`, pathMatch: 'full' },
      {
        path: ROUTER_ROUTE_SEARCH,
        data: {
          shouldDetach: true,
        },
        component: this.routerConfig.searchRouteComponent,
      },
      {
        path: `${ROUTER_ROUTE_DATASET}/:metadataUuid`,
        component: this.routerConfig.recordRouteComponent,
      },
      {
        path: `${ROUTER_ROUTE_SERVICE}/:metadataUuid`,
        component: this.routerConfig.recordRouteComponent,
      },
      {
        path: `${ROUTER_ROUTE_REUSE}/:metadataUuid`,
        component: this.routerConfig.recordRouteComponent,
      },
      {
        path: `${ROUTER_ROUTE_ORGANIZATION}/:name`,
        component: this.routerConfig.organizationRouteComponent,
      },
    ]
  }

  getSearchRoute(): string {
    return ROUTER_ROUTE_SEARCH
  }

  getOrganizationPageRoute(): string {
    return ROUTER_ROUTE_ORGANIZATION
  }
}
