import { ScrollingModule } from '@angular/cdk/scrolling'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { MatSort, MatSortModule, Sort } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core'
import { DataTableDataSource } from './data-table.data.source'
import { BaseReader, FetchError } from '@geonetwork-ui/data-fetcher'
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator'
import { CustomMatPaginatorIntl } from './custom.mat.paginator.intl'
import { CommonModule } from '@angular/common'
import { BehaviorSubject } from 'rxjs'
import {
  LoadingMaskComponent,
  PopupAlertComponent,
} from '@geonetwork-ui/ui/widgets'

const rowIdPrefix = 'table-item-'

export type TableItemId = string | number
type TableItemType = string | number | Date

export interface TableItemModel {
  id: TableItemId
  [key: string]: TableItemType
}

interface TableColumn {
  name: string
  label: string
}

@Component({
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ScrollingModule,
    CommonModule,
    LoadingMaskComponent,
    PopupAlertComponent,
    TranslatePipe,
    TranslateDirective,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }],
  selector: 'gn-ui-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit, AfterViewInit, OnChanges {
  private eltRef = inject(ElementRef)
  private cdr = inject(ChangeDetectorRef)
  private translateService = inject(TranslateService)

  columnsFromFeatureCatalog: TableColumn[] = null
  @Input() set featureAttributes(value: { value: string; label: string }[]) {
    this.columnsFromFeatureCatalog = value.map((attrs) => ({
      name: attrs.value,
      label: attrs.label,
    }))
  }
  columnsFromDataset: TableColumn[] = []
  @Input() set dataset(value: BaseReader) {
    this.dataset_ = value
    this.dataset_.load()
    this.dataset_.info.then((info) => {
      this.count = info.itemsCount
      this.cdr.detectChanges()
    })
  }
  @Input() activeId: TableItemId
  @Output() selected = new EventEmitter<any>()

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  dataset_: BaseReader
  dataSource: DataTableDataSource
  headerHeight: number
  count: number
  loading$ = new BehaviorSubject<boolean>(false)
  error = null

  get columns() {
    return this.columnsFromFeatureCatalog ?? this.columnsFromDataset
  }
  get columnNames() {
    return this.columns.map((c) => c.name)
  }

  ngOnInit() {
    this.dataSource = new DataTableDataSource()
  }

  ngAfterViewInit() {
    this.headerHeight =
      this.eltRef.nativeElement.querySelector('thead').offsetHeight
    this.setPagination()
    this.cdr.detectChanges()
  }

  ngOnChanges() {
    this.setPagination()
  }

  setSort(sort: Sort) {
    if (!this.dataset_) return
    if (!sort.active) {
      this.dataset_.orderBy()
    } else {
      this.dataset_.orderBy([sort.direction || 'asc', sort.active])
    }
    this.readData()
  }

  setPagination() {
    if (!this.paginator) return
    if (!this.dataset_) return
    this.dataset_.limit(
      this.paginator.pageIndex * this.paginator.pageSize,
      this.paginator.pageSize
    )
    this.readData()
  }

  async readData() {
    this.loading$.next(true)
    try {
      // wait for properties to be read
      if (!this.columnsFromFeatureCatalog) {
        this.columnsFromDataset = await this.dataset_.properties
      }
      this.dataset_.select(...this.columnNames)
      await this.dataSource.showData(this.dataset_.read())
      this.error = null
    } catch (error) {
      this.handleError(error as FetchError | Error)
    }
    this.loading$.next(false)
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

  handleError(error: FetchError | Error) {
    this.dataSource.clearData()
    if (error instanceof FetchError) {
      this.error = this.translateService.instant(
        `dataset.error.${error.type}`,
        {
          info: error.info,
        }
      )
      console.warn(error.message)
    } else {
      this.error = this.translateService.instant(error.message)
      console.warn(error.stack || error)
    }
  }
}
