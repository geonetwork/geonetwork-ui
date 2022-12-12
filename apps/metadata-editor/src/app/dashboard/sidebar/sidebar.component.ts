import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AuthService } from '@geonetwork-ui/feature/auth'

@Component({
  selector: 'md-editor-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  constructor(public authService: AuthService) {}
}
