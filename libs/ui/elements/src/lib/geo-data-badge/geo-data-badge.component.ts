import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core'
import { matLocationSearchingOutline } from '@ng-icons/material-icons/outline'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record/index.js'
import { CommonModule } from '@angular/common'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import {
  getIsMobile,
  LinkClassifierService,
  LinkUsage,
} from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-geo-data-badge',
  templateUrl: './geo-data-badge.component.html',
  styleUrls: ['./geo-data-badge.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NgIcon, TranslateDirective, TranslatePipe],
  viewProviders: [
    provideIcons({
      matLocationSearchingOutline,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class GeoDataBadgeComponent {
  linkClassifier = inject(LinkClassifierService)

  @Input() showLabel = true
  @Input() styling = 'default'
  @Input() record: CatalogRecord

  isMobile$ = getIsMobile()

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
      'flex shrink-0 items-center badge-btn badge-btn text-xs px-2 h-6 min-h-6'

    switch (this.styling) {
      case 'light':
        return `${baseClasses} bg-primary-white text-primary-darkest`
      case 'default':
        return `${baseClasses} bg-primary-darker text-white`
      default:
        return 'flex shrink-0 items-center'
    }
  }
}
