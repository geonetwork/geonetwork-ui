import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'geonetwork-ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() data: any
  @ViewChild(MatSort) sort: MatSort
  properties: string[]
  dataSource: MatTableDataSource<any>
  constructor() {}

  ngOnInit(): void {
    this.properties = Object.keys(this.data[0])
    this.dataSource = new MatTableDataSource(this.data)
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
  }
}
