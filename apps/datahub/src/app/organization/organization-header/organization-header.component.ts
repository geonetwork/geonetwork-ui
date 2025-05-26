import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { getGlobalConfig, getThemeConfig } from '@geonetwork-ui/util/app-config'
import { TranslateDirective } from '@ngx-translate/core'
import { Organization } from '@geonetwork-ui/common/domain/model/record'
import { CommonModule, Location } from '@angular/common'
import { ErrorType } from '@geonetwork-ui/ui/elements'
import { Router } from '@angular/router'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import {
  matFolderOutline,
  matOpenInNewOutline,
} from '@ng-icons/material-icons/outline'
import { LanguageSwitcherComponent } from '@geonetwork-ui/ui/catalog'
import { matArrowBack } from '@ng-icons/material-icons/baseline'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'

@Component({
  selector: 'datahub-organization-header',
  templateUrl: './organization-header.component.html',
  styleUrls: ['./organization-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TranslateDirective,
    CommonModule,
    NgIconComponent,
    LanguageSwitcherComponent,
    ButtonComponent,
  ],
  providers: [
    provideIcons({ matFolderOutline, matOpenInNewOutline, matArrowBack }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class OrganizationHeaderComponent {
  @Input() organization?: Organization

  backgroundCss =
    getThemeConfig().HEADER_BACKGROUND ||
    `center /cover url('assets/img/header_bg.webp')`
  foregroundColor = getThemeConfig().HEADER_FOREGROUND_COLOR || '#ffffff'
  showLanguageSwitcher = getGlobalConfig().LANGUAGES?.length > 0

  constructor(
    private location: Location,
    private router: Router
  ) {}

  back() {
    this.organization
      ? this.location.back()
      : this.router.navigateByUrl('/organisations')
  }

  protected readonly errorTypes = ErrorType
}
