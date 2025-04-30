import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { SearchFacade } from '../state/search.facade'
import { SelectionService } from '@geonetwork-ui/api/repository'
import { SearchService } from '../utils/service/search.service'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { ResultsTableComponent } from '@geonetwork-ui/ui/search'
import { CommonModule } from '@angular/common'
import { Observable, Subscription } from 'rxjs'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-results-table-container',
  templateUrl: './results-table-container.component.html',
  styleUrls: ['./results-table-container.component.css'],
  standalone: true,
  imports: [CommonModule, ResultsTableComponent],
})
export class ResultsTableContainerComponent implements OnDestroy {
  @Input() isDuplicating: false

  @Output() recordClick = new EventEmitter<CatalogRecord>()
  @Output() duplicateRecord = new EventEmitter<CatalogRecord>()

  subscription = new Subscription()

  selectedRecords$ = this.selectionService.selectedRecordsIdentifiers$
  sortBy$ = this.searchFacade.sortBy$

  hasDraft = (record: CatalogRecord): boolean =>
    this.recordsRepository.recordHasDraft(record.uniqueIdentifier)

  canDuplicate = (record: CatalogRecord): boolean => {
    return this.recordsRepository.canDuplicate(record)
  }

  canDelete = (record: CatalogRecord): Observable<boolean> => {
    return this.recordsRepository.canDelete(record)
  }

  canEdit = (record: CatalogRecord): Observable<boolean> => {
    return this.recordsRepository.canEditIndexedRecord(record)
  }

  constructor(
    protected searchFacade: SearchFacade,
    private searchService: SearchService,
    private selectionService: SelectionService,
    private recordsRepository: RecordsRepositoryInterface,
    private notificationsService: NotificationsService,
    private translateService: TranslateService
  ) {}

  handleRecordClick(item: unknown) {
    this.recordClick.emit(item as CatalogRecord)
  }

  handleDuplicateRecord(item: unknown) {
    this.duplicateRecord.emit(item as CatalogRecord)
  }

  async handleDeleteRecord(item: unknown) {
    const uniqueIdentifier = (item as CatalogRecord).uniqueIdentifier
    this.subscription.add(
      this.recordsRepository.deleteRecord(uniqueIdentifier).subscribe({
        next: () => {
          this.recordsRepository.clearRecordDraft(uniqueIdentifier)
          this.searchFacade.requestNewResults()
          this.notificationsService.showNotification(
            {
              type: 'success',
              title: this.translateService.instant(
                'editor.record.deleteSuccess.title'
              ),
              text: `${this.translateService.instant(
                'editor.record.deleteSuccess.body'
              )}`,
            },
            2500
          )
        },
        error: (error) => {
          this.notificationsService.showNotification(
            {
              type: 'error',
              title: this.translateService.instant(
                'editor.record.deleteError.title'
              ),
              text: `${this.translateService.instant(
                'editor.record.deleteError.body'
              )} ${error}`,
              closeMessage: this.translateService.instant(
                'editor.record.deleteError.closeMessage'
              ),
            },
            undefined,
            error
          )
        },
      })
    )
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

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
