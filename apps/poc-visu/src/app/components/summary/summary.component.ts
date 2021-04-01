import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { RecordBrief } from '@lib/common'
import { MapService, RecordLayer } from '../../map.service'

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent implements OnInit {
  @Input() metadata: RecordBrief
  @Input() layers: RecordLayer[]

  constructor(public mapService: MapService) {}

  ngOnInit(): void {}
}
