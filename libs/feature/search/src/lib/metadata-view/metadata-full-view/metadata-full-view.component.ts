import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MdViewFacade } from '../state/mdview.facade'

@Component({
  selector: 'gn-ui-metadata-full-view',
  templateUrl: './metadata-full-view.component.html',
  styleUrls: ['./metadata-full-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataFullViewComponent {
  isPresent$ = this.mdViewFacade.isPresent$
  metadata$ = this.mdViewFacade.metadata$
  isIncomplete$ = this.mdViewFacade.isIncomplete$

  constructor(private mdViewFacade: MdViewFacade) {}
}
