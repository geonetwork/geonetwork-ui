import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'

@Component({
  selector: 'gn-ui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  @Input() checked = false
  @Input() indeterminate? = false
  @Output() changed = new EventEmitter<boolean>()

  handleClick(event: Event) {
    event.stopPropagation()
    this.checked = !this.checked
    this.changed.emit(this.checked)
  }
}
