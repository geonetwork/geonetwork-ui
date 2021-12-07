import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { MetadataRecord } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'datahub-header-record',
  templateUrl: './header-record.component.html',
  styleUrls: ['./header-record.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderRecordComponent {
  @Input() metadata: MetadataRecord

  constructor(private searchRouter: RouterFacade) {}
  back() {
    this.searchRouter.back()
  }
}
