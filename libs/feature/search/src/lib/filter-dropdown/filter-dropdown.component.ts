import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { SearchFacade } from '../state/search.facade';

@Component({
  selector: 'gn-ui-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterDropdownComponent {
  @Input() fieldName: string

  private choices = ['my-org', 'org2', 'blabla']

  private onSelectedValues(values: unknown[]) {
    this.facade.updateFilters({
      [this.fieldName]: values.reduce((acc: Object, val) => {
        return { ...acc, [val.toString()]: true }
      }, {})
    })
  }



  constructor(private facade: SearchFacade) { }
}
