import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'

@Component({
  selector: 'datahub-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPageComponent {
  constructor(public mdViewFacade: MdViewFacade) {}
}
