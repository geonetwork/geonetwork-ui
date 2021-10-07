import { Component, ChangeDetectionStrategy } from '@angular/core'
import { MdViewFacade } from '../state'

@Component({
  selector: 'gn-ui-data-apis',
  templateUrl: './data-apis.component.html',
  styleUrls: ['./data-apis.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataApisComponent {
  constructor(public facade: MdViewFacade) {}
}
