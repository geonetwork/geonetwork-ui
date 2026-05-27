import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { ReuseRecord } from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'gn-ui-notify-reuse-form',
  standalone: true,
  imports: [],
  templateUrl: './notify-reuse-form.component.html',
  styleUrl: './notify-reuse-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotifyReuseFormComponent {
  @Input() record: ReuseRecord | null = null
  @Output() recordChange = new EventEmitter<ReuseRecord>()
}
