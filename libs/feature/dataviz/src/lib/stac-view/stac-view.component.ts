import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import {
  DatasetServiceDistribution,
  DatasetTemporalExtent,
} from '@geonetwork-ui/common/domain/model/record'
import { DatePickerComponent } from '@geonetwork-ui/ui/inputs'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matDeleteOutline } from '@ng-icons/material-icons/outline'
import { TranslateDirective } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('stac.filter.period')
marker('stac.filter.from')
marker('stac.filter.to')
marker('stac.filter.reset')

@Component({
  selector: 'gn-ui-stac-view',
  templateUrl: './stac-view.component.html',
  styleUrls: ['./stac-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    DatePickerComponent,
    NgIconComponent,
    TranslateDirective,
  ],
  viewProviders: [provideIcons({ matDeleteOutline })],
})
export class StacViewComponent implements OnInit {
  @Input() link: DatasetServiceDistribution
  @Input() initialTemporalExtent: DatasetTemporalExtent | null

  currentTemporalExtent: DatasetTemporalExtent | null = null
  isTemporalFilterModified = false

  onStartDateChange(date: Date) {
    this.currentTemporalExtent = {
      start: date,
      end: this.currentTemporalExtent?.end,
    }
    this.isTemporalFilterModified = true
  }

  onEndDateChange(date: Date) {
    this.currentTemporalExtent = {
      start: this.currentTemporalExtent?.start,
      end: date,
    }
    this.isTemporalFilterModified = true
  }

  onResetFilters() {
    this.currentTemporalExtent = this.initialTemporalExtent
    this.isTemporalFilterModified = false
  }

  ngOnInit() {
    this.currentTemporalExtent = this.initialTemporalExtent
  }
}
