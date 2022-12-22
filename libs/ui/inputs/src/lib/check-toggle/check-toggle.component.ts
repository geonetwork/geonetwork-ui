import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'

@Component({
  selector: 'gn-ui-check-toggle',
  templateUrl: './check-toggle.component.html',
  styleUrls: ['./check-toggle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckToggleComponent {
  @Input() title: string
  @Input() label: string
  @Input() value: boolean
  @Input() color: 'primary' | 'secondary' = 'primary'
  @Output() toggled = new EventEmitter()

  toggle(event: Event) {
    this.toggled.emit(event)
  }
}
