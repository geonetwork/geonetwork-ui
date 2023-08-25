import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SourcesService } from '@geonetwork-ui/feature/catalog'
import { SearchService } from '@geonetwork-ui/feature/search'
import { ErrorType } from '@geonetwork-ui/ui/elements'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { filter, map, mergeMap, pluck } from 'rxjs/operators'
import { MdViewFacade } from '../state/mdview.facade'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { Individual, Organization } from '@geonetwork-ui/common/domain/record'

@Component({
  selector: 'gn-ui-record-metadata',
  templateUrl: './record-metadata.component.html',
  styleUrls: ['./record-metadata.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordMetadataComponent {
  displayMap$ = combineLatest([
    this.facade.mapApiLinks$,
    this.facade.geoDataLinks$,
  ]).pipe(
    map(
      ([mapLinks, geoDataLinks]) =>
        mapLinks?.length > 0 || geoDataLinks?.length > 0
    )
  )
  displayData$ = combineLatest([
    this.facade.dataLinks$,
    this.facade.geoDataLinks$,
  ]).pipe(
    map(
      ([dataLinks, geoDataLinks]) =>
        dataLinks?.length > 0 || geoDataLinks?.length > 0
    )
  )
  displayDownload$ = this.facade.downloadLinks$.pipe(
    map((links) => links?.length > 0)
  )
  displayApi$ = this.facade.apiLinks$.pipe(map((links) => links?.length > 0))
  displayOtherLinks = this.facade.otherLinks$.pipe(
    map((links) => links?.length > 0)
  )
  displayRelated$ = this.facade.related$.pipe(
    map((records) => records?.length > 0)
  )

  sourceLabel$ = this.facade.metadata$.pipe(
    map((record) => record?.extras?.catalogUuid as string),
    filter((uuid) => !!uuid),
    mergeMap((uuid) => this.sourceService.getSourceLabel(uuid))
  )

  errorTypes = ErrorType
  selectedTabIndex$ = new BehaviorSubject(0)

  constructor(
    public facade: MdViewFacade,
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

  onInfoKeywordClick(keyword: string) {
    this.searchService.updateFilters({ any: keyword })
  }
  onOrganizationClick(org: Organization) {
    this.orgsService
      .getFiltersForOrgs([org])
      .subscribe((filters) => this.searchService.updateFilters(filters))
  }
}
