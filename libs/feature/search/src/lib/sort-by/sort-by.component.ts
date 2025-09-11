import { Component, Input, OnInit } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  SortByEnum,
  SortByField,
} from '@geonetwork-ui/common/domain/model/search'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { filter, map } from 'rxjs/operators'
import { DropdownSelectorComponent } from '@geonetwork-ui/ui/inputs'
import { CommonModule } from '@angular/common'
import { TranslatePipe } from '@ngx-translate/core'

interface SortChoice {
  label: string
  value: string
}

@Component({
  selector: 'gn-ui-sort-by',
  templateUrl: './sort-by.component.html',
  standalone: true,
  imports: [CommonModule, DropdownSelectorComponent, TranslatePipe],
})
export class SortByComponent implements OnInit {
  @Input() isQualitySortable: boolean
  choices: SortChoice[] = [
    {
      label: marker('results.sortBy.relevancy'),
      value: SortByEnum.RELEVANCY.join(','),
    },
    {
      label: marker('results.sortBy.dateStamp'),
      value: SortByEnum.CREATE_DATE.join(','),
    },
    {
      label: marker('results.sortBy.changeDate'),
      value: SortByEnum.CHANGE_DATE.join(','),
    },
    {
      label: marker('results.sortBy.popularity'),
      value: SortByEnum.POPULARITY.join(','),
    },
  ]
  currentSortBy$ = this.facade.sortBy$.pipe(
    filter((sortBy) => !!sortBy),
    map((sortBy) => sortBy.join(','))
  )

  constructor(
    private facade: SearchFacade,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    if (this.isQualitySortable) {
      this.choices.push({
        label: marker('results.sortBy.qualityScore'),
        value: SortByEnum.QUALITY_SCORE.join(','),
      })
    }
  }

  changeSortBy(criteriaAsString: string) {
    this.searchService.setSortBy(criteriaAsString.split(',') as SortByField)
  }
}
