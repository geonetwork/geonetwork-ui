import { Component, ChangeDetectionStrategy } from '@angular/core'
import { MdViewFacade } from '../state'

@Component({
  selector: 'gn-ui-data-exports',
  templateUrl: './data-exports.component.html',
  styleUrls: ['./data-exports.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataExportsComponent {
  constructor(public facade: MdViewFacade) {}
}
