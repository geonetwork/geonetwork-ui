import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'ui-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.css'],
})
export class CheckboxInputComponent implements OnInit {
  @Input() label: string
  @Input() count: number
  @Input() selected: boolean
  @Input() excluded: boolean

  @Output() selectedChange = new EventEmitter<boolean>()
  @Output() excludedChange = new EventEmitter<boolean>()

  constructor() {}

  ngOnInit(): void {}

  onSelectedChange(value: boolean) {
    this.selectedChange.emit(value)
  }

  onExcludedChange(value: boolean) {
    this.excludedChange.emit(value)
  }
}
