import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

const rowIdPrefix = 'table-item-'

@Component({
  selector: 'gn-ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() data: any
  @Input() activeId: any
  @Output() selected = new EventEmitter<any>()

  @ViewChild(MatSort) sort: MatSort
  dataSource: MatTableDataSource<any>
  headerHeight: number

  constructor(private eltRef: ElementRef) {}

  get properties(): string[] {
    return Array.isArray(this.data) && this.data.length
      ? Object.keys(this.data[0])
      : []
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data)
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.headerHeight =
      this.eltRef.nativeElement.querySelector('thead').offsetHeight
  }

  scrollToItem(itemId: string): void {
    const row = this.eltRef.nativeElement.querySelector(
      `#${this.getRowEltId(itemId)}`
    )
    this.eltRef.nativeElement.scrollTop = row.offsetTop - this.headerHeight
  }

  public getRowEltId(id: string): string {
    return rowIdPrefix + id
  }
}
