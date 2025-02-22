import { ScrollingModule } from '@angular/cdk/scrolling'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { TranslateModule } from '@ngx-translate/core'
import { DataTableDataSource } from './data-table.data.source'
import { BaseReader } from '@geonetwork-ui/data-fetcher'
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator'
import { CustomMatPaginatorIntl } from './custom.mat.paginator.intl'
import { CommonModule } from '@angular/common'
import { BehaviorSubject } from 'rxjs'
import { LoadingMaskComponent } from '@geonetwork-ui/ui/widgets'

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
    TranslateModule,
    CommonModule,
    LoadingMaskComponent,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }],
  selector: 'gn-ui-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() set dataset(value: BaseReader) {
    this.loading$.next(true)
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
  dataSource: DataTableDataSource
  headerHeight: number
  count: number
  loading$ = new BehaviorSubject<boolean>(false)

  constructor(private eltRef: ElementRef) {}

  ngOnInit() {
    this.dataSource = new DataTableDataSource()
  }

  ngAfterViewInit() {
    this.headerHeight =
      this.eltRef.nativeElement.querySelector('thead').offsetHeight
    this.setPagination()
  }

  ngOnChanges() {
    this.setPagination()
  }

  setSort(sort: MatSort) {
    if (!this.dataset_) return
    this.loading$.next(true)
    if (!this.sort.active) {
      this.dataset_.orderBy()
    } else {
      this.dataset_.orderBy([sort.direction || 'asc', sort.active])
    }
    this.dataSource
      .showData(this.dataset_.read())
      .then(() => this.loading$.next(false))
  }

  setPagination() {
    if (!this.paginator) return
    if (!this.dataset_) return
    this.loading$.next(true)
    this.dataset_.limit(
      this.paginator.pageIndex * this.paginator.pageSize,
      this.paginator.pageSize
    )
    this.dataSource
      .showData(this.dataset_.read())
      .then(() => this.loading$.next(false))
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
