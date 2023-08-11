import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core'
import {
  OrganisationsServiceInterface,
  SourcesService,
} from '@geonetwork-ui/feature/catalog'
import { SearchService } from '@geonetwork-ui/feature/search'
import { ErrorType } from '@geonetwork-ui/ui/elements'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { filter, map, mergeMap, pluck } from 'rxjs/operators'
import { MdViewFacade } from '../state/mdview.facade'
import { MetadataContact } from '@geonetwork-ui/util/shared'
import * as basicLightbox from 'basiclightbox'

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

  errorTypes = ErrorType
  selectedTabIndex$ = new BehaviorSubject(0)

  @ViewChild('lightbox') lightbox: ElementRef

  constructor(
    public facade: MdViewFacade,
    private searchService: SearchService,
    private sourceService: SourcesService,
    private orgsService: OrganisationsServiceInterface
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
  onContactClick(contact: MetadataContact) {
    this.orgsService
      .getFiltersForOrgs([{ name: contact.organisation }])
      .subscribe((filters) => this.searchService.updateFilters(filters))
  }

  openLightbox() {
    const instance = basicLightbox.create(
      `<img src="${this.lightbox.nativeElement.src}"/>`
    )
    instance.show()
  }
}
