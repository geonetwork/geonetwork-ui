import { Component, OnInit, inject } from '@angular/core'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { UiApiService } from '@geonetwork-ui/data-access/gn4'
import { firstValueFrom, map } from 'rxjs'

@Component({
  selector: 'gn-ui-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss'],
  standalone: false,
})
export class MainSearchComponent implements OnInit {
  private uiService = inject(UiApiService)
  private searchFacade = inject(SearchFacade)

  async ngOnInit() {
    const conf = await firstValueFrom(
      this.uiService
        .getUiConfiguration('srv')
        .pipe(map((response) => JSON.parse(response.configuration)))
    )
    this.searchFacade
      .setConfigAggregations(conf.mods.search.facetConfig)
      .requestMoreResults()
  }
}
