import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { filter, map } from 'rxjs/operators'
import * as MdViewActions from './mdview.actions'
import * as MdViewSelectors from './mdview.selectors'
import { LinkClassifierService, LinkUsage } from '@geonetwork-ui/util/shared'
import { DatavizConfigurationModel } from '@geonetwork-ui/common/domain/dataviz-configuration.model'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'

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
  error$ = this.store.pipe(select(MdViewSelectors.getMetadataError))

  related$ = this.store.pipe(select(MdViewSelectors.getRelated))

  chartConfig$ = this.store.pipe(select(MdViewSelectors.getChartConfig))

  allLinks$ = this.metadata$.pipe(
    map((record) => ('distributions' in record ? record.distributions : []))
  )
  apiLinks$ = this.allLinks$.pipe(
    map((links) =>
      links.filter((link) => this.linkClassifier.hasUsage(link, LinkUsage.API))
    )
  )
  mapApiLinks$ = this.allLinks$.pipe(
    map((links) =>
      links.filter((link) =>
        this.linkClassifier.hasUsage(link, LinkUsage.MAP_API)
      )
    )
  )
  downloadLinks$ = this.allLinks$.pipe(
    map((links) =>
      links.filter((link) =>
        this.linkClassifier.hasUsage(link, LinkUsage.DOWNLOAD)
      )
    )
  )
  dataLinks$ = this.allLinks$.pipe(
    map((links) =>
      links.filter((link) => this.linkClassifier.hasUsage(link, LinkUsage.DATA))
    )
  )
  geoDataLinks$ = this.allLinks$.pipe(
    map((links) =>
      links.filter((link) =>
        this.linkClassifier.hasUsage(link, LinkUsage.GEODATA)
      )
    )
  )
  landingPageLinks$ = this.metadata$.pipe(
    map((record) => ('landingPage' in record ? [record.landingPage] : []))
  )
  otherLinks$ = this.allLinks$.pipe(
    map((links) =>
      links.filter((link) =>
        this.linkClassifier.hasUsage(link, LinkUsage.UNKNOWN)
      )
    )
  )

  constructor(
    private store: Store,
    private linkClassifier: LinkClassifierService
  ) {}

  /**
   * This will show an incomplete record (e.g. from a search result) as a preview
   * Note: the full record will not be loaded automatically; use the `loadFull` method for that
   */
  setIncompleteMetadata(incomplete: CatalogRecord) {
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
  setChartConfig(chartConfig: DatavizConfigurationModel) {
    this.store.dispatch(MdViewActions.setChartConfig({ chartConfig }))
  }
}
