import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import {
  FavoriteStarComponent,
  SearchService,
} from '@geonetwork-ui/feature/search'
import { getGlobalConfig, getThemeConfig } from '@geonetwork-ui/util/app-config'
import {
  DatasetRecord,
  ReuseRecord,
  ServiceRecord,
} from '@geonetwork-ui/common/domain/model/record'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { combineLatest, map } from 'rxjs'
import { TranslateModule } from '@ngx-translate/core'
import { BadgeComponent } from '@geonetwork-ui/ui/inputs'
import { LanguageSwitcherComponent } from '@geonetwork-ui/ui/catalog'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matLocationSearchingOutline } from '@ng-icons/material-icons/outline'
import { matArrowBack, matCreditCard } from '@ng-icons/material-icons/baseline'
import { DateService } from '@geonetwork-ui/util/shared'
import { iconoirAppleShortcuts, iconoirCode } from '@ng-icons/iconoir'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('record.kind.dataset')
marker('record.kind.reuse')
marker('record.kind.service')

@Component({
  selector: 'datahub-header-record',
  templateUrl: './header-record.component.html',
  styleUrls: ['./header-record.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    LanguageSwitcherComponent,
    TranslateModule,
    FavoriteStarComponent,
    BadgeComponent,
    NgIcon,
  ],
  viewProviders: [
    provideIcons({
      matLocationSearchingOutline,
      matArrowBack,
      iconoirCode,
      matCreditCard,
      iconoirAppleShortcuts,
    }),
  ],
})
export class HeaderRecordComponent {
  @Input() metadata: DatasetRecord | ServiceRecord | ReuseRecord
  backgroundCss =
    getThemeConfig().HEADER_BACKGROUND ||
    `center /cover url('assets/img/header_bg.webp')`
  foregroundColor = getThemeConfig().HEADER_FOREGROUND_COLOR || '#ffffff'

  constructor(
    public facade: MdViewFacade,
    private dateService: DateService,
    private searchService: SearchService
  ) {}

  isGeodata$ = combineLatest([
    this.facade.mapApiLinks$,
    this.facade.geoDataLinks$,
  ]).pipe(
    map(
      ([mapLinks, geoDataLinks]) =>
        mapLinks?.length > 0 || geoDataLinks?.length > 0
    )
  )

  get lastUpdate() {
    return this.dateService.formatDate(this.metadata.recordUpdated)
  }

  back() {
    this.searchService.updateFilters({})
  }

  getBadge() {
    switch (this.metadata.kind) {
      default:
      case 'dataset':
        return {
          text: 'record.kind.dataset',
          icon: 'iconoirAppleShortcuts',
        }
      case 'reuse':
        return {
          text: 'record.kind.reuse',
          icon: 'matCreditCard',
        }
      case 'service':
        return {
          text: 'record.kind.service',
          icon: 'iconoirCode',
        }
    }
  }
}
