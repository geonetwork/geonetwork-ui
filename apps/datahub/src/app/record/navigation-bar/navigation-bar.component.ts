import { CommonModule } from '@angular/common'
import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'
import {
  FavoriteStarComponent,
  SearchService,
} from '@geonetwork-ui/feature/search'
import { LanguageSwitcherComponent } from '@geonetwork-ui/ui/catalog'
import { NavigationButtonComponent } from '@geonetwork-ui/ui/inputs'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { getGlobalConfig } from '@geonetwork-ui/util/app-config'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matExpandMoreOutline } from '@ng-icons/material-icons/outline'
import { TranslateModule } from '@ngx-translate/core'

marker('record.metadata.about')
marker('record.metadata.capabilities')
marker('record.metadata.preview')
marker('record.metadata.links')
marker('record.metadata.relatedContent')
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
    NavigationButtonComponent,
    LanguageSwitcherComponent,
    FavoriteStarComponent,
  ],
  viewProviders: [provideIcons({ matExpandMoreOutline })],
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
      anchor: 'preview',
      label: 'record.metadata.preview',
    },
    {
      anchor: 'links',
      label: 'record.metadata.links',
    },
    {
      anchor: 'related-records',
      label: 'record.metadata.relatedContent',
    },
    {
      anchor: 'userFeedbacks',
      label: 'record.metadata.userFeedbacks',
    },
  ]
  activeLabel = this.anchorLinks[0].label
  showLanguageSwitcher = getGlobalConfig().LANGUAGES?.length > 0
  black = '#000000'

  constructor(private searchService: SearchService) {}

  setActiveLabel(el: HTMLElement) {
    const disabledClass = el.getAttribute('gnUiAnchorLinkDisabledClass')
    const disabled = new RegExp(disabledClass).test(el.className)
    if (!disabled) this.activeLabel = el.textContent
  }
  toggleMobileMenu() {
    this.displayMobileMenu = !this.displayMobileMenu
  }
  back() {
    this.searchService.updateFilters({})
  }
}
