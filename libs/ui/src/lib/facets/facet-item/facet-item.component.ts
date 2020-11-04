import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'ui-checkbox-input',
  templateUrl: './facet-item.component.html',
  styleUrls: ['./facet-item.component.css'],
})
export class FacetItemComponent implements OnInit {
  @Input() label: string
  @Input() count: number
  @Input() selected: boolean
  @Input() inverted: boolean

  @Output() selectedChange = new EventEmitter<boolean>()
  @Output() invertedChange = new EventEmitter<boolean>()

  constructor() {}

  ngOnInit(): void {}

  onSelectedChange(value: boolean) {
    this.selectedChange.emit(value)
  }

  onInvertedChange(value: boolean) {
    this.invertedChange.emit(value)
  }

  toggleInverted() {
    this.inverted = !this.inverted
    this.onInvertedChange(this.inverted)
  }
}
