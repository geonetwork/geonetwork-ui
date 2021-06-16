import {Component, Input, OnInit} from '@angular/core';
import {RecordSummary} from "@lib/common";

@Component({
  selector: 'ui-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css']
})
export class ResultsTableComponent implements OnInit {
  @Input() record: [RecordSummary];
  @Input() fieldsTable: any;

  constructor() { }

  ngOnInit(): void {
  }

}
