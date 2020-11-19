import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core'
import { ResultsListLayout } from '@lib/common'
import { BaseComponent } from '../../../base.component'

@Component({
  selector: 'wc-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class GnResultsListComponent extends BaseComponent {
  @Input() layout: ResultsListLayout = ResultsListLayout.CARD
  @Input() lines = 10
  @Input() filter

  constructor() {
    super()
  }

  ngOnInit(): void {
    super.ngOnInit()
  }
}
