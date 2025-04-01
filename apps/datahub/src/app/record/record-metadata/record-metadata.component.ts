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
  UiElementsModule,
} from '@geonetwork-ui/ui/elements'
import { combineLatest } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import {
  Keyword,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { CommonModule } from '@angular/common'
import { MatTabsModule } from '@angular/material/tabs'
import { RecordUserFeedbacksComponent } from '../record-user-feedbacks/record-user-feedbacks.component'
import { RecordDownloadsComponent } from '../record-downloads/record-downloads.component'
import { RecordApisComponent } from '../record-apis/record-apis.component'
import { RecordOtherlinksComponent } from '../record-otherlinks/record-otherlinks.component'
import { RecordRelatedRecordsComponent } from '../record-related-records/record-related-records.component'
import { TranslateModule } from '@ngx-translate/core'
import { RecordDataPreviewComponent } from '../record-data-preview/record-data-preview.component'

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
    MetadataInfoComponent,
    MetadataContactComponent,
    MetadataQualityComponent,
    MetadataCatalogComponent,
    RecordRelatedRecordsComponent,
    TranslateModule,
    RecordDataPreviewComponent,
    UiElementsModule,
  ],
})
export class RecordMetadataComponent {
  @Input() metadataQualityDisplay: boolean

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
    private orgsService: OrganizationsServiceInterface
  ) {}

  onInfoKeywordClick(keyword: Keyword) {
    this.searchService.updateFilters({ any: keyword.label })
  }

  onOrganizationClick(org: Organization) {
    this.orgsService
      .getFiltersForOrgs([org])
      .subscribe((filters) => this.searchService.updateFilters(filters))
  }
}
