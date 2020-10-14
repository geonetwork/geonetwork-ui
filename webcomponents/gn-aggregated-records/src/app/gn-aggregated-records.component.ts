import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core'
import { BaseComponent } from '../../../base.component'

@Component({
  selector: 'wc-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class GnAggregatedRecordsComponent extends BaseComponent {
  @Input() aggregationField: string
  @Input() aggregationMaxCount = 20
  @Input() aggregationQueryString: string

  activeFilter = null

  ngOnInit(): void {
    super.ngOnInit()
  }

  setFilter(value: string) {
    this.activeFilter = `+${this.aggregationField}:${value}`
  }

  clearFilter() {
    this.activeFilter = null
  }
}
