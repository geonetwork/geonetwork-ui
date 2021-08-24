import { Injectable } from '@angular/core'

import { select, Store } from '@ngrx/store'

import * as MdViewActions from './mdview.actions'
import * as MdViewSelectors from './mdview.selectors'

@Injectable()
export class MdViewFacade {
  uuid$ = this.store.pipe(select(MdViewSelectors.getMdViewUuid))

  constructor(private store: Store) {}

  setUuid(uuid: string) {
    this.store.dispatch(MdViewActions.setUuid({ uuid }))
  }
}
