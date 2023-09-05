import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
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
