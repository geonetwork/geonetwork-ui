import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'gn-ui-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
