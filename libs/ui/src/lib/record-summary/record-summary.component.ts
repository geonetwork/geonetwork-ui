import { Component, Input, OnInit } from '@angular/core'
import { RecordSimple } from '@lib/search'

@Component({
  selector: 'ui-record-summary',
  templateUrl: './record-summary.component.html',
  styleUrls: ['./record-summary.component.css'],
})
export class RecordSummaryComponent implements OnInit {
  @Input() record: RecordSimple

  constructor() {}

  ngOnInit(): void {}
}
