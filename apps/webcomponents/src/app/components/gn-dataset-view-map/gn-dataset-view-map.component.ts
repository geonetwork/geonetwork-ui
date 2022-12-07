import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  ViewEncapsulation,
} from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { BaseComponent } from '../base.component'

@Component({
  selector: 'wc-gn-dataset-view-map',
  templateUrl: './gn-dataset-view-map.component.html',
  styleUrls: ['./gn-dataset-view-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [SearchFacade],
})
export class GnDatasetViewMapComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector, private mdViewFacade: MdViewFacade) {
    super(injector)
  }
  ngOnInit(): void {
    this.mdViewFacade.loadFull('ee965118-2416-4d48-b07e-bbc696f002c2')
  }
}
