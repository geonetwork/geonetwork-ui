import { Component, Input, OnInit } from '@angular/core'
import { Metadata } from '@lib/gn-api'

@Component({
  selector: 'ui-record-summary',
  templateUrl: './record-summary.component.html',
  styleUrls: ['./record-summary.component.css'],
})
export class RecordSummaryComponent implements OnInit {
  @Input() record: Metadata

  constructor() {}

  ngOnInit(): void {}
}
