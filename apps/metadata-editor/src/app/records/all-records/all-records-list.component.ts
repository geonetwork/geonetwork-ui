import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
import { DashboardSearchService } from '../../dashboard/dashboard-search.service'

@Component({
  selector: 'md-editor-all-records-list',
  templateUrl: './all-records-list.component.html',
  styleUrls: ['./all-records-list.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule, UiSearchModule],
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
