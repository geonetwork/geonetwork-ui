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
import { BehaviorSubject } from 'rxjs'
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

  initialTemporalExtent$ = new BehaviorSubject<DatasetTemporalExtent>(null)
  currentTemporalExtent$ = new BehaviorSubject<DatasetTemporalExtent>(null)
  isTemporalFilterModified$ = new BehaviorSubject<boolean>(false)

  onStartDateChange(date: Date) {
    this.currentTemporalExtent$.next({
      start: date,
      end: this.currentTemporalExtent$.value?.end,
    })
    this.isTemporalFilterModified$.next(true)
  }

  onEndDateChange(date: Date) {
    this.currentTemporalExtent$.next({
      start: this.currentTemporalExtent$.value?.start,
      end: date,
    })
    this.isTemporalFilterModified$.next(true)
  }

  onResetFilters() {
    this.currentTemporalExtent$.next(this.initialTemporalExtent$.value)
    this.isTemporalFilterModified$.next(false)
  }

  ngOnInit() {
    // TODO: initialExtent pré-saisis sur l'étendue temporelle de la collection
    // si la collection n’a pas d'étendue temporelle, les champs ne sont pas pré-saisis.
    const initialExtent: DatasetTemporalExtent = {
      start: null,
      end: null,
    }

    this.initialTemporalExtent$.next(initialExtent)
    this.currentTemporalExtent$.next(initialExtent)
  }
}
