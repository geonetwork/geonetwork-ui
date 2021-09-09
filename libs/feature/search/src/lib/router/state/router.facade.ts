import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import {
  backAction,
  forwardAction,
  goAction,
  RouterGoActionPayload,
} from './router.actions'
import {
  selectCurrentRoute,
  selectQueryParams,
  selectRouteParams,
  selectUrl,
} from './router.selectors'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { RouterReducerState } from '@ngrx/router-store'
import { setIncompleteMetadata } from '../../metadata-view/state/mdview.actions'

@Injectable()
export class RouterFacade {
  currentRoute$ = this.store.pipe(select(selectCurrentRoute))
  queryParams$ = this.store.pipe(select(selectQueryParams))
  pathParams$ = this.store.pipe(select(selectRouteParams))
  fullUrl$ = this.store.pipe(select(selectUrl))

  constructor(private store: Store<RouterReducerState>) {}

  goToMetadata(metadata: MetadataRecord) {
    this.store.dispatch(
      goAction({
        path: `metadata/${metadata.uuid}`,
      })
    )
    this.store.dispatch(setIncompleteMetadata({ incomplete: metadata }))
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
