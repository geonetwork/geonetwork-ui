import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'

@Component({
  selector: 'ui-record-metric',
  templateUrl: './record-metric.component.html',
  styleUrls: ['./record-metric.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordMetricComponent implements OnInit {
  @Input() count: number
  @Input() label: string
  @Input() icon: string

  constructor() {}

  ngOnInit(): void {}
}
