import { inject, Injectable } from '@angular/core'
import {
  ROUTER_ROUTE_DATASET,
  ROUTER_ROUTE_ORGANIZATION,
  ROUTER_ROUTE_REUSE,
  ROUTER_ROUTE_SEARCH,
  ROUTER_ROUTE_SERVICE,
} from './constants.js'
import { Router, Routes } from '@angular/router'
import { ROUTER_CONFIG, RouterConfigModel } from './router.config.js'
import {
  SortByEnum,
  SortByField,
} from '@geonetwork-ui/common/domain/model/search/index.js'

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  protected routerConfig = inject<RouterConfigModel>(ROUTER_CONFIG)
  private router = inject(Router)

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

  getDefaultSort(): SortByField {
    return SortByEnum.RESOURCE_DATES
  }
}
