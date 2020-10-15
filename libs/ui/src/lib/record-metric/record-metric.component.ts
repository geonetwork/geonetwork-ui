import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { ColorService } from '@lib/common'

@Component({
  selector: 'ui-record-metric',
  templateUrl: './record-metric.component.html',
  styleUrls: ['./record-metric.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordMetricComponent implements OnInit {
  @Input() count: number
  @Input() label: string
  @Input() icon = '◔'

  color: string

  constructor() {}

  ngOnInit(): void {
    this.color = ColorService.generateLabelColor(this.label, 0.6, 0.5)
  }
}
