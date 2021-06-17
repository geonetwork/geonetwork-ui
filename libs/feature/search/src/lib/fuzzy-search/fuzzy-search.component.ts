import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core'
import { AutocompleteComponent } from '@geonetwork-ui/ui/inputs'
import { SearchFacade } from '../state/search.facade'
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { map, switchMap } from 'rxjs/operators'
import { SearchResponse } from 'elasticsearch'
import { ElasticsearchMapper } from '../elasticsearch/elasticsearch.mapper'

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
                map((response: SearchResponse<any>) =>
                  this.esMapper
                    .toRecordSummaries(
                      response,
                      this.searchService.configuration.basePath
                    )
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
