import {Component, Input, OnInit} from '@angular/core';
import {RecordSummary} from "@lib/common";

@Component({
  selector: 'ui-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css']
})
export class RecordTableComponent implements OnInit {
  @Input() record: [RecordSummary];
  @Input() fieldsTable: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.fieldsTable)
  }

}
