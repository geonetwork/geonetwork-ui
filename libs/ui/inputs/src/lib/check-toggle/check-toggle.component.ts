import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'gn-ui-check-toggle',
  templateUrl: './check-toggle.component.html',
  styleUrls: ['./check-toggle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule],
})
export class CheckToggleComponent {
  @Input() title: string
  @Input() label: string
  @Input() value: boolean
  @Input() color: 'primary' | 'secondary' = 'primary'
  @Output() toggled = new EventEmitter<boolean>()

  toggle(value: boolean) {
    this.toggled.emit(value)
  }
}
