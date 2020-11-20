import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'ui-record-thumbnail',
  templateUrl: './record-thumbnail.component.html',
})
export class RecordThumbnailComponent implements OnInit {
  @Input() thumbnailUrl: string

  constructor() {}

  ngOnInit(): void {}
}
