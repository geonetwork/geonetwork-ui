import { ScrollingModule } from '@angular/cdk/scrolling'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { DataTableDataSource } from './data-table.data.source'
import { BaseReader, FetchError } from '@geonetwork-ui/data-fetcher'
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator'
import { CustomMatPaginatorIntl } from './custom.mat.paginator.intl'
import { CommonModule } from '@angular/common'
import { BehaviorSubject, filter, firstValueFrom } from 'rxjs'
import {
  LoadingMaskComponent,
  PopupAlertComponent,
} from '@geonetwork-ui/ui/widgets'
import { LetDirective } from '@ngrx/component'

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
    CommonModule,
    LoadingMaskComponent,
    PopupAlertComponent,
    LetDirective,
    TranslatePipe,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }],
  selector: 'gn-ui-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit, AfterViewInit, OnChanges {
  _featureAttributes = []
  @Input() set featureAttributes(value: { value: string; label: string }[]) {
    this._featureAttributes = value
    this.properties$.next(value.map((attr) => attr.value))
  }
  @Input() set dataset(value: BaseReader) {
    this.dataset_ = value
    this.dataset_.load()
    this.dataset_.info.then((info) => (this.count = info.itemsCount))
  }
  @Input() activeId: TableItemId
  @Output() selected = new EventEmitter<any>()

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  dataset_: BaseReader
  properties$ = new BehaviorSubject<string[]>(null)
  dataSource: DataTableDataSource
  headerHeight: number
  count: number
  loading$ = new BehaviorSubject<boolean>(false)
  error = null

  constructor(
    private eltRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private translateService: TranslateService
  ) {}

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

  setSort(sort: MatSort) {
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
    // wait for properties to be read
    const properties = await firstValueFrom(
      this.properties$.pipe(filter((p) => !!p))
    )
    const propsWithoutGeom = properties.filter(
      (p) => !p.toLowerCase().startsWith('geom')
    )
    this.dataset_.select(...propsWithoutGeom)
    try {
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
