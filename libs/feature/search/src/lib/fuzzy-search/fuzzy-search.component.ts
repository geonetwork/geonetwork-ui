import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import {
  AutocompleteComponent,
  AutocompleteItem,
} from '@geonetwork-ui/ui/inputs'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/records-repository.interface'

@Component({
  selector: 'gn-ui-fuzzy-search',
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuzzySearchComponent implements OnInit {
  @ViewChild(AutocompleteComponent) autocomplete: AutocompleteComponent
  @Output() itemSelected = new EventEmitter<CatalogRecord>()
  @Output() inputSubmitted = new EventEmitter<string>()
  searchInputValue$: Observable<{ title: string }>

  displayWithFn: (record: CatalogRecord) => string = (record) => record?.title

  autoCompleteAction = (query: string) =>
    this.recordsRepository
      .fuzzySearch(query)
      .pipe(map((result) => result.records))

  constructor(
    private searchFacade: SearchFacade,
    private searchService: SearchService,
    private recordsRepository: RecordsRepositoryInterface
  ) {}

  ngOnInit(): void {
    this.searchInputValue$ = this.searchFacade.searchFilters$.pipe(
      map((searchFilter) => ({
        title: searchFilter.any as string,
      }))
    )
  }

  /**
   * Emit the event if the parent component has subscribed to it, so it
   * can define the correct behavior. If no component is listening to that
   * event, then apply the default behavior
   * @param item
   */
  handleItemSelection(item: AutocompleteItem) {
    const record = item as CatalogRecord
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
