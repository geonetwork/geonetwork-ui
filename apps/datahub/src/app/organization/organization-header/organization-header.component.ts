import { Location } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core'
import { Router } from '@angular/router'
import { Organization } from '@geonetwork-ui/common/domain/model/record/index.js'
import { LanguageSwitcherComponent } from '@geonetwork-ui/ui/catalog'
import { ErrorType } from '@geonetwork-ui/ui/elements'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { getGlobalConfig, getThemeConfig } from '@geonetwork-ui/util/app-config'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { matArrowBack } from '@ng-icons/material-icons/baseline'
import {
  matFolderOutline,
  matOpenInNewOutline,
} from '@ng-icons/material-icons/outline'
import { TranslateDirective } from '@ngx-translate/core'

@Component({
  selector: 'datahub-organization-header',
  templateUrl: './organization-header.component.html',
  styleUrls: ['./organization-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TranslateDirective,
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
  private router = inject(Router)
  private location = inject(Location)

  @Input() organization?: Organization

  backgroundCss =
    getThemeConfig().HEADER_BACKGROUND ||
    `center /cover url('assets/img/header_bg.webp')`
  foregroundColor = getThemeConfig().HEADER_FOREGROUND_COLOR || '#ffffff'
  showLanguageSwitcher = getGlobalConfig().LANGUAGES?.length > 0

  back() {
    this.router.lastSuccessfulNavigation.previousNavigation
      ? this.location.back()
      : this.router.navigateByUrl('/organisations')
  }

  protected readonly errorTypes = ErrorType
}
