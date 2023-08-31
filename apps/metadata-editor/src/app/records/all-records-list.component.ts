import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { DashboardSearchService } from '../dashboard/dashboard-search.service'
@Component({
  selector: 'md-editor-all-records-list',
  templateUrl: './all-records-list.component.html',
  styleUrls: ['./all-records-list.component.css'],
})
export class AllRecordsComponent {
  constructor(
    private router: Router,
    public searchFacade: SearchFacade,
    private dashSearchService: DashboardSearchService
  ) {}

  paginate(page: number) {
    this.dashSearchService.paginate(page)
  }
  createRecord() {
    this.router.navigate(['/create'])
  }
  editRecord(record: CatalogRecord) {
    this.router.navigate(['/edit', record.uniqueIdentifier])
  }
}
