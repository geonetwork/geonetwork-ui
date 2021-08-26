import { Injectable } from '@angular/core'
import { RecordSummary } from '@geonetwork-ui/util/shared'

import { select, Store } from '@ngrx/store'
import { filter, map } from 'rxjs/operators'

import * as MdViewActions from './mdview.actions'
import * as MdViewSelectors from './mdview.selectors'

@Injectable()
/**
 * The Metadata View Facade is used to render complete metadata records.
 * Supply it with an incomplete record (at least containing the uuid) and the
 * corresponding full record will be loaded.
 * To clear the current record use the `close()` method.
 */
export class MdViewFacade {
  isPresent$ = this.store.pipe(
    select(MdViewSelectors.getMetadataUuid),
    map((uuid) => !!uuid)
  )
  metadata$ = this.store.pipe(
    select(MdViewSelectors.getMetadata),
    filter((md) => !!md)
  )
  isIncomplete$ = this.store.pipe(
    select(MdViewSelectors.getMetadataIsIncomplete),
    filter((incomplete) => incomplete !== null)
  )
  error$ = this.store.pipe(
    select(MdViewSelectors.getMetadataError),
    filter((error) => error !== null)
  )

  constructor(private store: Store) {}

  /**
   * This will load an incomplete record (e.g. from a search result) in the state
   * The full record will be automatically loaded subsequently
   * @param {RecordSummary} incomplete
   */
  setIncompleteMetadata(incomplete: RecordSummary) {
    this.store.dispatch(MdViewActions.setIncompleteMetadata({ incomplete }))
  }
  close() {
    this.store.dispatch(MdViewActions.close())
  }
}
