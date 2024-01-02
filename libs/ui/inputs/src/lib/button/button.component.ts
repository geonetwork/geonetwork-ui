import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { propagateToDocumentOnly } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() type: 'primary' | 'secondary' | 'default' | 'outline' | 'light' =
    'default'
  @Input() disabled = false
  @Input() extraClass = ''
  @Output() buttonClick = new EventEmitter<void>()

  get classList() {
    return `btn-${this.type} ${this.extraClass}`
  }

  handleClick(event: Event) {
    this.buttonClick.emit()
    event.preventDefault()
    propagateToDocumentOnly(event)
  }
}
