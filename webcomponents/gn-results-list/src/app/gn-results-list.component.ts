import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core'
import { ResultsListLayout } from '@lib/common'
import { Configuration } from '@lib/gn-api'
import { BaseComponent } from '../../../base.component'

export const apiConfiguration = new Configuration()

@Component({
  selector: 'wc-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class GnResultsListComponent extends BaseComponent {
  @Input() layout: ResultsListLayout = ResultsListLayout.BLOCK
  @Input() lines = 10
  @Input() filter

  constructor() {
    super()
  }

  ngOnInit(): void {
    super.ngOnInit()
  }
}
