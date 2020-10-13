import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core'
import { ColorService } from '@lib/common'
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
  @Input() primaryColor = '#9a9a9a'
  @Input() secondaryColor = '#767676'
  @Input() mainColor = '#1a1a1a'
  @Input() backgroundColor = '#cecece'

  constructor() {}

  ngOnInit(): void {
    apiConfiguration.basePath = this.apiUrl
    ColorService.applyCssVariables(
      this.primaryColor,
      this.secondaryColor,
      this.mainColor,
      this.backgroundColor
    )
  }
}
