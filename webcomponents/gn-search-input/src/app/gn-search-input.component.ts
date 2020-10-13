import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core'
import { Configuration } from '@lib/gn-api'
export const apiConfiguration = new Configuration()

@Component({
  selector: 'wc-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class GnSearchInputComponent implements OnInit {
  @Input() apiUrl = '/'

  constructor() {}

  ngOnInit(): void {
    apiConfiguration.basePath = this.apiUrl
  }
}
