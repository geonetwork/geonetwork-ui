import { ScrollingModule } from '@angular/cdk/scrolling'
import { NgForOf } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import {
  TableVirtualScrollDataSource,
  TableVirtualScrollModule,
} from 'ng-table-virtual-scroll'
import { TranslateModule } from '@ngx-translate/core'
import { TableItemId, TableItemModel } from '../table/table.component'

const rowIdPrefix = 'table-item-'

/**
 * Note: This component can be used with a dataset instead of a reader.
 * It does not provide pagination and is currenlty on used in the geo-table-view component
 */

@Component({
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    TableVirtualScrollModule,
    ScrollingModule,
    NgForOf,
    TranslateModule,
  ],
  selector: 'gn-ui-table-scroll',
  templateUrl: './table-scroll.component.html',
  styleUrls: ['./table-scroll.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableScrollComponent implements AfterViewInit {
  @Input() set data(value: TableItemModel[]) {
    this.dataSource = new TableVirtualScrollDataSource(value)
    this.dataSource.sort = this.sort
    this.properties =
      Array.isArray(value) && value.length ? Object.keys(value[0]) : []
    this.count = value.length
  }
  @Input() activeId: TableItemId
  @Output() selected = new EventEmitter<any>()

  @ViewChild(MatSort, { static: true }) sort: MatSort
  properties: string[]
  dataSource: TableVirtualScrollDataSource<any>
  headerHeight: number
  count: number

  constructor(private eltRef: ElementRef) {}

  ngAfterViewInit() {
    this.headerHeight =
      this.eltRef.nativeElement.querySelector('thead').offsetHeight
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
