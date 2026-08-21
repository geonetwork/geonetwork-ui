import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import {
  CdkOverlayOrigin,
  ConnectedPosition,
  OverlayModule,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay'
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
} from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { type Locale } from 'date-fns/locale'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import {
  matClose,
  matExpandLess,
  matExpandMore,
} from '@ng-icons/material-icons/baseline'
import { iconoirCalendar } from '@ng-icons/iconoir'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { propagateToDocumentOnly } from '@geonetwork-ui/util/shared'
import { ButtonComponent } from '../button/button.component'
import { provideLocalizedDateAdapter } from '../date-adapter.providers'

export type DateRangeBound = 'start' | 'end'

@Component({
  selector: 'gn-ui-date-range-dropdown',
  standalone: true,
  imports: [
    ButtonComponent,
    MatDatepickerModule,
    NgIcon,
    NgTemplateOutlet,
    OverlayModule,
    TranslateDirective,
    TranslatePipe,
  ],
  providers: [
    provideIcons({
      iconoirCalendar,
      matClose,
      matExpandLess,
      matExpandMore,
    }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
    provideLocalizedDateAdapter(),
  ],
  templateUrl: './date-range-dropdown.component.html',
  styleUrls: ['./date-range-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeDropdownComponent {
  private scrollStrategies = inject(ScrollStrategyOptions)
  private dateAdapter = inject<DateAdapter<Date, Locale>>(DateAdapter)
  private dateFormats = inject<MatDateFormats>(MAT_DATE_FORMATS)
  private cdr = inject(ChangeDetectorRef)

  @Input() title: string
  @Input() startDate: Date
  @Input() endDate: Date
  @Output() startDateChange = new EventEmitter<Date>()
  @Output() endDateChange = new EventEmitter<Date>()
  @Output() dateRangeClear = new EventEmitter<void>()

  @ViewChild('overlayOrigin') overlayOrigin: CdkOverlayOrigin

  overlayPositions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 8,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -8,
    },
  ]
  scrollStrategy = this.scrollStrategies.reposition()
  overlayOpen = false
  expandedBound: DateRangeBound | null = 'start'
  invalidBounds: Record<DateRangeBound, boolean> = { start: false, end: false }

  constructor() {
    // redraw when the lazily loaded UI locale reaches the adapter
    this.dateAdapter.localeChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.cdr.markForCheck())
  }

  get selectedDatesCount() {
    return (this.startDate ? 1 : 0) + (this.endDate ? 1 : 0)
  }

  openOverlay() {
    this.expandedBound = 'start'
    this.overlayOpen = true
  }

  closeOverlay() {
    this.overlayOpen = false
  }

  toggleBound(bound: DateRangeBound) {
    this.expandedBound = this.expandedBound === bound ? null : bound
  }

  formatDate(date: Date) {
    return this.dateAdapter.format(date, this.dateFormats.display.dateInput)
  }

  onDateInput(bound: DateRangeBound, event: Event) {
    const typedText = (event.target as HTMLInputElement).value.trim()
    const date = typedText
      ? this.dateAdapter.parse(typedText, this.dateFormats.parse.dateInput)
      : null
    if (!this.isAcceptable(bound, typedText, date)) {
      // keep the text as typed and flag it; the filter stays on its last value
      this.invalidBounds = { ...this.invalidBounds, [bound]: true }
      return
    }
    if (bound === 'start') this.setStartDate(date)
    else this.setEndDate(date)
  }

  normalizeDateInput(bound: DateRangeBound, event: Event) {
    if (this.invalidBounds[bound]) return
    const date = bound === 'start' ? this.startDate : this.endDate
    const input = event.target as HTMLInputElement
    input.value = date ? this.formatDate(date) : ''
  }

  private isAcceptable(
    bound: DateRangeBound,
    typedText: string,
    date: Date | null
  ) {
    if (!typedText) return true
    if (!date || !this.dateAdapter.isValid(date)) return false
    return bound === 'start'
      ? !this.endDate || date <= this.endDate
      : !this.startDate || date >= this.startDate
  }

  // setting dates from input
  setStartDate(date: Date) {
    this.startDate = date
    this.invalidBounds = { ...this.invalidBounds, start: false }
    this.startDateChange.emit(date)
  }

  setEndDate(date: Date) {
    this.endDate = date
    this.invalidBounds = { ...this.invalidBounds, end: false }
    this.endDateChange.emit(date)
  }

  // selecting dates from the date picker
  selectStartDate(date: Date) {
    this.setStartDate(date)
    this.expandedBound = 'end'
  }

  selectEndDate(date: Date) {
    this.setEndDate(date)
    this.expandedBound = null
  }

  clearDates(event: Event) {
    this.startDate = null
    this.endDate = null
    this.invalidBounds = { start: false, end: false }
    this.expandedBound = 'start'
    this.dateRangeClear.emit()
    propagateToDocumentOnly(event)
  }
}
