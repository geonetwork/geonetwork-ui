import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'
import { SourcesService } from '@geonetwork-ui/feature/catalog'
import { SearchService } from '@geonetwork-ui/feature/search'
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs'
import { filter, map, mergeMap, pluck } from 'rxjs/operators'
import { DataFacade } from '../state/data.facade'
import { MdViewFacade } from '../state/mdview.facade'

@Component({
  selector: 'gn-ui-record-metadata',
  templateUrl: './record-metadata.component.html',
  styleUrls: ['./record-metadata.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordMetadataComponent implements OnDestroy {
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
  activeTabIndex$ = new BehaviorSubject(0)
  subscription: Subscription

  constructor(
    public facade: MdViewFacade,
    public dataFacade: DataFacade,
    private searchService: SearchService,
    private sourceService: SourcesService
  ) {
    this.subscription = this.displayMap$
      .pipe(map((displayMap) => (displayMap ? 0 : 1)))
      .subscribe(this.activeTabIndex$)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onTabIndexChange(index: number): void {
    this.activeTabIndex$.next(index)
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  onInfoKeywordClick(keyword: string) {
    this.searchService.updateFilters({ any: keyword })
  }
  onContactClick(contactOrgName: string) {
    this.searchService.updateFilters({
      OrgForResource: { [contactOrgName]: true },
    })
  }

  selectLinkToDisplay(link: number) {
    this.dataFacade.selectedLinkIndex$.next(link)
  }
}
