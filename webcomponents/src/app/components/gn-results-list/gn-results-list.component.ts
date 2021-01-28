import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core'
import { ResultsListLayout } from '@lib/common'
import { SearchFacade } from '@lib/search'
import { BaseComponent } from '../base.component'

@Component({
  selector: 'wc-gn-results-list-component',
  templateUrl: './gn-results-list.html',
  styleUrls: ['./gn-results-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [SearchFacade],
})
export class GnResultsListComponent extends BaseComponent {
  @Input() layout: ResultsListLayout = ResultsListLayout.CARD
  @Input() size = 10
  @Input() filter = ''

  constructor(facade: SearchFacade, private changeDetector: ChangeDetectorRef) {
    super(facade)
  }

  ngOnInit(): void {
    super.ngOnInit()
    setTimeout(() => {
      // Be sure to update the source page when the state is updated
      // timeout cause must be the last subscriber to the change
      this.facade.isLoading$.subscribe((v) => {
        this.changeDetector.detectChanges()
      })
    })
  }

  private setSearch_() {
    this.facade.setSearch({
      filters: { any: this.filter },
      size: this.size,
      from: 0,
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes)
    this.setSearch_()
  }
}
