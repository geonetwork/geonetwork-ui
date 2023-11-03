import { Component, ChangeDetectionStrategy } from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'

@Component({
  selector: 'datahub-record-apis',
  templateUrl: './record-apis.component.html',
  styleUrls: ['./record-apis.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordApisComponent {
  constructor(public facade: MdViewFacade) {}
}
