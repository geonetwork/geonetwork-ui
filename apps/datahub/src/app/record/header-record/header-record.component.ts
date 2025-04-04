import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'
import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { combineLatest, map } from 'rxjs'
import { TranslateModule } from '@ngx-translate/core'
import { BadgeComponent } from '@geonetwork-ui/ui/inputs'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matLocationSearchingOutline } from '@ng-icons/material-icons/outline'
import { DateService } from '@geonetwork-ui/util/shared'
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component'

@Component({
  selector: 'datahub-header-record',
  templateUrl: './header-record.component.html',
  styleUrls: ['./header-record.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    BadgeComponent,
    NgIcon,
    NavigationBarComponent,
  ],
  viewProviders: [provideIcons({ matLocationSearchingOutline })],
})
export class HeaderRecordComponent {
  @Input() metadata: DatasetRecord
  backgroundCss =
    getThemeConfig().HEADER_BACKGROUND ||
    `center /cover url('assets/img/header_bg.webp')`
  foregroundColor = getThemeConfig().HEADER_FOREGROUND_COLOR || '#ffffff'

  constructor(
    public facade: MdViewFacade,
    private dateService: DateService
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
}
