import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'
import {
  FileFormat,
  getBadgeColor,
  getFileFormat,
  getFormatPriority,
} from '@geonetwork-ui/util/shared'
import { SortByField } from '@geonetwork-ui/common/domain/search'

@Component({
  selector: 'gn-ui-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css'],
})
export class RecordTableComponent {
  @Input() selectedRecords: string[] = []
  @Input() records: any[] = []
  @Input() totalHits?: number
  @Input() sortBy?: SortByField
  @Output() recordClick = new EventEmitter<CatalogRecord>()
  @Output() recordsSelect = new EventEmitter<CatalogRecord[]>()
  @Output() recordsDeselect = new EventEmitter<CatalogRecord[]>()
  @Output() sortByChange = new EventEmitter<SortByField>()

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
      this.recordsDeselect.emit([record])
      this.selectedRecords = this.selectedRecords.filter(
        (val) => val !== record.uniqueIdentifier
      )
    } else {
      this.recordsSelect.emit([record])
      this.selectedRecords.push(record.uniqueIdentifier)
    }
  }

  selectAll() {
    if (this.isAllSelected()) {
      this.recordsDeselect.emit(this.records)
      this.selectedRecords = []
    } else {
      this.recordsSelect.emit(this.records)
      this.selectedRecords = this.records.map((record) => {
        return record.uniqueIdentifier
      })
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
}
