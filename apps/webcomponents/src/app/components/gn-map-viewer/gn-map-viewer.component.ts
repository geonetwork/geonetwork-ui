import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core'
import { BaseComponent, DefaultProviders } from '../base.component'

@Component({
  selector: 'wc-gn-map-viewer',
  templateUrl: './gn-map-viewer.component.html',
  styleUrls: ['./gn-map-viewer.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DefaultProviders],
  standalone: false,
})
export class GnMapViewerComponent extends BaseComponent {}
