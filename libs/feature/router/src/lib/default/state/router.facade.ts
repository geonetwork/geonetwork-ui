import { Injectable } from '@angular/core'
import { MdViewActions } from '@geonetwork-ui/feature/record'
import { RouterService } from '../router.service'
import { RouterReducerState } from '@ngrx/router-store'
import { select, Store } from '@ngrx/store'
import { distinctUntilChanged, filter, map, take } from 'rxjs/operators'
import {
  ROUTER_ROUTE_DATASET,
  ROUTER_ROUTE_SEARCH,
  ROUTER_ROUTE_SERVICE,
  ROUTER_ROUTE_REUSE,
  SearchRouteParams,
} from '../constants'
import {
  backAction,
  forwardAction,
  goAction,
  RouterGoActionPayload,
} from './router.actions'
import { selectCurrentRoute, selectRouteParams } from './router.selectors'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { expandQueryParams, flattenQueryParams } from './query-params.utils'

@Injectable()
export class RouterFacade {
  currentRoute$ = this.store.pipe(select(selectCurrentRoute))
  pathParams$ = this.store.pipe(select(selectRouteParams))

  searchParams$ = this.currentRoute$.pipe(
    filter((route) => !!route),
    filter((route) => route.url[0]?.path.startsWith(ROUTER_ROUTE_SEARCH)),
    map((route) => route.queryParams),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    map(expandQueryParams)
  )

  routeMap = {
    dataset: ROUTER_ROUTE_DATASET,
    service: ROUTER_ROUTE_SERVICE,
    reuse: ROUTER_ROUTE_REUSE,
  }

  constructor(
    private store: Store<RouterReducerState>,
    private routerService: RouterService
  ) {}

  goToMetadata(metadata: CatalogRecord) {
    const selectedRoute = this.routeMap[metadata.kind] || ROUTER_ROUTE_DATASET
    this.pathParams$
      .pipe(
        take(1),
        filter((params) => params.metadataUuid !== metadata.uniqueIdentifier)
      )
      .subscribe(() => {
        this.go({
          path: `${selectedRoute}/${metadata.uniqueIdentifier}`,
        })
        this.store.dispatch(
          MdViewActions.setIncompleteMetadata({ incomplete: metadata })
        )
      })
  }

  goToOrganization(organizationName: string) {
    const path = `${this.routerService.getOrganizationPageRoute()}/${organizationName}`
    this.go({
      path,
      queryParamsHandling: '',
    })
  }

  updateSearch(query?: SearchRouteParams) {
    this.go({
      path: this.routerService.getSearchRoute(),
      ...(query && { query: flattenQueryParams(query) }),
      queryParamsHandling: 'merge',
    })
  }

  setSearch(query?: SearchRouteParams) {
    this.go({
      path: this.routerService.getSearchRoute(),
      ...(query && { query: flattenQueryParams(query) }),
    })
  }

  go(payload: RouterGoActionPayload) {
    this.store.dispatch(goAction(payload))
  }

  back() {
    this.store.dispatch(backAction())
  }

  forward() {
    this.store.dispatch(forwardAction())
  }
}
