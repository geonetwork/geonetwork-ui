import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core'
import { ResultsListLayout } from '@lib/common'
import { getSearchResultsLoading, SearchState, SetSearch } from '@lib/search'
import { select, Store } from '@ngrx/store'
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

  constructor(
    private store: Store<SearchState>,
    private changeDetector: ChangeDetectorRef
  ) {
    super()
  }

  ngOnInit(): void {
    super.ngOnInit()
    setTimeout(() => {
      // Be sure to update the source page when the state is updated
      this.store.pipe(select(getSearchResultsLoading)).subscribe((v) => {
        this.changeDetector.detectChanges()
      })
    })
  }

  private setSearch_() {
    this.store.dispatch(
      new SetSearch({ filters: { any: this.filter }, size: this.size })
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes)
    this.setSearch_()
  }
}
