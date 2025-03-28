import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import {
  AutocompleteComponent,
  AutocompleteItem,
} from '@geonetwork-ui/ui/inputs'
import { firstValueFrom, Observable, switchMap } from 'rxjs'
import { map } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { SearchFilters } from '@geonetwork-ui/api/metadata-converter'

@Component({
  selector: 'gn-ui-fuzzy-search',
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuzzySearchComponent implements OnInit {
  @ViewChild(AutocompleteComponent) autocomplete: AutocompleteComponent
  @Input() autoFocus = false
  @Input() forceTrackPosition = false
  @Input() enterButton = false
  @Output() itemSelected = new EventEmitter<CatalogRecord>()
  @Output() inputSubmitted = new EventEmitter<string>()
  @Input() autoCompleteActionCustom: (query: string) => Observable<any[]>
  searchInputValue$: Observable<{ title: string }>
  @Output() isSearchActive = new EventEmitter<boolean>()

  displayWithFn: (record: CatalogRecord) => string = (record) => record.title

  autoCompleteAction = (query: string): Observable<CatalogRecord[]> => {
    return this.searchFacade.configFilters$.pipe(
      switchMap((configFilters) =>
        this.recordsRepository.fuzzySearch(query, configFilters)
      ),
      map((result) => result.records)
    )
  }

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

  async handleInputCleared() {
    const currentSearchFilters: SearchFilters = await firstValueFrom(
      this.searchFacade.searchFilters$
    )
    if (currentSearchFilters.any) {
      this.searchService.updateFilters({ any: '' })
    }
  }

  handleSearchActive(event: boolean) {
    this.isSearchActive.emit(event)
  }
}
