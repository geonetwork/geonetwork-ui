import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { Choice } from '@geonetwork-ui/ui/inputs'
import { Observable, of, switchMap } from 'rxjs'
import { catchError, filter, map, startWith } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { FieldsService } from '../utils/service/fields.service'
import { FieldAvailableValue } from '../utils/service/fields'

@Component({
  selector: 'gn-ui-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterDropdownComponent implements OnInit {
  @Input() fieldName: string
  @Input() title: string

  choices$: Observable<Choice[]>
  selected$ = this.searchFacade.searchFilters$.pipe(
    switchMap((filters) =>
      this.fieldsService.readFieldValuesFromFilters(filters)
    ),
    map((fieldValues) => fieldValues[this.fieldName]),
    filter((selected) => !!selected),
    startWith([]),
    catchError(() => of([]))
  )

  onSelectedValues(values: (string | number)[]) {
    this.fieldsService
      .buildFiltersFromFieldValues({ [this.fieldName]: values })
      .subscribe((filters) => this.searchService.updateFilters(filters))
  }

  constructor(
    private searchFacade: SearchFacade,
    private searchService: SearchService,
    private fieldsService: FieldsService
  ) {}

  ngOnInit() {
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
}
