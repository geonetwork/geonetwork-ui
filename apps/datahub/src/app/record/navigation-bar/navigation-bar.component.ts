import { CommonModule } from '@angular/common'
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
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
  imports: [NgIcon, CommonModule, TranslateModule, UiLayoutModule],
  viewProviders: [provideIcons({ matExpandMoreOutline })],
})
export class NavigationBarComponent {
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
  setActiveLabel(el: HTMLElement) {
    const disabledClass = el.getAttribute('gnUiAnchorLinkDisabledClass')
    const disabled = new RegExp(disabledClass).test(el.className)
    if (!disabled) this.activeLabel = el.textContent
  }
  toggleMobileMenu() {
    this.displayMobileMenu = !this.displayMobileMenu
  }
}
