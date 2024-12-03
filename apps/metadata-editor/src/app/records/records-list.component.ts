import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import {
  ResultsTableContainerComponent,
  SearchFacade,
  SearchService,
} from '@geonetwork-ui/feature/search'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
import {
  PaginationButtonsComponent,
  UiElementsModule,
} from '@geonetwork-ui/ui/elements'
import { TranslateModule } from '@ngx-translate/core'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'

export const allSearchFields = [
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
    UiSearchModule,
    UiElementsModule,
    TranslateModule,
    ResultsTableContainerComponent,
    UiInputsModule,
    PaginationButtonsComponent,
  ],
})
export class RecordsListComponent implements OnInit {
  constructor(
    private router: Router,
    public searchFacade: SearchFacade,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.searchFacade.setConfigRequestFields(allSearchFields)
    this.searchFacade.setPageSize(15)
  }

  paginate(page: number) {
    this.searchService.setPage(page)
  }

  editRecord(record: CatalogRecord) {
    this.router.navigate(['/edit', record.uniqueIdentifier])
  }

  duplicateRecord(record: CatalogRecord) {
    this.router.navigate(['/duplicate', record.uniqueIdentifier])
  }
}
