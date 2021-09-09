import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterFacade } from '@geonetwork-ui/feature/search'
import { MetadataRecord } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSearchComponent {
  constructor(private searchRouter: RouterFacade) {}

  onMetadataSelection(metadata: MetadataRecord): void {
    this.searchRouter.goToMetadata(metadata)
  }
}
