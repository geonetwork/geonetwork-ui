import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core'
import { SearchFacade } from '@lib/search'
import { BaseComponent } from '../base.component'

@Component({
  selector: 'wc-gn-facets-component',
  templateUrl: './gn-facets.html',
  styleUrls: ['./gn-facets.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class GnFacetsComponent extends BaseComponent {
  @Input() facetConfig: string = '{}'

  constructor(private searchFacade: SearchFacade) {
    super()
  }

  ngOnInit(): void {
    super.ngOnInit()
    this.searchFacade.setConfigAggregations(JSON.parse(this.facetConfig))
    this.searchFacade.requestMoreResults()
  }
}
