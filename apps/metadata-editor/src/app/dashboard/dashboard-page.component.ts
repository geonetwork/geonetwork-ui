import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Router } from '@angular/router'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { DashboardSearchService } from './dashboard-search.service'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'

@Component({
  selector: 'md-editor-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchFacade, SearchService, DashboardSearchService],
})
export class DashboardPageComponent {
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
