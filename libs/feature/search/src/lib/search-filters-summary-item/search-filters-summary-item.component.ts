import { Component, Input, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  catchError,
  firstValueFrom,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs'
import { BadgeComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateService } from '@ngx-translate/core'
import { DateRange } from '@geonetwork-ui/api/repository'
import { FieldType, FieldValue } from '../utils/service/fields'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { FieldsService } from '../utils/service/fields.service'
import { DateService, formatUserInfo } from '@geonetwork-ui/util/shared'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('search.filters.summaryLabel.user')
marker('search.filters.summaryLabel.changeDate')

const OPEN_BOUND = '…'

interface DisplayedValue {
  label: string
  value: FieldValue | DateRange
}

@Component({
  selector: 'gn-ui-search-filters-summary-item',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  templateUrl: './search-filters-summary-item.component.html',
  styleUrls: ['./search-filters-summary-item.component.css'],
})
export class SearchFiltersSummaryItemComponent implements OnInit {
  private searchFacade = inject(SearchFacade)
  private searchService = inject(SearchService)
  private fieldsService = inject(FieldsService)
  private dateService = inject(DateService)
  private translate = inject(TranslateService)

  @Input() fieldName: string
  fieldType: FieldType
  translatedLabel: string

  fieldValues$ = this.searchFacade.searchFilters$.pipe(
    switchMap((filters) =>
      this.fieldsService.readFieldValuesFromFilters(filters)
    ),
    map((fieldValues) =>
      Array.isArray(fieldValues[this.fieldName])
        ? (fieldValues[this.fieldName] as FieldValue[])
        : ([fieldValues[this.fieldName]] as FieldValue[])
    ),
    map(
      (fieldValues) => this.getReadableValues(fieldValues) as DisplayedValue[]
    ),
    catchError(() => of([]))
  ) as Observable<DisplayedValue[]>

  ngOnInit() {
    this.fieldType = this.fieldsService.getFieldType(this.fieldName)
    this.translateLabel()
  }

  translateLabel() {
    const labelKey = `search.filters.summaryLabel.${this.fieldName}`
    const fallbackKey = `search.filters.${this.fieldName}`
    this.translate.get(labelKey).subscribe((value: string) => {
      if (value === labelKey) {
        this.translate.get(fallbackKey).subscribe((fallbackValue: string) => {
          this.translatedLabel = fallbackValue
        })
      } else {
        this.translatedLabel = value
      }
    })
  }

  getReadableValues(fieldValues: FieldValue[] | DateRange[]): DisplayedValue[] {
    return fieldValues.map((value) => {
      if (this.fieldType === 'dateRange') {
        const { start, end } = value as DateRange
        return {
          value,
          label: `${this.formatBound(start)} - ${this.formatBound(end)}`,
        }
      } else if (this.fieldName === 'user') {
        return { value, label: formatUserInfo(value) }
      } else {
        return { value, label: value }
      }
    })
  }

  private formatBound(date: Date | undefined): string {
    return date
      ? this.dateService.formatDate(date, {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : OPEN_BOUND
  }

  async removeFilterValue(fieldValue: FieldValue | DateRange) {
    const currentFieldValues: DisplayedValue[] = await firstValueFrom(
      this.fieldValues$
    )
    const updatedFieldValues = currentFieldValues
      .filter(
        (displayedValue: DisplayedValue) => displayedValue.value !== fieldValue
      )
      .map((displayedValue: DisplayedValue) => displayedValue.value)

    this.fieldsService
      .buildFiltersFromFieldValues({
        [this.fieldName]: updatedFieldValues as FieldValue[],
      })
      .subscribe((filters) => this.searchService.updateFilters(filters))
  }
}
