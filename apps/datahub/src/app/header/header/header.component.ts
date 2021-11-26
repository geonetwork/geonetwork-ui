import { ChangeDetectionStrategy, Component } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { ColorService, MetadataRecord } from '@geonetwork-ui/util/shared'
import { RouterFacade } from '@geonetwork-ui/feature/router'

marker('datahub.header.myfavorites')
marker('datahub.header.connex')
marker('datahub.header.lastRecords')
marker('datahub.header.popularRecords')

@Component({
  selector: 'datahub-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  autocompleteDisplayWithFn = () => ''

  constructor(private searchRouter: RouterFacade) {}

  onFuzzySearchSelection(record: MetadataRecord) {
    this.searchRouter.goToMetadata(record)
  }

  onFuzzySearchSubmission() {
    this.searchRouter.goToSearch()
  }
}
