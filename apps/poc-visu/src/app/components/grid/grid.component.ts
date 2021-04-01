import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit, AfterViewInit {
  @Input() collection: any
  @ViewChild(MatSort) sort: MatSort
  dataSource: MatTableDataSource<any>
  constructor() {}

  get properties(): string[] {
    return (
      this.collection && Object.keys(this.collection.features[0].properties)
    )
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      this.collection.features.map((feature) => feature.properties)
    )
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
  }
}
