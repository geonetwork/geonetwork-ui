import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { LetDirective } from '@ngrx/component'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { AvatarServiceInterface } from '@geonetwork-ui/api/repository'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { TranslateModule } from '@ngx-translate/core'

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
    TranslateModule,
  ],
})
export class SearchHeaderComponent {
  public placeholder$ = this.avatarService.getPlaceholder()
  activeBtn = false

  constructor(
    public platformService: PlatformServiceInterface,
    private avatarService: AvatarServiceInterface
  ) {}
}
