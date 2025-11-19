
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TranslateModule, TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-facet-item',
  templateUrl: './facet-item.component.html',
  styleUrls: ['./facet-item.component.css'],
  standalone: true,
  imports: [FormsModule, TranslateModule, TranslatePipe],
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
