import { Component, ChangeDetectionStrategy } from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'

@Component({
  selector: 'datahub-record-otherlinks',
  templateUrl: './record-otherlinks.component.html',
  styleUrls: ['./record-otherlinks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordOtherlinksComponent {
  constructor(public facade: MdViewFacade) {}
}
