import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  ViewEncapsulation,
} from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { BaseComponent } from '../base.component'

@Component({
  selector: 'wc-gn-dataset-preview',
  templateUrl: './gn-dataset-view-table.component.html',
  styleUrls: ['./gn-dataset-view-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [SearchFacade, SearchService],
})
export class GnDatasetViewTableComponent
  extends BaseComponent
  implements OnInit
{
  constructor(injector: Injector, private mdViewFacade: MdViewFacade) {
    super(injector)
  }
  ngOnInit(): void {
    this.mdViewFacade.loadFull('ee965118-2416-4d48-b07e-bbc696f002c2')
  }
}
