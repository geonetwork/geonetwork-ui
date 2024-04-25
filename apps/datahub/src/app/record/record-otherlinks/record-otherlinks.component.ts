import { Component, ChangeDetectionStrategy } from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'

@Component({
  selector: 'datahub-record-otherlinks',
  templateUrl: './record-otherlinks.component.html',
  styleUrls: ['./record-otherlinks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordOtherlinksComponent {
  private _OTHER_LINKS_LIST_PAGE_SIZE = 5
  otherLinks$ = this.facade.otherLinks$

  constructor(public facade: MdViewFacade) {}

  get OTHER_LINKS_LIST_PAGE_SIZE() {
    return this._OTHER_LINKS_LIST_PAGE_SIZE
  }
}
