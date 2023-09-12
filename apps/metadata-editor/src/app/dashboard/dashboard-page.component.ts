import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { SidebarComponent } from './sidebar/sidebar.component'
import { SearchHeaderComponent } from './search-header/search-header.component'
import { SearchService } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'md-editor-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, SidebarComponent, SearchHeaderComponent],
  standalone: true,
})
export class DashboardPageComponent implements OnInit {
  constructor(public searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.setSortBy(['desc', 'changeDate'])
  }
}
