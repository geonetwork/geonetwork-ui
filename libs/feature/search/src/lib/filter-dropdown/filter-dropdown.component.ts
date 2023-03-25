import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { Choice } from '@geonetwork-ui/ui/inputs'
import { Observable } from 'rxjs'
import { filter, map, startWith } from 'rxjs/operators'
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
    map((filters) =>
      this.fieldsService.getValuesForFilters(this.fieldName, filters)
    ),
    filter((selected) => !!selected)
  )

  onSelectedValues(values: (string | number)[]) {
    const filters = this.fieldsService.getFiltersForValues(
      this.fieldName,
      values
    )
    this.searchService.updateFilters(filters)
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
      )
    )
  }
}
