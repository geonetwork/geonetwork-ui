import { Component, ChangeDetectionStrategy } from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { RouterFacade } from '@geonetwork-ui/feature/router'

@Component({
  selector: 'datahub-header-record',
  templateUrl: './header-record.component.html',
  styleUrls: ['./header-record.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderRecordComponent {
  constructor(
    public mdViewFacade: MdViewFacade,
    private searchRouter: RouterFacade
  ) {}
  back() {
    this.searchRouter.back()
  }
}
