import { Component, OnInit } from '@angular/core'
import { BootstrapService, ColorService } from '@lib/common'
import {
  RequestMoreResults,
  SearchState,
  SetConfigAggregations,
} from '@lib/search'
import { Store } from '@ngrx/store'
import { map, pluck, take, tap } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'search'

  constructor(
    private bootstrap: BootstrapService,
    private store: Store<SearchState>
  ) {
    ColorService.applyCssVariables('#e73f51', '#c2e9dc', '#212029', '#fdfbff')
  }

  ngOnInit(): void {
    this.bootstrap
      .uiConfReady('srv')
      .pipe(
        take(1),
        map((config) => config.mods.search.facetConfig),
        // TODO: make the config work not just for tag
        pluck('tag.default'),
        tap((tagConfig) => {
          this.store.dispatch(
            new SetConfigAggregations({ 'tag.default': tagConfig })
          )
          this.store.dispatch(new RequestMoreResults())
        })
      )
      .subscribe()
  }
}
