import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { SortByField } from '@geonetwork-ui/common/domain/model/search'
import { debounceTime, Subject } from 'rxjs'
import {
  DropdownSelectorComponent,
  SearchInputComponent,
} from '@geonetwork-ui/ui/inputs'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-organisations-filter',
  templateUrl: './organisations-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SearchInputComponent, DropdownSelectorComponent, TranslatePipe],
})
export class OrganisationsFilterComponent {
  choices: { value: string; label: string }[] = [
    {
      value: 'asc,name',
      label: marker('organisations.sortBy.nameAsc'),
    },
    {
      value: 'desc,name',
      label: marker('organisations.sortBy.nameDesc'),
    },
    {
      value: 'asc,recordCount',
      label: marker('organisations.sortBy.recordCountAsc'),
    },
    {
      value: 'desc,recordCount',
      label: marker('organisations.sortBy.recordCountDesc'),
    },
  ]
  @Output() sortBy = new EventEmitter<SortByField>()
  filterByValueChange = new Subject<string>()
  @Output() filterBy = this.filterByValueChange.pipe(debounceTime(300))

  selectOrderToDisplay(selectValue: string) {
    this.sortBy.emit(selectValue.split(',') as SortByField)
  }

  filterOrganisations(inputValue: string) {
    this.filterByValueChange.next(inputValue)
  }
}
