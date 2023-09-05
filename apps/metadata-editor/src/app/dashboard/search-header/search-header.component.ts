import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import {
  AuthService,
  AvatarServiceInterface,
} from '@geonetwork-ui/feature/auth'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { LetModule } from '@ngrx/component'

@Component({
  selector: 'md-editor-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FeatureSearchModule, MatIconModule, CommonModule, LetModule],
})
export class SearchHeaderComponent {
  public placeholder = this.avatarService.placeholder

  constructor(
    public authService: AuthService,
    private avatarService: AvatarServiceInterface
  ) {}
}
