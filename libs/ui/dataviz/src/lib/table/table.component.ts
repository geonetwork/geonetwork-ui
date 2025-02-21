import { ScrollingModule } from '@angular/cdk/scrolling'
import { NgForOf } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { TranslateModule } from '@ngx-translate/core'
import { TableDataSource } from './table.data.source'
import { BaseReader } from '@geonetwork-ui/data-fetcher'
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator'
import { CustomMatPaginatorIntl } from './custom.mat.paginator.intl'

const rowIdPrefix = 'table-item-'

export type TableItemId = string | number
type TableItemType = string | number | Date

export interface TableItemModel {
  id: TableItemId
  [key: string]: TableItemType
}

@Component({
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ScrollingModule,
    NgForOf,
    TranslateModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }],
  selector: 'gn-ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements AfterViewInit, OnChanges {
  @Input() set dataset(value: BaseReader) {
    this.dataset_ = value
    this.dataset_.load()
    this.dataset_.properties.then(
      (properties) => (this.properties = properties.map((p) => p.name))
    )
    this.dataset_.info.then((info) => (this.count = info.itemsCount))
  }
  @Input() activeId: TableItemId
  @Output() selected = new EventEmitter<any>()

  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  dataset_: BaseReader
  properties: string[]
  dataSource = new TableDataSource()
  headerHeight: number
  count: number
  pageSize = 10

  constructor(
    private cdr: ChangeDetectorRef,
    private eltRef: ElementRef
  ) {}

  ngAfterViewInit() {
    this.headerHeight =
      this.eltRef.nativeElement.querySelector('thead').offsetHeight
    this.setPagination()
  }

  ngOnChanges() {
    this.setPagination()
  }

  setSort(sort: MatSort) {
    if (!this.sort.active) {
      this.dataset_.orderBy()
    } else {
      this.dataset_.orderBy([sort.direction || 'asc', sort.active])
    }
    this.dataSource.showData(this.dataset_.read())
    this.cdr.detectChanges()
  }

  setPagination() {
    let pageIndex = 0
    let pageSize = this.pageSize
    if (this.paginator) {
      pageIndex = this.paginator.pageIndex
      pageSize = this.paginator.pageSize
    }
    this.dataset_.limit(pageIndex, pageSize)
    this.dataSource.showData(this.dataset_.read())
    this.cdr.detectChanges()
  }

  scrollToItem(itemId: TableItemId): void {
    const row = this.eltRef.nativeElement.querySelector(
      `#${this.getRowEltId(itemId)}`
    )
    this.eltRef.nativeElement.scrollTop = row.offsetTop - this.headerHeight
  }

  public getRowEltId(id: TableItemId): string {
    return rowIdPrefix + id
  }
}
