import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core'
import { SourcesService } from '@geonetwork-ui/feature/catalog'
import { SearchService } from '@geonetwork-ui/feature/search'
import {
  ErrorComponent,
  ErrorType,
  MetadataCatalogComponent,
  MetadataContactComponent,
  MetadataInfoComponent,
  MetadataQualityComponent,
  ServiceCapabilitiesComponent,
} from '@geonetwork-ui/ui/elements'
import { combineLatest } from 'rxjs'
import { filter, map, mergeMap, startWith } from 'rxjs/operators'
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
import { RecordInternalLinksComponent } from '../record-internal-links/record-internal-links.component'
import { RecordDataPreviewComponent } from '../record-data-preview/record-data-preview.component'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matChatOutline } from '@ng-icons/material-icons/outline'
import { RecordFeatureCatalogComponent } from '../record-feature-catalog/record-feature-catalog.component'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { RecordLinkedRecordsComponent } from '../record-linked-records/record-linked-records.component'

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
    NgIcon,
    ServiceCapabilitiesComponent,
    RecordFeatureCatalogComponent,
    RecordLinkedRecordsComponent,
    TranslateDirective,
    TranslatePipe,
  ],
  viewProviders: [provideIcons({ matChatOutline })],
})
export class RecordMetadataComponent {
  @Input() metadataQualityDisplay: boolean
  @ViewChild('userFeedbacks') userFeedbacks: ElementRef<HTMLElement>

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

  displayOtherLinks = this.metadataViewFacade.otherLinks$.pipe(
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

  scrollToQuestions() {
    if (this.userFeedbacks) {
      this.userFeedbacks.nativeElement.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }
}
