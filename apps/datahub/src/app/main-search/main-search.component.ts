import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RecordSummary } from '@geonetwork-ui/util/shared'
import { MdViewFacade } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'gn-ui-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSearchComponent {
  constructor(private mdViewFacade: MdViewFacade) {}

  onMetadataSelection(metadata: RecordSummary): void {
    this.mdViewFacade.setIncompleteMetadata(metadata)
  }
}
