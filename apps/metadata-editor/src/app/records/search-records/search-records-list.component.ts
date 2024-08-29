import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  ResultsTableContainerComponent,
  SearchFacade,
  SearchService,
} from '@geonetwork-ui/feature/search'
import { TranslateModule } from '@ngx-translate/core'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { RecordsCountComponent } from '../records-count/records-count.component'
import { Observable } from 'rxjs'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'md-editor-search-records-list',
  templateUrl: './search-records-list.component.html',
  styleUrls: ['./search-records-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RecordsCountComponent,
    ResultsTableContainerComponent,
    UiElementsModule,
    UiInputsModule,
    MatIconModule,
  ],
})
export class SearchRecordsComponent {
  searchText$: Observable<string | null> =
    this.searchFacade.searchFilters$.pipe(
      map((filters) => ('any' in filters ? (filters['any'] as string) : null))
    )

  constructor(
    private router: Router,
    public searchFacade: SearchFacade,
    public searchService: SearchService
  ) {
    this.searchFacade.setPageSize(15)
    this.searchFacade.resetSearch()
  }

  editRecord(record: CatalogRecord) {
    this.router.navigate(['/edit', record.uniqueIdentifier])
  }

  duplicateRecord(record: CatalogRecord) {
    this.router.navigate(['/duplicate', record.uniqueIdentifier])
  }

  createRecord() {
    this.router.navigate(['/create'])
  }
}
