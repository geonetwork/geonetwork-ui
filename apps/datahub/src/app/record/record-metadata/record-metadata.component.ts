import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { SourcesService } from '@geonetwork-ui/feature/catalog'
import { SearchService } from '@geonetwork-ui/feature/search'
import { ErrorType } from '@geonetwork-ui/ui/elements'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { filter, map, mergeMap, startWith } from 'rxjs/operators'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import {
  Keyword,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { MdViewFacade } from '@geonetwork-ui/feature/record'

@Component({
  selector: 'datahub-record-metadata',
  templateUrl: './record-metadata.component.html',
  styleUrls: ['./record-metadata.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    this.displayDownload$,
    this.displayApi$,
    this.displayOtherLinks,
  ]).pipe(
    map(
      ([displayDownload, displayApi, displayOtherLinks]) =>
        !displayDownload && !displayApi && !displayOtherLinks
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

  selectedTabIndex$ = new BehaviorSubject(0)

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

  onTabIndexChange(index: number): void {
    this.selectedTabIndex$.next(index)
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
