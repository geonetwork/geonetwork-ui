import { Injectable } from '@angular/core'
import { MatPaginatorIntl } from '@angular/material/paginator'
import { TranslateService } from '@ngx-translate/core'
import { Subject } from 'rxjs'

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override changes = new Subject<void>()

  constructor(private translate: TranslateService) {
    super()
    this.setLabels()
    this.translate.onLangChange.subscribe(() => {
      this.setLabels()
      this.changes.next()
    })
  }

  setLabels() {
    this.itemsPerPageLabel = this.translate.instant(
      'table.paginator.itemsPerPage'
    )
    this.nextPageLabel = this.translate.instant('table.paginator.nextPage')
    this.previousPageLabel = this.translate.instant(
      'table.paginator.previousPage'
    )
    this.firstPageLabel = this.translate.instant('table.paginator.firstPage')
    this.lastPageLabel = this.translate.instant('table.paginator.lastPage')
    this.getRangeLabel = this.getRangeLabelIntl
    this.changes.next()
  }

  getRangeLabelIntl(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return this.translate.instant('table.paginator.rangeLabel', {
        startIndex: 0,
        endIndex: 0,
        length,
      })
    }
    const startIndex = page * pageSize
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize
    return this.translate.instant('table.paginator.rangeLabel', {
      startIndex: startIndex + 1,
      endIndex,
      length,
    })
  }
}
