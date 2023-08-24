import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core'
import { BaseComponent } from '../base.component'
import { SearchFacade } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'wc-gn-map-viewer',
  templateUrl: './gn-map-viewer.component.html',
  styleUrls: ['./gn-map-viewer.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchFacade],
})
export class GnMapViewerComponent extends BaseComponent {}
