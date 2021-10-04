import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'gn-ui-record-view',
  templateUrl: './record-view.component.html',
  styleUrls: ['./record-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordViewComponent {
  constructor(public facade: MdViewFacade) {}

  onTabIndexChange(index: number): void {
    console.log(index)
  }
}
