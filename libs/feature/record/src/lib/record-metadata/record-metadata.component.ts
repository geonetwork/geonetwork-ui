import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SourcesService } from '@geonetwork-ui/feature/catalog'
import { SearchService } from '@geonetwork-ui/feature/search'
import { combineLatest } from 'rxjs'
import { filter, map, mergeMap, pluck } from 'rxjs/operators'
import { MdViewFacade } from '../state/mdview.facade'

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
    pluck('catalogUuid'),
    filter((uuid) => !!uuid),
    mergeMap((uuid) => this.sourceService.getSourceLabel(uuid))
  )

  constructor(
    public facade: MdViewFacade,
    private searchService: SearchService,
    private sourceService: SourcesService
  ) {}

  onTabIndexChange(): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  onInfoKeywordClick(keyword: string) {
    this.searchService.updateSearch({ any: keyword })
  }
  onContactClick(contactOrgName: string) {
    this.searchService.updateSearch({
      OrgForResource: { [contactOrgName]: true },
    })
  }
}
