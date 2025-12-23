import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core'
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { ButtonComponent } from '../button/button.component.js'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirCalendar } from '@ng-icons/iconoir'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    ButtonComponent,
    NgIconComponent,
  ],
  providers: [
    provideIcons({ iconoirCalendar }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
    {
      provide: MAT_DATE_LOCALE,
      useFactory: (locale: string) => locale,
    },
  ],
})
export class DatePickerComponent {
  private dateAdapter = inject<DateAdapter<Date>>(DateAdapter)
  private translate = inject(TranslateService)

  @Input() date: Date
  @Output() dateChange = new EventEmitter<Date>()

  constructor() {
    this.dateAdapter.setLocale(this.translate.currentLang)
  }
}
