import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ROUTER_ROUTE_SEARCH } from '@geonetwork-ui/feature/router'
import { appRoutes } from './app.routes'

@Injectable({
  providedIn: 'root',
})
export class EditorRouterService {
  constructor(private router: Router) {}

  initRoutes() {
    this.router.resetConfig(appRoutes)
  }

  getSearchRoute(): string {
    return ROUTER_ROUTE_SEARCH
  }
}
