import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import {
  AutocompleteItem,
  AutocompleteComponent,
} from '@geonetwork-ui/ui/inputs'
import {
  ElasticsearchService,
  EsSearchResponse,
  MetadataRecord,
} from '@geonetwork-ui/util/shared'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'
import { ElasticsearchMapper } from '../utils/mapper'
import { SearchService } from '../utils/service/search.service'

@Component({
  selector: 'gn-ui-fuzzy-search',
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuzzySearchComponent implements OnInit {
  @ViewChild(AutocompleteComponent) autocomplete: AutocompleteComponent
  @Output() itemSelected = new EventEmitter<MetadataRecord>()
  @Output() inputSubmitted = new EventEmitter<string>()
  searchInputValue$: Observable<{ title: string }>

  displayWithFn: (MetadataRecord) => string = (record) => record?.title

  autoCompleteAction = (query) =>
    this.searchApiService
      .search(
        'bucket',
        JSON.stringify(this.esService.buildAutocompletePayload(query))
      )
      .pipe(
        map((response: EsSearchResponse) => this.esMapper.toRecords(response))
      )

  constructor(
    private searchFacade: SearchFacade,
    private searchApiService: SearchApiService,
    private searchService: SearchService,
    private esMapper: ElasticsearchMapper,
    private esService: ElasticsearchService
  ) {}

  ngOnInit(): void {
    this.searchInputValue$ = this.searchFacade.searchFilters$.pipe(
      map((searchFilter) => ({ title: searchFilter.any }))
    )
  }

  /**
   * Emit the event if the parent component has subscribed to it, so it
   * can define the correct behavior. If no component is listening to that
   * event, then apply the default behavior
   * @param item
   */
  handleItemSelection(item: AutocompleteItem) {
    const record = item as MetadataRecord
    if (this.itemSelected.observers.length > 0) {
      this.itemSelected.emit(record)
    } else {
      this.searchFacade.setFilters({ any: record.title })
    }
  }

  handleInputSubmission(any: string) {
    if (this.inputSubmitted.observers.length > 0) {
      this.inputSubmitted.emit(any)
    } else {
      this.searchService.updateFilters({ any })
    }
  }
}
