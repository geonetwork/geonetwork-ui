import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core'
import { MatDialogModule } from '@angular/material/dialog'
import { MatTabsModule } from '@angular/material/tabs'
import {
  CatalogRecord,
  Keyword,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { SourcesService } from '@geonetwork-ui/feature/catalog'
import {
  EditDeleteReuseButtonsComponent,
  NotifyReuseFormComponent,
  REUSE_FORM_URL,
} from '@geonetwork-ui/feature/notify-reuse'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { SearchService } from '@geonetwork-ui/feature/search'
import {
  ErrorComponent,
  ErrorType,
  MetadataCatalogComponent,
  MetadataContactComponent,
  MetadataDoiComponent,
  MetadataInfoComponent,
  MetadataQualityComponent,
  ServiceCapabilitiesComponent,
} from '@geonetwork-ui/ui/elements'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import { iconoirAppWindow } from '@ng-icons/iconoir'
import {
  matChatOutline,
  matDeleteOutline,
  matEditOutline,
} from '@ng-icons/material-icons/outline'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { combineLatest, Observable, of } from 'rxjs'
import { filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { RecordApisComponent } from '../record-apis/record-apis.component'
import { RecordDataPreviewComponent } from '../record-data-preview/record-data-preview.component'
import { RecordDownloadsComponent } from '../record-downloads/record-downloads.component'
import { RecordFeatureCatalogComponent } from '../record-feature-catalog/record-feature-catalog.component'
import { RecordInternalLinksComponent } from '../record-internal-links/record-internal-links.component'
import { RecordLinkedRecordsComponent } from '../record-linked-records/record-linked-records.component'
import { RecordOtherlinksComponent } from '../record-otherlinks/record-otherlinks.component'
import { RecordUserFeedbacksComponent } from '../record-user-feedbacks/record-user-feedbacks.component'

@Component({
  selector: 'datahub-record-metadata',
  templateUrl: './record-metadata.component.html',
  styleUrls: ['./record-metadata.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
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
    RecordInternalLinksComponent,
    RecordDataPreviewComponent,
    ButtonComponent,
    ServiceCapabilitiesComponent,
    RecordFeatureCatalogComponent,
    RecordLinkedRecordsComponent,
    TranslateDirective,
    TranslatePipe,
    MetadataDoiComponent,
    NotifyReuseFormComponent,
    EditDeleteReuseButtonsComponent,
    NgIcon,
    MatDialogModule,
  ],
  viewProviders: [
    provideIcons({
      matChatOutline,
      iconoirAppWindow,
      matEditOutline,
      matDeleteOutline,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class RecordMetadataComponent {
  metadataViewFacade = inject(MdViewFacade)
  private searchService = inject(SearchService)
  private sourceService = inject(SourcesService)
  private orgsService = inject(OrganizationsServiceInterface)
  private readonly platformServiceInterface = inject(PlatformServiceInterface)
  private recordsRepository = inject(RecordsRepositoryInterface)
  reuseFormUrl = inject(REUSE_FORM_URL, { optional: true })

  errorTypes = ErrorType

  @Input() metadataQualityDisplay: boolean
  @ViewChild('userFeedbacks') userFeedbacks: ElementRef<HTMLElement>

  hasThumbnail$ = this.metadataViewFacade.metadata$.pipe(
    map((metadata) => !!metadata?.overviews?.[0]?.url)
  )

  private readonly displayConditions = {
    dataset: {
      download: (links) => links?.length > 0,
      api: (links) => links?.length > 0,
      map: (mapApiLinks, geoDataLinksWithGeometry) =>
        mapApiLinks?.length > 0 || geoDataLinksWithGeometry?.length > 0,
      data: (dataLinks, geoDataLinks) =>
        dataLinks?.length > 0 || geoDataLinks?.length > 0,
    },
    service: {
      capabilities: (links) => links?.length > 0,
    },
    reuse: {
      download: (links) => links?.length > 0,
      api: (links) => links?.length > 0,
    },
  }

  private getDisplayCondition(
    kind: 'dataset' | 'service' | 'reuse',
    section: string
  ) {
    const kindConfig = this.displayConditions[kind]
    const condition = kindConfig?.[section]

    return condition ?? (() => false)
  }

  apiLinks$ = this.metadataViewFacade.apiLinks$

  kind$ = this.metadataViewFacade.metadata$.pipe(
    map((record) => record?.kind),
    filter((kind) => kind !== undefined)
  )

  displayDownload$ = combineLatest([
    this.metadataViewFacade.downloadLinks$,
    this.kind$,
  ]).pipe(
    map(([links, kind]) => this.getDisplayCondition(kind, 'download')(links))
  )

  displayApi$ = combineLatest([
    this.metadataViewFacade.apiLinks$,
    this.kind$,
  ]).pipe(map(([links, kind]) => this.getDisplayCondition(kind, 'api')(links)))

  displayCapabilities$ = combineLatest([
    this.metadataViewFacade.apiLinks$,
    this.kind$,
  ]).pipe(
    map(([links, kind]) =>
      this.getDisplayCondition(kind, 'capabilities')(links)
    )
  )

  displayMap$ = combineLatest([
    this.metadataViewFacade.mapApiLinks$,
    this.metadataViewFacade.geoDataLinksWithGeometry$,
    this.kind$,
  ]).pipe(
    map(([mapApiLinks, geoDataLinksWithGeometry, kind]) =>
      this.getDisplayCondition(kind, 'map')(
        mapApiLinks,
        geoDataLinksWithGeometry
      )
    ),
    startWith(false)
  )

  displayData$ = combineLatest([
    this.metadataViewFacade.dataLinks$,
    this.metadataViewFacade.geoDataLinks$,
    this.kind$,
  ]).pipe(
    map(([dataLinks, geoDataLinks, kind]) =>
      this.getDisplayCondition(kind, 'data')(dataLinks, geoDataLinks)
    )
  )

  displayStac$ = this.metadataViewFacade.stacLinks$.pipe(
    map((stacLinks) => stacLinks?.length > 0)
  )

  displayOtherLinks$ = this.metadataViewFacade.otherLinks$.pipe(
    map((links) => links?.length > 0)
  )
  displayRelated$ = this.metadataViewFacade.related$.pipe(
    map((records) => records?.length > 0)
  )

  displayLinked$ = combineLatest([
    this.metadataViewFacade.sources$,
    this.metadataViewFacade.sourceOf$,
  ]).pipe(
    map(([sources, sourceOf]) => sources?.length > 0 || sourceOf?.length > 0)
  )

  displayFeatureCatalog$ = combineLatest([
    this.metadataViewFacade.metadata$,
    this.metadataViewFacade.featureCatalog$,
  ]).pipe(
    map(
      ([metadata, featureCatalog]) =>
        //subscribing to metadata in order to refresh featureCatalog information
        featureCatalog?.featureTypes?.length > 0
    )
  )

  displayDatasetHasNoLinkBlock$ = combineLatest([
    this.metadataViewFacade.isMetadataLoading$,
    this.displayDownload$,
    this.displayApi$,
    this.displayOtherLinks$,
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

  feedbacksAllowed$ = this.platformServiceInterface.getFeedbacksAllowed()

  get isAuthDisabled(): boolean {
    return !this.platformServiceInterface.supportsAuthentication()
  }

  writableGroupId$: Observable<string | null> = this.platformServiceInterface
    .getUserPermissionsByGroup()
    .pipe(
      map(
        (permissions) =>
          permissions.find((p) => p.canApprove)?.groupId?.toString() ??
          permissions.find((p) => p.canEdit)?.groupId?.toString() ??
          null
      )
    )

  reuseNotificationAllowed$: Observable<boolean> = this.reuseFormUrl
    ? combineLatest([this.writableGroupId$, this.kind$]).pipe(
        map(([groupId, kind]) => groupId !== null && kind === 'dataset')
      )
    : of(false)

  showEditDeleteReuseButtons$: Observable<boolean> =
    this.metadataViewFacade.metadata$.pipe(
      switchMap((record) =>
        record?.kind === 'reuse' && this.reuseFormUrl
          ? // keeping it simple here for now, as edit and delete use the same conditions
            this.recordsRepository.canEditIndexedRecord(record as CatalogRecord)
          : of(false)
      )
    )

  onInfoKeywordClick(keyword: Keyword) {
    this.searchService.updateFilters({ any: keyword.label })
  }

  onOrganizationClick(org: Organization) {
    this.orgsService
      .getFiltersForOrgs([org])
      .subscribe((filters) => this.searchService.updateFilters(filters))
  }

  scrollToQuestions() {
    if (this.userFeedbacks) {
      this.userFeedbacks.nativeElement.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }
}
