import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { ThemeService } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-record-metric',
  templateUrl: './record-metric.component.html',
  styleUrls: ['./record-metric.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordMetricComponent implements OnInit {
  @Input() count: number
  @Input() label: string
  @Input() icon = '◔'

  color: string

  ngOnInit(): void {
    this.color = ThemeService.generateLabelColor(this.label, 0.6, 0.5)
  }
}
