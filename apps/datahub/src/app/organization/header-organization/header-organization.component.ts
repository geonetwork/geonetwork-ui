import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { SearchService } from '@geonetwork-ui/feature/search'
import { getGlobalConfig, getThemeConfig } from '@geonetwork-ui/util/app-config'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { UiCatalogModule } from '@geonetwork-ui/ui/catalog'
import { Organization } from '@geonetwork-ui/common/domain/model/record'
import { AsyncPipe, NgIf } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'datahub-header-organization',
  templateUrl: './header-organization.component.html',
  styleUrls: ['./header-organization.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    UiInputsModule,
    TranslateModule,
    UiCatalogModule,
    NgIf,
    MatIconModule,
    AsyncPipe,
  ],
})
export class HeaderOrganizationComponent {
  @Input() organization: Organization

  backgroundCss =
    getThemeConfig().HEADER_BACKGROUND ||
    `center /cover url('assets/img/header_bg.webp')`
  foregroundColor = getThemeConfig().HEADER_FOREGROUND_COLOR || '#ffffff'
  showLanguageSwitcher = getGlobalConfig().LANGUAGES?.length > 0

  constructor(
    private searchService: SearchService,
    public facade: MdViewFacade,
    private translateService: TranslateService
  ) {}

  back() {
    this.searchService.updateFilters({})
  }
}
