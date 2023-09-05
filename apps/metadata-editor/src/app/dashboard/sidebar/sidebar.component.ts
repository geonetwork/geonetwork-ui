import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DashboardMenuComponent } from '../dashboard-menu/dashboard-menu.component'

@Component({
  selector: 'md-editor-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DashboardMenuComponent, CommonModule],
})
export class SidebarComponent {}
