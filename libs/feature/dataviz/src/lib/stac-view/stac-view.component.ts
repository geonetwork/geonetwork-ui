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
import { StacItemsResultGridComponent } from '@geonetwork-ui/ui/dataviz'
import { DatePickerComponent } from '@geonetwork-ui/ui/inputs'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matDeleteOutline } from '@ng-icons/material-icons/outline'
import { TranslateDirective } from '@ngx-translate/core'
import { DataService } from '../service/data.service'
import { from, Observable } from 'rxjs'
import { GetCollectionItemsOptions, StacItem } from '@camptocamp/ogc-client'

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
    StacItemsResultGridComponent,
  ],
  viewProviders: [provideIcons({ matDeleteOutline })],
})
export class StacViewComponent implements OnInit {
  @Input() link: DatasetServiceDistribution
  @Input() initialTemporalExtent: DatasetTemporalExtent | null

  currentTemporalExtent: DatasetTemporalExtent | null = null
  isTemporalFilterModified = false

  items$: Observable<StacItem[]>

  constructor(private dataService: DataService) {}

  onStartDateChange(date: Date) {
    this.currentTemporalExtent = {
      ...this.currentTemporalExtent,
      start: date,
    }
    this.isTemporalFilterModified = true
  }

  onEndDateChange(date: Date) {
    this.currentTemporalExtent = {
      ...this.currentTemporalExtent,
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
    const options: GetCollectionItemsOptions = {}
    if (this.currentTemporalExtent) {
      options.datetime = {
        ...(this.currentTemporalExtent.start && {
          start: this.currentTemporalExtent.start,
        }),
        ...(this.currentTemporalExtent.end && {
          end: this.currentTemporalExtent.end,
        }),
      }
    }
    this.items$ = from(this.dataService.getItemsFromStacApi(this.link, options))
  }
}
