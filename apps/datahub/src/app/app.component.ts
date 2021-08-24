import { Component } from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/search'
import { ColorService, RecordSummary } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private mdViewFacade: MdViewFacade) {
    ColorService.applyCssVariables('#093564', '#c2e9dc', '#212029', '#fdfbff')
  }

  onMetadataSelection(metadata: RecordSummary): void {
    this.mdViewFacade.setUuid(metadata.uuid)
  }
}
