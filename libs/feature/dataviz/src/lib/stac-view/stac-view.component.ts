import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {
  DatasetServiceDistribution,
  DatasetTemporalExtent,
} from '@geonetwork-ui/common/domain/model/record'
import { BehaviorSubject, combineLatest, map, Subscription } from 'rxjs'
import { DatePickerComponent } from '@geonetwork-ui/ui/inputs'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matDeleteOutline } from '@ng-icons/material-icons/outline'
import { MatTooltip } from '@angular/material/tooltip'

@Component({
  selector: 'gn-ui-stac-view',
  templateUrl: './stac-view.component.html',
  styleUrls: ['./stac-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DatePickerComponent, NgIconComponent, MatTooltip],
  viewProviders: [provideIcons({ matDeleteOutline })],
})
export class StacViewComponent implements OnInit, OnDestroy {
  @Input() link: DatasetServiceDistribution
  private subscription = new Subscription()

  initialTemporalExtent$ = new BehaviorSubject<DatasetTemporalExtent>(null)
  currentTemporalExtent$ = new BehaviorSubject<DatasetTemporalExtent>(null)

  isCurrentTemporalExtentModifiedFromInitial$ = combineLatest([
    this.initialTemporalExtent$,
    this.currentTemporalExtent$,
  ]).pipe(
    map(([initial, current]) => {
      return (
        initial?.start?.getTime() !== current?.start?.getTime() ||
        initial?.end?.getTime() !== current?.end?.getTime()
      )
    })
  )

  onStartDateChange(date: Date) {
    this.currentTemporalExtent$.next({
      start: date,
      end: this.currentTemporalExtent$.value?.end,
    })
  }

  onEndDateChange(date: Date) {
    this.currentTemporalExtent$.next({
      start: this.currentTemporalExtent$.value?.start,
      end: date,
    })
  }

  onResetFilters() {
    this.currentTemporalExtent$.next(this.initialTemporalExtent$.value)
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

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
