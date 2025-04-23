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
import { BehaviorSubject, combineLatest } from 'rxjs'
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
import { RecordRelatedRecordsComponent } from '../record-related-records/record-related-records.component'
import { TranslateModule } from '@ngx-translate/core'
import { RecordDataPreviewComponent } from '../record-data-preview/record-data-preview.component'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matChatOutline } from '@ng-icons/material-icons/outline'

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
    RecordRelatedRecordsComponent,
    TranslateModule,
    RecordDataPreviewComponent,
    ButtonComponent,
    NgIcon,
    ServiceCapabilitiesComponent,
  ],
  viewProviders: [provideIcons({ matChatOutline })],
})
export class RecordMetadataComponent {
  @Input() metadataQualityDisplay: boolean
  public kindSubject = new BehaviorSubject<'dataset' | 'service' | 'reuse'>(
    null
  )
  @Input()
  set kind(value: 'dataset' | 'service' | 'reuse') {
    this.kindSubject.next(value)
  }
  get kind() {
    return this.kindSubject.value
  }
  @ViewChild('userFeedbacks') userFeedbacks: ElementRef<HTMLElement>

  displayDownload$ = combineLatest([
    this.metadataViewFacade.downloadLinks$,
    this.kindSubject,
  ]).pipe(map(([links, kind]) => links?.length > 0 && kind === 'dataset'))
  apiLinks$ = this.metadataViewFacade.apiLinks$
  displayApi$ = combineLatest([this.apiLinks$, this.kindSubject]).pipe(
    map(([links, kind]) => links.length > 0 && kind === 'dataset')
  )
  displayCapabilities$ = combineLatest([this.apiLinks$, this.kindSubject]).pipe(
    map(([links, kind]) => links.length > 0 && kind === 'service')
  )
  displayOtherLinks = this.metadataViewFacade.otherLinks$.pipe(
    map((links) => links?.length > 0)
  )
  displayRelated$ = this.metadataViewFacade.related$.pipe(
    map((records) => records?.length > 0)
  )

  displayMap$ = combineLatest([
    this.metadataViewFacade.mapApiLinks$,
    this.metadataViewFacade.geoDataLinksWithGeometry$,
    this.kindSubject,
  ]).pipe(
    map(([mapApiLinks, geoDataLinksWithGeometry, kind]) => {
      return (
        kind === 'dataset' &&
        (mapApiLinks?.length > 0 || geoDataLinksWithGeometry?.length > 0)
      )
    }),
    startWith(false)
  )

  displayData$ = combineLatest([
    this.metadataViewFacade.dataLinks$,
    this.metadataViewFacade.geoDataLinks$,
    this.kindSubject,
  ]).pipe(
    map(
      ([dataLinks, geoDataLinks, kind]) =>
        kind === 'dataset' &&
        (dataLinks?.length > 0 || geoDataLinks?.length > 0)
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
