import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core'
import { BaseComponent } from '../base.component'

@Component({
  selector: 'wc-gn-aggregated-records',
  templateUrl: './gn-aggregated-records.html',
  styleUrls: ['./gn-aggregated-records.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class GnAggregatedRecordsComponent extends BaseComponent {
  @Input() apiUrl = '/'
  @Input() searchId: string
  @Input() primaryColor = '#9a9a9a'
  @Input() secondaryColor = '#767676'
  @Input() mainColor = '#1a1a1a'
  @Input() backgroundColor = '#cecece'
  @Input() aggregationField: string
  @Input() aggregationMaxCount = 20
  @Input() aggregationQueryString: string

  activeFilter = null

  setFilter(value: string) {
    this.activeFilter = `+${this.aggregationField}:"${value}"`
    this.facade.updateFilters({ any: this.activeFilter })
  }

  clearFilter() {
    this.activeFilter = null
  }
}
