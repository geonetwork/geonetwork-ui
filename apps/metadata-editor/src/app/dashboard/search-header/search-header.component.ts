import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { LetDirective } from '@ngrx/component'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import {
  AuthService,
  AvatarServiceInterface,
} from '@geonetwork-ui/api/repository/gn4'

@Component({
  selector: 'md-editor-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FeatureSearchModule,
    MatIconModule,
    CommonModule,
    LetDirective,
    UiElementsModule,
  ],
})
export class SearchHeaderComponent {
  public placeholder = this.avatarService.placeholder

  constructor(
    public authService: AuthService,
    private avatarService: AvatarServiceInterface
  ) {}
}
