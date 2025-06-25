import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { MatCheckboxModule } from '@angular/material/checkbox'

@Component({
  selector: 'gn-ui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatCheckboxModule],
})
export class CheckboxComponent {
  @Input() type: 'primary' | 'secondary' | 'default' = 'default'
  @Input() checked = false
  @Input() indeterminate? = false
  @Output() changed = new EventEmitter<boolean>()

  get classList() {
    return `${this.type}`
  }

  handleClick(event: Event) {
    event.stopPropagation()
    this.checked = !this.checked
    this.changed.emit(this.checked)
  }
}
