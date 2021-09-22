import { ChangeDetectionStrategy, Component } from '@angular/core'
import { LinkClassifierService } from '../links/link-classifier.service'
import { MdViewFacade } from '../state/mdview.facade'

@Component({
  selector: 'gn-ui-metadata-full-view',
  templateUrl: './metadata-full-view.component.html',
  styleUrls: ['./metadata-full-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataFullViewComponent {
  constructor(
    public facade: MdViewFacade,
    public links: LinkClassifierService
  ) {}

  onTabIndexChange(index: number): void {
    console.log(index)
  }
}
