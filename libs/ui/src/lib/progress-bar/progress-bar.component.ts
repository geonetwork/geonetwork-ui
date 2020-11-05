import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'ui-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  @Input() value = 0

  get validValue() {
    return this.value > 0 ? (this.value < 100 ? this.value : 100) : 0
  }

  constructor() {}

  ngOnInit(): void {}
}
