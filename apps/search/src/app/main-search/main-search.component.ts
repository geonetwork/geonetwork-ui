import { Component, OnInit } from '@angular/core'
import { BootstrapService } from '@lib/common'
import { SearchFacade } from '@lib/search'
import { map, take, tap } from 'rxjs/operators'

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss'],
})
export class MainSearchComponent implements OnInit {
  constructor(
    private bootstrap: BootstrapService,
    private searchFacade: SearchFacade
  ) {}

  ngOnInit(): void {
    this.bootstrap
      .uiConfReady('srv')
      .pipe(
        take(1),
        map((config) => config.mods.search.facetConfig),
        tap((aggregationsConfig) => {
          this.searchFacade.setConfigAggregations(aggregationsConfig)
          this.searchFacade.requestMoreResults()
        })
      )
      .subscribe()
  }
}
