import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-record-field-group',
  templateUrl: './record-field-group.component.html',
  styleUrls: ['./record-field-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordFieldGroupComponent {
  @Input() label: string
}
