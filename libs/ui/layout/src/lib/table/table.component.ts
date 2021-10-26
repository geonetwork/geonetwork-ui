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
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

const rowIdPrefix = 'table-item-'

export type TableItemId = string | number
type TableItemType = string | number | Date

export interface TableItemModel {
  id: TableItemId
  [key: string]: TableItemType
}

@Component({
  selector: 'gn-ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements AfterViewInit {
  @Input() set data(value: TableItemModel[]) {
    this.dataSource = new MatTableDataSource(value)
    this.dataSource.sort = this.sort
    this.properties =
      Array.isArray(value) && value.length ? Object.keys(value[0]) : []
  }
  @Input() activeId: TableItemId
  @Output() selected = new EventEmitter<any>()

  @ViewChild(MatSort) sort: MatSort
  properties: string[]
  dataSource: MatTableDataSource<any>
  headerHeight: number

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
