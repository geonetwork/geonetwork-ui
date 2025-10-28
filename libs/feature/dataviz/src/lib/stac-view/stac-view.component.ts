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

@Component({
  selector: 'gn-ui-stac-view',
  templateUrl: './stac-view.component.html',
  styleUrls: ['./stac-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DatePickerComponent, NgIconComponent],
  viewProviders: [provideIcons({ matDeleteOutline })],
})
export class StacViewComponent implements OnInit {
  @Input() link: DatasetServiceDistribution

  initialTemporalExtent: DatasetTemporalExtent | null = null
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
    // TODO: initialExtent pré-saisis sur l'étendue temporelle de la collection
    // si la collection n'a pas d'étendue temporelle, les champs ne sont pas pré-saisis.
    const initialExtent: DatasetTemporalExtent = {
      start: null,
      end: null,
    }

    this.initialTemporalExtent = initialExtent
    this.currentTemporalExtent = initialExtent
  }
}
