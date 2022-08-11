import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'gn-ui-last-created-preview',
  templateUrl: './last-created-preview.component.html',
  styleUrls: ['./last-created-preview.component.css'],
})
export class LastCreatedPreviewComponent implements OnInit {
  constructor() {}
  @Input() organisation: string
  @Input() logo: string
  @Input() creationDate: Date
  @Input() title: string
  @Input() illustration: string

  ngOnInit(): void {}
}
