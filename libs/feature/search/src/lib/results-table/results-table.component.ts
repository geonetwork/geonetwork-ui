import { Component, EventEmitter, Output } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import {
  FileFormat,
  getBadgeColor,
  getFileFormat,
  getFormatPriority,
} from '@geonetwork-ui/util/shared'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import {
  InteractiveTableColumnComponent,
  InteractiveTableComponent,
} from '@geonetwork-ui/ui/layout'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'
import { SearchFacade } from '../state/search.facade'
import { SelectionService } from '@geonetwork-ui/api/repository'
import { combineLatest, firstValueFrom, Observable } from 'rxjs'
import { CommonModule } from '@angular/common'
import { map, take } from 'rxjs/operators'
import { FieldSort } from '@geonetwork-ui/common/domain/model/search'
import { SearchService } from '../utils/service/search.service'

@Component({
  selector: 'gn-ui-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    UiInputsModule,
    InteractiveTableComponent,
    InteractiveTableColumnComponent,
    MatIconModule,
    TranslateModule,
  ],
})
export class ResultsTableComponent {
  @Output() recordClick = new EventEmitter<CatalogRecord>()

  records$ = this.searchFacade.results$
  selectedRecords$ = this.selectionService.selectedRecordsIdentifiers$

  constructor(
    private searchFacade: SearchFacade,
    private searchService: SearchService,
    private selectionService: SelectionService
  ) {}

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

  formatUserInfo(userInfo: string | unknown): string {
    const infos = (typeof userInfo === 'string' ? userInfo : '').split('|')
    if (infos && infos.length === 4) {
      return `${infos[2]} ${infos[1]}`
    }
    return undefined
  }

  getBadgeColor(format: FileFormat): string {
    return getBadgeColor(format)
  }

  handleRecordClick(item: unknown) {
    this.recordClick.emit(item as CatalogRecord)
  }

  setSortBy(col: string, order: 'asc' | 'desc') {
    this.searchService.setSortBy([order, col])
  }

  isSortedBy(col: string): Observable<'asc' | 'desc' | null> {
    return this.searchFacade.sortBy$.pipe(
      take(1),
      map((sortOrder) => {
        const sortArray = Array.isArray(sortOrder[0])
          ? (sortOrder as FieldSort[])
          : ([sortOrder] as FieldSort[])
        for (const sort of sortArray) {
          if (sort[1] === col) {
            return sort[0]
          }
        }
        return null
      })
    )
  }

  isChecked(record: CatalogRecord): Observable<boolean> {
    return this.selectedRecords$.pipe(
      take(1),
      map((selectedRecords) => {
        return selectedRecords.includes(record.uniqueIdentifier)
      })
    )
  }

  handleRecordSelectedChange(selected: boolean, record: CatalogRecord) {
    if (!selected) {
      this.selectionService.deselectRecords([record])
    } else {
      this.selectionService.selectRecords([record])
    }
  }

  async toggleSelectAll() {
    const records = await firstValueFrom(this.records$)
    if (await firstValueFrom(this.isAllSelected())) {
      this.selectionService.deselectRecords(records)
    } else {
      this.selectionService.selectRecords(records)
    }
  }

  isAllSelected(): Observable<boolean> {
    return combineLatest([this.records$, this.selectedRecords$]).pipe(
      take(1),
      map(([records, selectedRecords]) => {
        return records.every((record) =>
          selectedRecords.includes(record.uniqueIdentifier)
        )
      })
    )
  }

  isSomeSelected(): Observable<boolean> {
    return combineLatest([this.records$, this.selectedRecords$]).pipe(
      take(1),
      map(([records, selectedRecords]) => {
        const allSelected = records.every((record) =>
          selectedRecords.includes(record.uniqueIdentifier)
        )
        const someSelected = records.some((record) =>
          selectedRecords.includes(record.uniqueIdentifier)
        )
        return !allSelected && someSelected
      })
    )
  }
}
