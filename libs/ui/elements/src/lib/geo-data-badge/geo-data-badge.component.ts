import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { matLocationSearchingOutline } from '@ng-icons/material-icons/outline'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { LinkClassifierService, LinkUsage } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-geo-data-badge',
  templateUrl: './geo-data-badge.component.html',
  styleUrls: ['./geo-data-badge.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NgIcon, TranslateModule],
  viewProviders: [
    provideIcons({
      matLocationSearchingOutline,
    }),
  ],
})
export class GeoDataBadgeComponent {
  @Input() showLabel = true
  @Input() styling = 'default'
  @Input() record: CatalogRecord

  isGeodata() {
    const links =
      'onlineResources' in this.record ? this.record.onlineResources : []
    const hasMapApi = links.some((link) =>
      this.linkClassifier.hasUsage(link, LinkUsage.MAP_API)
    )
    const hasGeoData = links.some((link) =>
      this.linkClassifier.hasUsage(link, LinkUsage.GEODATA)
    )
    return hasMapApi || hasGeoData
  }

  get badgeClasses(): string {
    const baseClasses =
      'badge-btn text-xs px-2 shrink-0 flex items-center justify-evenly h-6 min-h-6'

    switch (this.styling) {
      case 'light':
        return `${baseClasses} bg-primary-white text-primary-darkest`
      case 'default':
        return `${baseClasses} bg-primary-darker text-white`
      default:
        return ''
    }
  }

  constructor(public linkClassifier: LinkClassifierService) {}
}
