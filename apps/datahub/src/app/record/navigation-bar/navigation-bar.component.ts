import { CommonModule } from '@angular/common'
import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'
import {
  FavoriteStarComponent,
  SearchService,
} from '@geonetwork-ui/feature/search'
import { LanguageSwitcherComponent } from '@geonetwork-ui/ui/catalog'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { getGlobalConfig } from '@geonetwork-ui/util/app-config'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { iconoirMenu } from '@ng-icons/iconoir'
import { matArrowBack } from '@ng-icons/material-icons/baseline'
import { TranslateModule } from '@ngx-translate/core'

marker('record.metadata.about')
marker('record.metadata.capabilities')
marker('record.metadata.preview')
marker('record.metadata.ressources.and.links')
marker('record.metadata.related.contents')
marker('record.metadata.userFeedbacks')

@Component({
  selector: 'datahub-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIcon,
    CommonModule,
    TranslateModule,
    UiLayoutModule,
    ButtonComponent,
    LanguageSwitcherComponent,
    FavoriteStarComponent,
  ],
  viewProviders: [provideIcons({ iconoirMenu, matArrowBack })],
})
export class NavigationBarComponent {
  @Input() metadata: DatasetRecord
  displayMobileMenu = false
  anchorLinks = [
    {
      anchor: 'about',
      label: 'record.metadata.about',
    },
    {
      anchor: 'capabilities',
      label: 'record.metadata.capabilities',
    },
    {
      anchor: 'data-preview',
      label: 'record.metadata.preview',
    },
    {
      anchor: 'resources',
      label: 'record.metadata.ressources.and.links',
    },
    {
      anchor: 'related',
      label: 'record.metadata.related.contents',
    },
    {
      anchor: 'user-feedbacks',
      label: 'record.metadata.userFeedbacks',
    },
  ]
  showLanguageSwitcher = getGlobalConfig().LANGUAGES?.length > 0

  constructor(private searchService: SearchService) {}

  toggleMobileMenu() {
    this.displayMobileMenu = !this.displayMobileMenu
  }
  back() {
    this.searchService.updateFilters({})
  }
}
