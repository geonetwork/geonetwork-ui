import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { BaseComponent } from '../base.component'

@Component({
  selector: 'wc-gn-facets-component',
  templateUrl: './gn-facets.html',
  styleUrls: ['./gn-facets.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [SearchFacade],
})
export class GnFacetsComponent extends BaseComponent implements OnInit {
  @Input() searchId: string
  @Input() facetConfig = '{}'

  ngOnInit(): void {
    this.facade.setConfigAggregations(JSON.parse(this.facetConfig))
    this.facade.requestMoreResults()
  }
}
