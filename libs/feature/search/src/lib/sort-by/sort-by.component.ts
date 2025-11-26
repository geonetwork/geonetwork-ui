import { Component, Input, OnInit, inject } from '@angular/core'
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
  value: SortByField
}

@Component({
  selector: 'gn-ui-sort-by',
  templateUrl: './sort-by.component.html',
  standalone: true,
  imports: [CommonModule, DropdownSelectorComponent, TranslatePipe],
})
export class SortByComponent implements OnInit {
  private facade = inject(SearchFacade)
  private searchService = inject(SearchService)

  @Input() isQualitySortable: boolean
  choices: SortChoice[] = [
    {
      label: marker('results.sortBy.relevancy'),
      value: SortByEnum.RELEVANCY,
    },
    {
      label: marker('results.sortBy.dateStamp'),
      value: SortByEnum.RESOURCE_DATES,
    },
    {
      label: marker('results.sortBy.popularity'),
      value: SortByEnum.POPULARITY,
    },
  ]
  currentSortBy$ = this.facade.sortBy$.pipe(
    filter((sortBy) => !!sortBy),
    map((sortBy) => sortBy)
  )

  ngOnInit(): void {
    if (this.isQualitySortable) {
      this.choices.push({
        label: marker('results.sortBy.qualityScore'),
        value: SortByEnum.QUALITY_SCORE,
      })
    }
  }

  changeSortBy(criteria: SortByField): void {
    this.searchService.setSortBy(criteria)
  }
}
