import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'ui-results-hits-number',
  templateUrl: './results-hits-number.component.html',
})
export class ResultsHitsNumberComponent implements OnInit {
  @Input() hits
  @Input() loading: boolean

  constructor() {}

  ngOnInit(): void {}
}
