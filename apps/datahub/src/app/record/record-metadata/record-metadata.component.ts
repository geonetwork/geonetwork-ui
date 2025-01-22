import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { SourcesService } from '@geonetwork-ui/feature/catalog'
import { SearchService } from '@geonetwork-ui/feature/search'
import {
  ErrorComponent,
  ErrorType,
  ImageOverlayPreviewComponent,
  MetadataCatalogComponent,
  MetadataContactComponent,
  MetadataInfoComponent,
  MetadataQualityComponent,
} from '@geonetwork-ui/ui/elements'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import {
  Keyword,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import {
  DataViewComponent,
  DataViewShareComponent,
  MapViewComponent,
  MdViewFacade,
} from '@geonetwork-ui/feature/record'
import { CommonModule } from '@angular/common'
import { MatTabsModule } from '@angular/material/tabs'
import { RecordUserFeedbacksComponent } from '../record-user-feedbacks/record-user-feedbacks.component'
import { RecordDownloadsComponent } from '../record-downloads/record-downloads.component'
import { RecordApisComponent } from '../record-apis/record-apis.component'
import { RecordOtherlinksComponent } from '../record-otherlinks/record-otherlinks.component'
import { RecordRelatedRecordsComponent } from '../record-related-records/record-related-records.component'
import { TranslateModule } from '@ngx-translate/core'
import { PopupAlertComponent } from '@geonetwork-ui/ui/widgets'
import { DataService } from '@geonetwork-ui/feature/dataviz'

@Component({
  selector: 'datahub-record-metadata',
  templateUrl: './record-metadata.component.html',
  styleUrls: ['./record-metadata.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ImageOverlayPreviewComponent,
    MatTabsModule,
    ErrorComponent,
    RecordUserFeedbacksComponent,
    RecordDownloadsComponent,
    RecordApisComponent,
    RecordOtherlinksComponent,
    DataViewShareComponent,
    MetadataInfoComponent,
    MetadataContactComponent,
    MetadataQualityComponent,
    MetadataCatalogComponent,
    RecordRelatedRecordsComponent,
    DataViewComponent,
    MapViewComponent,
    TranslateModule,
    PopupAlertComponent,
  ],
})
export class RecordMetadataComponent {
  @Input() metadataQualityDisplay: boolean

  displayMap$ = combineLatest([
    this.metadataViewFacade.mapApiLinks$,
    this.metadataViewFacade.geoDataLinksWithGeometry$,
  ]).pipe(
    map(([mapApiLinks, geoDataLinksWithGeometry]) => {
      return mapApiLinks?.length > 0 || geoDataLinksWithGeometry?.length > 0
    }),
    startWith(false)
  )

  displayData$ = combineLatest([
    this.metadataViewFacade.dataLinks$,
    this.metadataViewFacade.geoDataLinks$,
  ]).pipe(
    map(
      ([dataLinks, geoDataLinks]) =>
        dataLinks?.length > 0 || geoDataLinks?.length > 0
    )
  )

  displayDownload$ = this.metadataViewFacade.downloadLinks$.pipe(
    map((links) => links?.length > 0)
  )
  displayApi$ = this.metadataViewFacade.apiLinks$.pipe(
    map((links) => links?.length > 0)
  )

  displayOtherLinks = this.metadataViewFacade.otherLinks$.pipe(
    map((links) => links?.length > 0)
  )
  displayRelated$ = this.metadataViewFacade.related$.pipe(
    map((records) => records?.length > 0)
  )

  displayDatasetHasNoLinkBlock$ = combineLatest([
    this.metadataViewFacade.isMetadataLoading$,
    this.displayDownload$,
    this.displayApi$,
    this.displayOtherLinks,
  ]).pipe(
    map(
      ([isMetadataLoading, displayDownload, displayApi, displayOtherLinks]) =>
        !isMetadataLoading &&
        !displayDownload &&
        !displayApi &&
        !displayOtherLinks
    )
  )

  exceedsWfsFeatureCountLimit$ =
    this.metadataViewFacade.geoDataLinksWithGeometry$.pipe(
      map(
        (links) =>
          links.filter((link) => link.accessServiceProtocol === 'wfs')[0]
      ),
      switchMap((link) =>
        this.dataService
          .getWfsFeatureCount(link.url.toString(), link.name)
          .pipe(map((count) => !count || count > 1000))
      )
    )

  organisationName$ = this.metadataViewFacade.metadata$.pipe(
    map((record) => record?.ownerOrganization?.name),
    filter(Boolean)
  )

  metadataUuid$ = this.metadataViewFacade.metadata$.pipe(
    map((record) => record?.uniqueIdentifier),
    filter(Boolean)
  )

  sourceLabel$ = this.metadataViewFacade.metadata$.pipe(
    map((record) => record?.extras?.catalogUuid as string),
    filter((uuid) => !!uuid),
    mergeMap((uuid) => this.sourceService.getSourceLabel(uuid))
  )

  errorTypes = ErrorType

  selectedView$ = new BehaviorSubject('map')

  thumbnailUrl$ = this.metadataViewFacade.metadata$.pipe(
    map((metadata) => {
      // in order to differentiate between metadata not loaded yet
      // and url not defined
      // the content-ghost of image-overlay-preview relies on this differentiation
      if (metadata?.overviews === undefined) {
        return undefined
      } else {
        return metadata?.overviews?.[0]?.url ?? null
      }
    })
  )

  showOverlay = true

  constructor(
    public metadataViewFacade: MdViewFacade,
    private searchService: SearchService,
    private sourceService: SourcesService,
    private orgsService: OrganizationsServiceInterface,
    private dataService: DataService
  ) {}

  onTabIndexChange(index: number): void {
    let view
    switch (index) {
      case 0:
        view = 'map'
        break
      case 1:
        view = 'table'
        break
      default:
        view = 'chart'
    }
    this.selectedView$.next(view)
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  onInfoKeywordClick(keyword: Keyword) {
    this.searchService.updateFilters({ any: keyword.label })
  }

  onOrganizationClick(org: Organization) {
    this.orgsService
      .getFiltersForOrgs([org])
      .subscribe((filters) => this.searchService.updateFilters(filters))
  }
}
