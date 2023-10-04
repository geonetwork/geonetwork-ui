import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { SortByField } from '@geonetwork-ui/common/domain/search'
import { TranslateModule } from '@ngx-translate/core'

const includes = [
  'uuid',
  'resourceTitleObject',
  'createDate',
  'changeDate',
  'userinfo',
  'cl_status',
  'isPublishedToAll',
  'link',
  'owner',
]

@Component({
  selector: 'md-editor-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    UiSearchModule,
    UiElementsModule,
    TranslateModule,
  ],
})
export class RecordsListComponent {
  @Input() title: string
  @Input() linkToDatahub?: string

  constructor(
    private router: Router,
    public searchFacade: SearchFacade,
    public searchService: SearchService
  ) {
    this.searchFacade.setPageSize(15).setConfigRequestFields(includes)
  }

  paginate(page: number) {
    this.searchService.setPage(page)
  }
  createRecord() {
    this.router.navigate(['/create'])
  }

  editRecord(record: CatalogRecord) {
    this.router.navigate(['/edit', record.uniqueIdentifier])
  }

  setSortBy(newSortBy: SortByField) {
    this.searchService.setSortBy(newSortBy)
  }
}
