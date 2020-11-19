import { Component, Input, OnInit } from '@angular/core'
import { RecordSummary } from '@lib/common'

@Component({
  selector: 'ui-record-thumbnail',
  templateUrl: './record-thumbnail.component.html',
})
export class RecordThumbnailComponent implements OnInit {
  @Input() thumbnailUrl: string

  constructor() {}

  ngOnInit(): void {}
}
