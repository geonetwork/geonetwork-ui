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
import { MapContainerComponent } from '@geonetwork-ui/ui/map'
import { MapContext } from '@geospatial-sdk/core'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matDeleteOutline } from '@ng-icons/material-icons/outline'
import { TranslateDirective } from '@ngx-translate/core'

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
    MapContainerComponent,
  ],
  viewProviders: [provideIcons({ matDeleteOutline })],
})
export class StacViewComponent implements OnInit {
  @Input() link: DatasetServiceDistribution
  @Input() initialTemporalExtent: DatasetTemporalExtent | null
  @Input() initialSpatialExtent: [number, number, number, number] | null

  private WORLD_EXTENT: [number, number, number, number] = [-180, -90, 180, 90]
  // TODO: add extent margin/padding when setting spatial extent on the map

  currentTemporalExtent: DatasetTemporalExtent | null = null
  currentSpatialExtent: [number, number, number, number] = this.WORLD_EXTENT
  isSpatialExtentInteractive = true
  areFiltersModified = false

  mapContext: MapContext = {
    layers: [
      {
        type: 'xyz',
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      },
    ],
    view: {
      extent: this.currentSpatialExtent,
    },
  }

  onStartDateChange(date: Date) {
    this.currentTemporalExtent = {
      ...this.currentTemporalExtent,
      start: date,
    }
    this.areFiltersModified = true
  }

  onEndDateChange(date: Date) {
    this.currentTemporalExtent = {
      ...this.currentTemporalExtent,
      end: date,
    }
    this.areFiltersModified = true
  }

  onSpatialExtentChange(extent: [number, number, number, number]) {
    this.currentSpatialExtent = extent
    this.mapContext = {
      ...this.mapContext,
      view: {
        ...this.mapContext.view,
        extent: this.currentSpatialExtent,
      },
    }
    this.areFiltersModified = true
  }

  onResetFilters() {
    this.currentTemporalExtent = this.initialTemporalExtent
    this.currentSpatialExtent = this.initialSpatialExtent ?? this.WORLD_EXTENT
    this.mapContext = {
      ...this.mapContext,
      view: {
        ...this.mapContext.view,
        extent: this.currentSpatialExtent,
      },
    }
    this.areFiltersModified = false
  }

  ngOnInit() {
    this.currentTemporalExtent = this.initialTemporalExtent
    this.currentSpatialExtent = this.initialSpatialExtent ?? this.WORLD_EXTENT
    this.mapContext = {
      ...this.mapContext,
      view: {
        ...this.mapContext.view,
        extent: this.currentSpatialExtent,
      },
    }
    this.areFiltersModified = false
  }
}
