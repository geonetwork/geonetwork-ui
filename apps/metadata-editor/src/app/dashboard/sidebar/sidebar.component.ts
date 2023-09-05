import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { DashboardMenuComponent } from '../dashboard-menu/dashboard-menu.component'

@Component({
  selector: 'md-editor-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DashboardMenuComponent, CommonModule, TranslateModule],
})
export class SidebarComponent {}
