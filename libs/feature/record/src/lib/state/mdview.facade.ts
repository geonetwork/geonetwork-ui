import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import {
  defaultIfEmpty,
  filter,
  map,
  mergeMap,
  scan,
  switchMap,
  toArray,
} from 'rxjs/operators'
import * as MdViewActions from './mdview.actions'
import * as MdViewSelectors from './mdview.selectors'
import { LinkClassifierService, LinkUsage } from '@geonetwork-ui/util/shared'
import { DatavizConfigurationModel } from '@geonetwork-ui/common/domain/model/dataviz/dataviz-configuration.model'
import {
  CatalogRecord,
  UserFeedback,
} from '@geonetwork-ui/common/domain/model/record'
import { AvatarServiceInterface } from '@geonetwork-ui/api/repository'
import { OgcApiRecord } from '@camptocamp/ogc-client'
import { from, of } from 'rxjs'
import { DataService } from '@geonetwork-ui/feature/dataviz'

@Injectable()
/**
 * The Metadata View Facade is used to render complete metadata records.
 * Supply it with an incomplete record (at least containing the uuid) and the
 * corresponding full record will be loaded.
 * To clear the current record use the `close()` method.
 */
export class MdViewFacade {
  constructor(
    private store: Store,
    public linkClassifier: LinkClassifierService,
    private avatarService: AvatarServiceInterface,
    public dataService: DataService
  ) {}

  isPresent$ = this.store.pipe(
    select(MdViewSelectors.getMetadataUuid),
    map((uuid) => !!uuid)
  )

  isMetadataLoading$ = this.store.pipe(
    select(MdViewSelectors.getMetadataIsLoading)
  )

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

  geoDataLinksWithGeometry$ = this.allLinks$.pipe(
    switchMap((links) =>
      from(links).pipe(
        mergeMap((link) => {
          if (this.linkClassifier.hasUsage(link, LinkUsage.GEODATA)) {
            if (
              link.type === 'service' &&
              link.accessServiceProtocol === 'ogcFeatures'
            ) {
              return from(
                this.dataService.getItemsFromOgcApi(link.url.href)
              ).pipe(
                map((collectionRecords: OgcApiRecord) => {
                  return collectionRecords && collectionRecords.geometry
                    ? link
                    : null
                }),
                defaultIfEmpty(null)
              )
            } else {
              return of(link)
            }
          } else {
            return of(null)
          }
        }),
        toArray(),
        map((links) => links.filter((link) => link !== null))
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

  userFeedbacks$ = this.store.pipe(select(MdViewSelectors.getUserFeedbacks))
  isAllUserFeedbackLoading$ = this.store.pipe(
    select(MdViewSelectors.getAllUserFeedbacksLoading)
  )
  isAddUserFeedbackLoading$ = this.store.pipe(
    select(MdViewSelectors.getAddUserFeedbacksLoading)
  )

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

  closeMetadata() {
    this.store.dispatch(MdViewActions.closeMetadata())
  }

  setChartConfig(chartConfig: DatavizConfigurationModel) {
    this.store.dispatch(MdViewActions.setChartConfig({ chartConfig }))
  }

  /**
   * UserFeedbacks
   */
  addUserFeedback(userFeedback: UserFeedback) {
    this.store.dispatch(MdViewActions.addUserFeedback({ userFeedback }))
  }

  loadUserFeedbacks(datasetUuid: string) {
    this.store.dispatch(MdViewActions.loadUserFeedbacks({ datasetUuid }))
  }
}
