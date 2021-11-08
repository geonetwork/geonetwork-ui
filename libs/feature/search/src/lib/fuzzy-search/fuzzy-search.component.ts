import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Optional,
  ViewChild,
} from '@angular/core'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { AutocompleteComponent } from '@geonetwork-ui/ui/inputs'
import {
  ElasticsearchMapper,
  ElasticsearchService,
  EsSearchResponse,
} from '@geonetwork-ui/util/shared'
import { map, switchMap } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'
import { RouterFacade } from '../router'

@Component({
  selector: 'gn-ui-fuzzy-search',
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuzzySearchComponent implements AfterViewInit {
  @ViewChild(AutocompleteComponent) autocomplete: AutocompleteComponent

  constructor(
    private searchFacade: SearchFacade,
    private searchService: SearchApiService,
    private esMapper: ElasticsearchMapper,
    private esService: ElasticsearchService,
    @Optional() private routerFacade: RouterFacade
  ) {}

  ngAfterViewInit(): void {
    this.autocomplete.action = (query) =>
      this.esService
        .buildAutocompletePayload(query)
        .pipe(
          switchMap((payload) =>
            this.searchService
              .search('bucket', JSON.stringify(payload))
              .pipe(
                map((response: EsSearchResponse) =>
                  this.esMapper
                    .toRecords(response)
                    .map((record) => record.title)
                )
              )
          )
        )
  }

  handleSearchTextChange(newValue: string) {
    this.searchFacade.setFilters({ any: newValue })
    if (this.routerFacade) {
      this.routerFacade.go({
        path: 'search',
      })
    }
  }
}
