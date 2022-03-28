import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { SearchService } from '@geonetwork-ui/feature/search'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { map } from 'rxjs/operators'

marker('datahub.header.myfavorites')
marker('datahub.header.connex')
marker('datahub.header.lastRecords')
marker('datahub.header.popularRecords')

@Component({
  selector: 'datahub-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchHeaderComponent {
  @Input() expandRatio: number

  searchInputRouteValue$ = this.routerFacade.anySearch$.pipe(
    map((any) => ({ title: any }))
  )
  backgroundCss =
    getThemeConfig().HEADER_BACKGROUND ||
    "center url('assets/img/default_header_bg.webp')"

  constructor(
    private routerFacade: RouterFacade,
    private searchService: SearchService
  ) {}

  onFuzzySearchSelection(record: MetadataRecord) {
    this.routerFacade.goToMetadata(record)
  }

  onDatasetsClick(): void {
    this.searchService.setSearch({})
  }
}
