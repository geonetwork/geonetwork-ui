import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { DatasetServiceDistribution } from 'libs/common/domain/src/lib/model/record'

@Component({
  selector: 'gn-ui-api-card',
  templateUrl: './api-card.component.html',
  styleUrls: ['./api-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiCardComponent {
  @Input() link: DatasetServiceDistribution
}
