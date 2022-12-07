import { ChangeDetectionStrategy, Component } from '@angular/core'
import { UserModel } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'md-editor-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  user: UserModel = {
    id: '21737',
    profile: 'Administrator',
    username: 'C2C-gravin',
    name: 'Florent',
    surname: 'Gravin',
    email: 'florent.gravin@camptocamp.com',
    organisation: null,
    admin: true,
  }
}
