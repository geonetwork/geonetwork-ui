import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core'
import { ResultsListLayout } from '@lib/common'
import { SearchState, SetSearch } from '@lib/search'
import { Store } from '@ngrx/store'
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
  @Input() size = 10
  @Input() filter = ''

  constructor(private store: Store<SearchState>) {
    super()
  }

  ngOnInit(): void {
    super.ngOnInit()
    this.store.dispatch(
      new SetSearch({ filters: { any: this.filter }, size: this.size })
    )
  }
}
