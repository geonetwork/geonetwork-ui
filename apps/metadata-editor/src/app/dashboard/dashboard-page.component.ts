import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { DashboardSearchService } from './dashboard-search.service'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'
import { SidebarComponent } from './sidebar/sidebar.component'
import { SearchHeaderComponent } from './search-header/search-header.component'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'md-editor-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchFacade, SearchService, DashboardSearchService],
  imports: [
    SidebarComponent,
    SearchHeaderComponent,
    RouterOutlet,
    MatIconModule,
    CommonModule,
  ],
  standalone: true,
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
