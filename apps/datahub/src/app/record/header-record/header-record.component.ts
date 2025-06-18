import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { getGlobalConfig, getThemeConfig } from '@geonetwork-ui/util/app-config'
import {
  DatasetRecord,
  ReuseRecord,
  ServiceRecord,
} from '@geonetwork-ui/common/domain/model/record'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { map } from 'rxjs'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matArrowBack, matCreditCard } from '@ng-icons/material-icons/baseline'
import { DateService } from '@geonetwork-ui/util/shared'
import {
  iconoirAppleShortcuts,
  iconoirCode,
  iconoirOpenNewWindow,
} from '@ng-icons/iconoir'
import {
  GeoDataBadgeComponent,
  ImageOverlayPreviewComponent,
  KindBadgeComponent,
} from '@geonetwork-ui/ui/elements'
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import {
  FavoriteStarComponent,
  SearchService,
} from '@geonetwork-ui/feature/search'
import { LanguageSwitcherComponent } from '@geonetwork-ui/ui/catalog'

@Component({
  selector: 'datahub-header-record',
  templateUrl: './header-record.component.html',
  styleUrls: ['./header-record.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TranslateDirective,
    TranslatePipe,
    NgIcon,
    ImageOverlayPreviewComponent,
    GeoDataBadgeComponent,
    KindBadgeComponent,
    NavigationBarComponent,
    ButtonComponent,
    FavoriteStarComponent,
    LanguageSwitcherComponent,
  ],
  viewProviders: [
    provideIcons({
      matArrowBack,
      iconoirCode,
      matCreditCard,
      iconoirAppleShortcuts,
      iconoirOpenNewWindow,
    }),
  ],
})
export class HeaderRecordComponent {
  @Input() metadata: DatasetRecord | ServiceRecord | ReuseRecord
  @Input() expandRatio: number
  backgroundCss =
    getThemeConfig().HEADER_BACKGROUND ||
    `center /cover url('assets/img/header_bg.webp')`
  foregroundColor = getThemeConfig().HEADER_FOREGROUND_COLOR || '#ffffff'
  showLanguageSwitcher = getGlobalConfig().LANGUAGES?.length > 0

  showOverlay = true

  constructor(
    public facade: MdViewFacade,
    private dateService: DateService,
    private searchService: SearchService
  ) {}

  get thumbnailUrl() {
    if (this.metadata?.overviews === undefined) {
      return undefined
    } else {
      return this.metadata?.overviews?.[0]?.url ?? null
    }
  }

  reuseLinkUrl$ = this.facade.otherLinks$.pipe(
    map((links) => {
      return links.length ? links[0].url : null
    })
  )

  get lastUpdate() {
    return this.dateService.formatDate(this.metadata.recordUpdated)
  }

  back() {
    this.searchService.updateFilters({})
  }
}
