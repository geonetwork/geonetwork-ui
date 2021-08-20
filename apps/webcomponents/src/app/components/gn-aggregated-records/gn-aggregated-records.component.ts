import {
  ChangeDetectionStrategy,
  Component,
  Injector,
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
  @Input() aggregationField: string
  @Input() aggregationMaxCount = 20
  @Input() aggregationQueryString: string

  activeFilter = null

  constructor(injector: Injector) {
    super(injector)
  }

  setFilter(value: string) {
    this.activeFilter = `+${this.aggregationField}:"${value}"`
    this.facade.updateFilters({ any: this.activeFilter })
  }

  clearFilter() {
    this.activeFilter = null
  }
}
