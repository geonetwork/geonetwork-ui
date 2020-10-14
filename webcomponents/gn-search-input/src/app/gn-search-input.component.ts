import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core'
import { BaseComponent } from '../../../base.component'

@Component({
  selector: 'wc-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class GnSearchInputComponent extends BaseComponent {}
