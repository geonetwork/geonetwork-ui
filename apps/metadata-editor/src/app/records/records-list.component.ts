import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import {
  ResultsTableContainerComponent,
  SearchFacade,
  SearchService,
} from '@geonetwork-ui/feature/search'
import { Paginable, PaginationButtonsComponent } from '@geonetwork-ui/ui/layout'

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
  'resourceType',
  'mainLanguage',
  'otherLanguage',
  'isHarvested',
]
@Component({
  selector: 'md-editor-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ResultsTableContainerComponent,
    PaginationButtonsComponent,
  ],
})
export class RecordsListComponent implements OnInit, Paginable {
  constructor(
    private router: Router,
    public searchFacade: SearchFacade,
    private searchService: SearchService
  ) {}

  isDuplicating = false

  ngOnInit(): void {
    this.searchFacade.setConfigRequestFields(allSearchFields)
    this.searchFacade.setPageSize(15)

    this.searchFacade.currentPage$.subscribe((page) => {
      this.currentPage_ = page
    })
    this.searchFacade.totalPages$.subscribe((total) => {
      this.totalPages_ = total
    })
  }

  editRecord(record: CatalogRecord) {
    this.router.navigate(['/edit', record.uniqueIdentifier])
  }

  duplicateRecord(record: CatalogRecord) {
    this.isDuplicating = true
    this.router.navigate(['/duplicate', record.uniqueIdentifier])
  }

  // these are 0 based
  totalPages_: number
  currentPage_: number

  // Paginable API
  get isFirstPage() {
    return this.currentPage_ === 1
  }
  get isLastPage() {
    return this.currentPage_ === this.totalPages_
  }
  get pagesCount() {
    return this.totalPages_
  }
  get currentPage() {
    return this.currentPage_
  }
  goToPage(page: number) {
    this.searchService.setPage(page)
  }
  goToNextPage() {
    this.searchService.setPage(this.currentPage_ + 1)
  }
  goToPrevPage() {
    this.searchService.setPage(this.currentPage_ - 1)
  }
}
