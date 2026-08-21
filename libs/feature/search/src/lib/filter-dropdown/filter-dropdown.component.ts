import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core'
import {
  Choice,
  DateRangeDropdownComponent,
  DropdownMultiselectComponent,
} from '@geonetwork-ui/ui/inputs'
import { Observable, of, switchMap } from 'rxjs'
import { catchError, filter, map, startWith, tap } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { FieldsService } from '../utils/service/fields.service'
import {
  FieldAvailableValue,
  FieldType,
  FieldValue,
} from '../utils/service/fields'
import { DateRange } from '@geonetwork-ui/api/repository'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    DateRangeDropdownComponent,
    DropdownMultiselectComponent,
  ],
})
export class FilterDropdownComponent implements OnInit {
  private searchFacade = inject(SearchFacade)
  private searchService = inject(SearchService)
  private fieldsService = inject(FieldsService)

  @Input() fieldName: string
  @Input() title: string

  fieldType: FieldType
  dateRange: DateRange = {}
  choices$: Observable<Choice[]>
  selected$ = this.searchFacade.searchFilters$.pipe(
    switchMap((filters) =>
      this.fieldsService.readFieldValuesFromFilters(filters)
    ),
    map((fieldValues) => fieldValues[this.fieldName]),
    filter((selected) => !!selected),
    startWith([]),
    catchError(() => of([]))
  ) as Observable<FieldValue[]>

  selectedDateRange$ = this.selected$.pipe(
    map((selected) => (Array.isArray(selected) ? {} : (selected as DateRange))),
    tap((dateRange) => (this.dateRange = dateRange))
  ) as Observable<DateRange>

  onSelectedValues(values: unknown[]) {
    this.fieldsService
      .buildFiltersFromFieldValues({ [this.fieldName]: values as FieldValue[] })
      .subscribe((filters) => this.searchService.updateFilters(filters))
  }

  ngOnInit() {
    this.fieldType = this.fieldsService.getFieldType(this.fieldName)
    this.choices$ = this.fieldsService.getAvailableValues(this.fieldName).pipe(
      startWith([] as FieldAvailableValue[]),
      map((values) =>
        values.map((v) => ({
          ...v,
          value: v.value.toString(), // converting to string for the dropdown
        }))
      ),
      catchError(() => of([]))
    )
  }

  onStartDateChange(start: Date) {
    this.applyDateRange({ ...this.dateRange, start })
  }

  onEndDateChange(end: Date) {
    this.applyDateRange({ ...this.dateRange, end })
  }

  onDateRangeClear() {
    this.applyDateRange({})
  }

  private applyDateRange(dateRange: DateRange) {
    this.dateRange = {
      ...(dateRange.start && { start: dateRange.start }),
      ...(dateRange.end && { end: dateRange.end }),
    }
    console.log('Applying date range filter:', this.dateRange)
    this.fieldsService
      .buildFiltersFromFieldValues({
        [this.fieldName]: this.dateRange,
      })
      .subscribe((filters) => this.searchService.updateFilters(filters))
  }
}
