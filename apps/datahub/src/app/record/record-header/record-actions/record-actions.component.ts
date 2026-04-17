import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { FavoriteStarComponent } from '@geonetwork-ui/feature/search'
import { LanguageSwitcherComponent } from '@geonetwork-ui/ui/catalog'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { getGlobalConfig } from '@geonetwork-ui/util/app-config'
import { getIsMobile } from '@geonetwork-ui/util/shared'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import { matEditNote } from '@ng-icons/material-icons/baseline'
import { TranslateModule } from '@ngx-translate/core'
import { RecordHeaderService } from '../record-header.service'

@Component({
  selector: 'datahub-record-actions',
  templateUrl: './record-actions.component.html',
  styleUrls: ['./record-actions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    TranslateModule,
    ButtonComponent,
    FavoriteStarComponent,
    LanguageSwitcherComponent,
  ],
  viewProviders: [
    provideIcons({ matEditNote }),
    provideNgIconsConfig({ size: '1.5em' }),
  ],
})
export class RecordActionsComponent {
  private platformServiceInterface = inject(PlatformServiceInterface)
  private headerService = inject(RecordHeaderService)

  @Input() metadata: CatalogRecord
  @Input() color = 'currentColor'
  @Input() showLabel = true

  isMobile$ = getIsMobile()

  showLanguageSwitcher = getGlobalConfig().LANGUAGES?.length > 0

  get isAuthDisabled(): boolean {
    return !this.platformServiceInterface.supportsAuthentication()
  }

  canEdit$ = this.headerService.canEditFromUrl$

  openEdit(): void {
    this.headerService.openEditUrl()
  }
}
