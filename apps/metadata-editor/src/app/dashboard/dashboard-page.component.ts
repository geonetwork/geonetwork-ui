import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { RouterOutlet } from '@angular/router'
import { SidebarComponent } from './sidebar/sidebar.component'
import { SearchHeaderComponent } from './search-header/search-header.component'

@Component({
  selector: 'md-editor-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchService],
  imports: [RouterOutlet, SidebarComponent, SearchHeaderComponent],
  standalone: true,
})
export class DashboardPageComponent {
  constructor(public searchFacade: SearchFacade) {}
}
