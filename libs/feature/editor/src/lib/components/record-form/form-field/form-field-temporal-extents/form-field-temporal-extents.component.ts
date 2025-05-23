import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { DatasetTemporalExtent } from '@geonetwork-ui/common/domain/model/record'
import { SortableListComponent } from '@geonetwork-ui/ui/layout'
import {
  ButtonComponent,
  DatePickerComponent,
  DateRangePickerComponent,
} from '@geonetwork-ui/ui/inputs'
import { TranslateDirective, TranslateService } from '@ngx-translate/core'
import { combineLatest, map } from 'rxjs'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirPlus } from '@ng-icons/iconoir'

@Component({
  selector: 'gn-ui-form-field-temporal-extents',
  templateUrl: './form-field-temporal-extents.component.html',
  styleUrls: ['./form-field-temporal-extents.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    SortableListComponent,
    DatePickerComponent,
    DateRangePickerComponent,
    TranslateDirective,
    NgIconComponent,
  ],
  providers: [
    provideIcons({ iconoirPlus }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
  ],
})
export class FormFieldTemporalExtentsComponent {
  extents: DatasetTemporalExtent[] = []
  @Input() set value(v: Array<DatasetTemporalExtent>) {
    this.extents = v
  }
  @Output() valueChange = new EventEmitter<Array<DatasetTemporalExtent>>()

  addOptions$ = combineLatest([
    this.translateService
      .get('editor.record.form.temporalExtents.addDate')
      .pipe(map((buttonLabel) => ({ buttonLabel, eventName: 'date' }))),
    this.translateService
      .get('editor.record.form.temporalExtents.addRange')
      .pipe(map((buttonLabel) => ({ buttonLabel, eventName: 'range' }))),
  ])

  constructor(private translateService: TranslateService) {}

  onItemsOrderChange(extents: unknown[]) {
    this.extents = extents as DatasetTemporalExtent[]
    this.emitValue()
  }

  onAdd(eventName: string) {
    switch (eventName) {
      case 'date': {
        const instant = { start: new Date() }
        this.extents = [...this.extents, instant]
        break
      }
      case 'range': {
        const range = {
          start: new Date(),
          end: new Date(),
        }
        this.extents = [...this.extents, range]
        break
      }
    }
    this.emitValue()
  }

  onExtentChange(extent: Partial<DatasetTemporalExtent>, index: number) {
    this.extents = [...this.extents]
    this.extents[index] = { ...this.extents[index], ...extent }
    this.emitValue()
  }

  emitValue() {
    this.valueChange.emit(this.extents)
  }
}
