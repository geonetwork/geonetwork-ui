import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { matLocationSearchingOutline } from '@ng-icons/material-icons/outline'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { BadgeComponent } from '@geonetwork-ui/ui/inputs'
import { LinkClassifierService, LinkUsage } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-geo-data-badge',
  templateUrl: './geo-data-badge.component.html',
  styleUrls: ['./geo-data-badge.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BadgeComponent, CommonModule, NgIcon, TranslateModule],
  viewProviders: [
    provideIcons({
      matLocationSearchingOutline,
    }),
  ],
})
export class GeoDataBadgeComponent {
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

  constructor(public linkClassifier: LinkClassifierService) {}
}
