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
  private btnClass: string

  // btn-classes are explicited to allow tailwind recognize them and add it in css.
  @Input() set type(
    value: 'primary' | 'secondary' | 'default' | 'outline' | 'light'
  ) {
    switch (value) {
      case 'primary':
        this.btnClass = 'btn-primary'
        break
      case 'secondary':
        this.btnClass = 'btn-secondary'
        break
      case 'outline':
        this.btnClass = 'btn-outline'
        break
      case 'light':
        this.btnClass = 'btn-light'
        break
      default:
        this.btnClass = 'btn-default'
        break
    }
  }

  @Input() disabled = false
  @Input() extraClass = ''
  @Output() buttonClick = new EventEmitter<void>()

  get classList() {
    return `${this.btnClass} ${this.extraClass}`
  }

  handleClick(event: Event) {
    this.buttonClick.emit()
    event.preventDefault()
    propagateToDocumentOnly(event)
  }
}
