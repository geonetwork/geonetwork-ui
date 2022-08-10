import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('organisations.sortBy.nameAsc')
marker('organisations.sortBy.nameDesc')
marker('organisations.sortBy.recordCountAsc')
marker('organisations.sortBy.recordCountDesc')

@Component({
  selector: 'gn-ui-organisations-sort',
  templateUrl: './organisations-sort.component.html',
  styleUrls: ['./organisations-sort.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationsSortComponent {
  choices = [
    {
      value: 'name-asc',
      label: 'organisations.sortBy.nameAsc',
    },
    {
      value: 'name-desc',
      label: 'organisations.sortBy.nameDesc',
    },
    {
      value: 'recordCount-asc',
      label: 'organisations.sortBy.recordCountAsc',
    },
    {
      value: 'recordCount-desc',
      label: 'organisations.sortBy.recordCountDesc',
    },
  ]
  @Output() sortBy = new EventEmitter<string>()

  selectOrderToDisplay(selectValue: string) {
    this.sortBy.emit(selectValue)
  }
}
