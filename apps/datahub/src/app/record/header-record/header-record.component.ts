import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { first } from 'rxjs/operators'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'

@Component({
  selector: 'datahub-header-record',
  templateUrl: './header-record.component.html',
  styleUrls: ['./header-record.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderRecordComponent {
  @Input() metadata: MetadataRecord
  @Input() expandRatio: number
  backgroundCss = getThemeConfig().HEADER_BACKGROUND

  constructor(
    private searchRouter: RouterFacade,
    private searchFacade: SearchFacade
  ) {}

  back() {
    this.searchFacade.searchFilters$
      .pipe(first())
      .subscribe((filters) => this.searchRouter.goToSearch(filters?.any))
  }

  scrollTo(id: string) {
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}
