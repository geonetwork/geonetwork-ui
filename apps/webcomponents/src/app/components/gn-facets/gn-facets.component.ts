import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core'
import { BaseComponent } from '../base.component'

@Component({
  selector: 'wc-gn-facets-component',
  templateUrl: './gn-facets.html',
  styleUrls: ['./gn-facets.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class GnFacetsComponent extends BaseComponent implements OnInit {
  @Input() apiUrl = '/'
  @Input() searchId: string
  @Input() primaryColor = '#9a9a9a'
  @Input() secondaryColor = '#767676'
  @Input() mainColor = '#1a1a1a'
  @Input() backgroundColor = '#cecece'
  @Input() facetConfig = '{}'

  ngOnInit(): void {
    this.facade.setConfigAggregations(JSON.parse(this.facetConfig))
    this.facade.requestMoreResults()
  }
}
