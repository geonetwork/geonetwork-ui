import { Injectable } from '@angular/core'
import { RecordSummary } from '@geonetwork-ui/util/shared'

import { select, Store } from '@ngrx/store'

import * as MdViewActions from './mdview.actions'
import * as MdViewSelectors from './mdview.selectors'

@Injectable()
export class MdViewFacade {
  uuid$ = this.store.pipe(select(MdViewSelectors.getMdViewUuid))
  preview$ = this.store.pipe(select(MdViewSelectors.getMdViewPreview))
  full$ = this.store.pipe(select(MdViewSelectors.getMdViewFull))
  error$ = this.store.pipe(select(MdViewSelectors.getMdViewError))
  loading$ = this.store.pipe(select(MdViewSelectors.getMdViewLoading))

  constructor(private store: Store) {}

  loadFull(uuid: string) {
    this.store.dispatch(MdViewActions.loadFull({ uuid }))
  }
  setPreview(preview: RecordSummary) {
    this.store.dispatch(MdViewActions.setPreview({ preview }))
  }
}
