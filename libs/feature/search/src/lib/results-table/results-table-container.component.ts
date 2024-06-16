import { Component, EventEmitter, Output } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { SearchFacade } from '../state/search.facade'
import { SelectionService } from '@geonetwork-ui/api/repository'
import { SearchService } from '../utils/service/search.service'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { ResultsTableComponent } from '@geonetwork-ui/ui/search'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-results-table-container',
  templateUrl: './results-table-container.component.html',
  styleUrls: ['./results-table-container.component.css'],
  standalone: true,
  imports: [CommonModule, ResultsTableComponent],
})
export class ResultsTableContainerComponent {
  @Output() recordClick = new EventEmitter<CatalogRecord>()

  records$ = this.searchFacade.results$
  selectedRecords$ = this.selectionService.selectedRecordsIdentifiers$
  sortBy$ = this.searchFacade.sortBy$

  hasDraft = (record: CatalogRecord): boolean =>
    this.recordsRepository.recordHasDraft(record.uniqueIdentifier)

  constructor(
    private searchFacade: SearchFacade,
    private searchService: SearchService,
    private selectionService: SelectionService,
    private recordsRepository: RecordsRepositoryInterface
  ) {}

  handleRecordClick(item: unknown) {
    this.recordClick.emit(item as CatalogRecord)
  }

  handleSortByChange(col: string, order: 'asc' | 'desc') {
    this.searchService.setSortBy([order, col])
  }

  handleRecordsSelectedChange(records: CatalogRecord[], selected: boolean) {
    if (!selected) {
      this.selectionService.deselectRecords(records)
    } else {
      this.selectionService.selectRecords(records)
    }
  }
}
