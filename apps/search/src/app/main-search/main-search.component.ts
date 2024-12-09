import { Component, OnInit } from '@angular/core'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { UiApiService } from '@geonetwork-ui/data-access/gn4'
import { firstValueFrom, map } from 'rxjs'

@Component({
  selector: 'gn-ui-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss'],
})
export class MainSearchComponent implements OnInit {
  constructor(
    private uiService: UiApiService,
    private searchFacade: SearchFacade
  ) {}

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
