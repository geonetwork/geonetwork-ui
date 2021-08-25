import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'gn-ui-metadata-full-view',
  templateUrl: './metadata-full-view.component.html',
  styleUrls: ['./metadata-full-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataFullViewComponent {
  $loading = this.mdViewFacade.loading$
  $metadata = this.mdViewFacade.full$

  constructor(private mdViewFacade: MdViewFacade) {}
}
