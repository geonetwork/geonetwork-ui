import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'gn-ui-facet-item',
  templateUrl: './facet-item.component.html',
  styleUrls: ['./facet-item.component.css'],
})
export class FacetItemComponent {
  @Input() label: string
  @Input() count: number
  @Input() selected: boolean
  @Input() inverted: boolean

  @Output() selectedChange = new EventEmitter<boolean>()
  @Output() invertedChange = new EventEmitter<boolean>()

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

@Component({ selector: 'gn-ui-facet-item', template: '' })
export class FacetItemStubComponent implements Partial<FacetItemComponent> {
  @Input() label: string
  @Input() count: number
  @Input() selected: boolean
  @Input() inverted: boolean

  @Output() selectedChange = new EventEmitter<boolean>()
  @Output() invertedChange = new EventEmitter<boolean>()
}
