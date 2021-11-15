import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { ElasticsearchMapper } from '@geonetwork-ui/feature/record'
import { AutocompleteComponent } from '@geonetwork-ui/ui/inputs'
import {
  ElasticsearchService,
  EsSearchResponse,
} from '@geonetwork-ui/util/shared'
import { map, switchMap } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'

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
    private esService: ElasticsearchService
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
  }
}
