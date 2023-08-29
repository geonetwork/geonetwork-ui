import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  AuthService,
  AvatarServiceInterface,
} from '@geonetwork-ui/feature/auth'

@Component({
  selector: 'md-editor-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchHeaderComponent {
  public placeholder = this.avatarService.placeholder

  constructor(
    public authService: AuthService,
    private avatarService: AvatarServiceInterface
  ) {}
}
