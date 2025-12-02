import { CommonModule, Location } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core'
import { Router } from '@angular/router'
import {
  DatasetRecord,
  ReuseRecord,
  ServiceRecord,
} from '@geonetwork-ui/common/domain/model/record'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { FavoriteStarComponent } from '@geonetwork-ui/feature/search'
import { LanguageSwitcherComponent } from '@geonetwork-ui/ui/catalog'
import {
  GeoDataBadgeComponent,
  ImageOverlayPreviewComponent,
  KindBadgeComponent,
} from '@geonetwork-ui/ui/elements'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { StickyHeaderComponent } from '@geonetwork-ui/ui/layout'
import { getGlobalConfig, getThemeConfig } from '@geonetwork-ui/util/app-config'
import { getIsMobile } from '@geonetwork-ui/util/shared'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import {
  iconoirAppleShortcuts,
  iconoirCode,
  iconoirOpenNewWindow,
} from '@ng-icons/iconoir'
import { matArrowBack, matCreditCard } from '@ng-icons/material-icons/baseline'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { combineLatest, map } from 'rxjs'
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { GnUiHumanizeDateDirective } from '@geonetwork-ui/util/shared'

export const HEADER_HEIGHT_DEFAULT = 344
export const HEADER_HEIGHT_MOBILE_THUMBNAIL = 554

marker('record.metadata.resourceUpdated')
marker('record.metadata.resourcePublished')
marker('record.metadata.resourceCreated')

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
    StickyHeaderComponent,
    GnUiHumanizeDateDirective,
  ],
  viewProviders: [
    provideIcons({
      matArrowBack,
      iconoirCode,
      matCreditCard,
      iconoirAppleShortcuts,
      iconoirOpenNewWindow,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class HeaderRecordComponent {
  facade = inject(MdViewFacade)
  private router = inject(Router)
  private location = inject(Location)
  private platformServiceInterface = inject(PlatformServiceInterface)

  @Input() metadata: DatasetRecord | ServiceRecord | ReuseRecord
  backgroundCss =
    getThemeConfig().HEADER_BACKGROUND ||
    `center /cover url('assets/img/header_bg.webp')`
  foregroundColor = getThemeConfig().HEADER_FOREGROUND_COLOR || '#ffffff'
  showLanguageSwitcher = getGlobalConfig().LANGUAGES?.length > 0

  showOverlay = true

  get isAuthDisabled(): boolean {
    return !this.platformServiceInterface.supportsAuthentication()
  }

  isMobile$ = getIsMobile()

  thumbnailUrl$ = this.facade.metadata$.pipe(
    map((metadata) => {
      if (metadata?.overviews === undefined) {
        return undefined
      } else {
        return metadata?.overviews?.[0]?.url.toString() ?? null
      }
    })
  )

  fullHeaderHeight$ = combineLatest([this.isMobile$, this.thumbnailUrl$]).pipe(
    map(([isMobile, thumbnailUrl]) =>
      isMobile && thumbnailUrl
        ? HEADER_HEIGHT_MOBILE_THUMBNAIL
        : HEADER_HEIGHT_DEFAULT
    )
  )

  reuseLinkUrl$ = this.facade.allLinks$.pipe(
    map((links) => {
      return links.length ? links[0].url : null
    })
  )

  get resourceDate(): { date: string; tooltip: string; label: string } | null {
    let dateToDisplay = null
    if (this.metadata.resourceUpdated) {
      dateToDisplay = {
        date: this.metadata.resourceUpdated,
        label: 'record.metadata.resourceUpdated',
      }
    } else if (this.metadata.resourcePublished) {
      dateToDisplay = {
        date: this.metadata.resourcePublished,
        label: 'record.metadata.resourcePublished',
      }
    } else if (this.metadata.resourceCreated) {
      dateToDisplay = {
        date: this.metadata.resourceCreated,
        label: 'record.metadata.resourceCreated',
      }
    }
    return dateToDisplay
  }

  back() {
    this.router.lastSuccessfulNavigation.previousNavigation
      ? this.location.back()
      : this.router.navigateByUrl('/search')
  }
}
