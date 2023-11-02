import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'
import {
  FileFormat,
  getBadgeColor,
  getFileFormat,
  getFormatPriority,
} from '@geonetwork-ui/util/shared'
import { SortByField } from '@geonetwork-ui/common/domain/search'
import { SelectionService } from '@geonetwork-ui/api/repository/gn4'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'gn-ui-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css'],
})
export class RecordTableComponent implements OnDestroy {
  private onDestroy$: Subject<void> = new Subject()

  @Input() selectedRecords: string[] = []
  @Input() records: any[] = []
  @Input() totalHits?: number
  @Input() sortBy?: SortByField
  @Output() recordSelect = new EventEmitter<CatalogRecord>()
  @Output() sortByChange = new EventEmitter<SortByField>()

  constructor(private selectionService: SelectionService) {}

  dateToString(date: Date): string {
    return date?.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    })
  }

  getStatus(isPublishedToAll: boolean | unknown) {
    return isPublishedToAll ? 'published' : 'not published'
  }

  formatUserInfo(userInfo: string | unknown): string {
    const infos = (typeof userInfo === 'string' ? userInfo : '').split('|')
    if (infos && infos.length === 4) {
      return `${infos[2]} ${infos[1]}`
    }
    return undefined
  }

  getRecordFormats(record: CatalogRecord): FileFormat[] {
    if (record.kind === 'service' || !('distributions' in record)) {
      return []
    }
    const formats = Array.from(
      new Set(
        record.distributions.map((distribution) => getFileFormat(distribution))
      )
    ).filter((format) => !!format)
    formats.sort((a, b) => getFormatPriority(b) - getFormatPriority(a))
    return formats
  }

  getBadgeColor(format: FileFormat): string {
    return getBadgeColor(format)
  }

  private getOrderForColumn(col: string): 'asc' | 'desc' | null {
    if (!this.sortBy) {
      return null
    }
    let order: 'asc' | 'desc' | null = null
    const sortedArray = Array.isArray(this.sortBy[0])
      ? this.sortBy
      : [this.sortBy]
    sortedArray.forEach((sortedCol) => {
      if (sortedCol[1] === col) {
        order = sortedCol[0]
      }
    })
    return order
  }

  setSortBy(col: string): void {
    const sortOrder = this.getOrderForColumn(col)
    let newOrder
    if (sortOrder) {
      newOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    } else {
      newOrder = 'asc'
    }
    this.sortByChange.emit([newOrder, col])
    this.sortBy = [newOrder, col]
  }

  isSortedBy(col: string, order: 'asc' | 'desc'): boolean {
    const sortOrder = this.getOrderForColumn(col)
    return sortOrder === order
  }

  isChecked(record: CatalogRecord) {
    if (this.selectedRecords.includes(record.uniqueIdentifier)) {
      return true
    }
    return false
  }

  handleRecordSelectedChange(selected: boolean, record: CatalogRecord) {
    if (!selected) {
      this.selectedRecords = this.selectedRecords.filter(
        (val) => val !== record.uniqueIdentifier
      )
      this.selectionService
        .deselectRecords([record])
        .pipe(takeUntil(this.onDestroy$))
        .subscribe()
    } else {
      this.selectedRecords.push(record.uniqueIdentifier)
      this.selectionService
        .selectRecords([record])
        .pipe(takeUntil(this.onDestroy$))
        .subscribe()
    }
  }

  selectAll() {
    if (this.isAllSelected()) {
      this.selectedRecords = []
      this.selectionService
        .clearSelection()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe()
    } else {
      this.selectedRecords = this.records.map(
        (record) => record.uniqueIdentifier
      )
      this.selectionService
        .selectRecords(this.records)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe()
    }
  }

  isAllSelected(): boolean {
    if (this.selectedRecords.length === this.records.length) {
      const allRecords = this.records.filter((record) =>
        this.selectedRecords.includes(record.uniqueIdentifier)
      )
      if (allRecords.length === this.records.length) {
        return true
      }
    }
    return false
  }

  isSomeSelected(): boolean {
    if (
      this.selectedRecords.length > 0 &&
      this.selectedRecords.length < this.records.length
    ) {
      return true
    }
    return false
  }

  ngOnDestroy(): void {
    this.onDestroy$.next()
    this.onDestroy$.complete()
  }
}
