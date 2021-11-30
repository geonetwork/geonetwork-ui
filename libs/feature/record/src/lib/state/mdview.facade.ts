import { Injectable } from '@angular/core'
import { LinkHelperService } from '@geonetwork-ui/feature/search'
import { MetadataLinkValid, MetadataRecord } from '@geonetwork-ui/util/shared'

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
  isLoading$ = this.store.pipe(select(MdViewSelectors.getMetadataIsLoading))
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

  allLinks$ = this.metadata$.pipe(
    map((record) => (this.helper.hasLinks(record) ? record.links : []))
  )
  validLinks$ = this.allLinks$.pipe(
    map(
      (links) =>
        links.filter((link) =>
          this.helper.isValidLink(link)
        ) as MetadataLinkValid[]
    )
  )
  apiLinks$ = this.validLinks$.pipe(
    map((links) => links.filter((link) => this.helper.isApiLink(link)))
  )
  mapApiLinks$ = this.validLinks$.pipe(
    map((links) => links.filter((link) => this.helper.isMapApiLink(link)))
  )
  downloadLinks$ = this.validLinks$.pipe(
    map((links) => links.filter((link) => this.helper.isDownloadLink(link)))
  )
  dataLinks$ = this.validLinks$.pipe(
    map((links) => links.filter((link) => this.helper.isDataLink(link)))
  )
  geoDataLinks$ = this.validLinks$.pipe(
    map((links) => links.filter((link) => this.helper.isGeoDataLink(link)))
  )
  landingPageLinks$ = this.validLinks$.pipe(
    map((links) => links.filter((link) => this.helper.isLandingPage(link)))
  )
  otherLinks$ = this.validLinks$.pipe(
    map((links) => links.filter((link) => this.helper.isOtherLink(link)))
  )

  constructor(private store: Store, private helper: LinkHelperService) {}

  /**
   * This will show an incomplete record (e.g. from a search result) as a preview
   * Note: the full record will not be loaded automatically; use the `loadFull` method for that
   */
  setIncompleteMetadata(incomplete: MetadataRecord) {
    this.store.dispatch(MdViewActions.setIncompleteMetadata({ incomplete }))
  }
  /**
   * This will trigger the load of a full metadata record
   */
  loadFull(uuid: string) {
    this.store.dispatch(MdViewActions.loadFullMetadata({ uuid }))
  }
  close() {
    this.store.dispatch(MdViewActions.close())
  }
}
