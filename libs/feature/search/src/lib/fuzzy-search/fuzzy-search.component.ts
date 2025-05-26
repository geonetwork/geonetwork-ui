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
import { firstValueFrom, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { SearchFilters } from '@geonetwork-ui/api/metadata-converter'
import { TranslatePipe } from '@ngx-translate/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-fuzzy-search',
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, AutocompleteComponent, TranslatePipe],
})
export class FuzzySearchComponent implements OnInit {
  @ViewChild(AutocompleteComponent) autocomplete: AutocompleteComponent
  @Input() autoFocus = false
  @Input() forceTrackPosition = false
  @Input() enterButton = false
  @Input() placeholder?: string
  @Output() itemSelected = new EventEmitter<CatalogRecord>()
  @Output() inputSubmitted = new EventEmitter<string>()
  @Output() isSearchActive = new EventEmitter<boolean>()
  searchInputValue$: Observable<{ title: string }>

  displayWithFn: (record: CatalogRecord) => string = (record) => record.title

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
