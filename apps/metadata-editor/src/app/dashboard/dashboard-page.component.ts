import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { SidebarComponent } from './sidebar/sidebar.component'
import { SearchHeaderComponent } from './search-header/search-header.component'
import { NotificationsContainerComponent } from '@geonetwork-ui/feature/notifications'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'md-editor-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    SidebarComponent,
    SearchHeaderComponent,
    NotificationsContainerComponent,
    CommonModule,
  ],
  standalone: true,
})
export class DashboardPageComponent {
  searchActive = false

  handleSearchActive(event: boolean) {
    this.searchActive = event
  }
}
