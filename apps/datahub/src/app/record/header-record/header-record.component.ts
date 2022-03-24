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
  backgroundCss =
    getThemeConfig().HEADER_BACKGROUND ||
    "center url('assets/img/default_header_bg.webp')"

  constructor(
    private searchRouter: RouterFacade,
    private searchFacade: SearchFacade
  ) {}

  back() {
    this.searchFacade.searchFilters$
      .pipe(first())
      .subscribe((filters) => this.searchRouter.goToSearch(filters?.any))
  }
}
