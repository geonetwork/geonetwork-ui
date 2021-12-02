import { Component, ChangeDetectionStrategy } from '@angular/core'
import { MdViewFacade } from '../state'

@Component({
  selector: 'gn-ui-data-otherlinks',
  templateUrl: './data-otherlinks.component.html',
  styleUrls: ['./data-otherlinks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataOtherlinksComponent {
  constructor(public facade: MdViewFacade) {}
}
