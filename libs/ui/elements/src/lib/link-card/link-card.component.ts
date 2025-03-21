import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import {
  DatasetDownloadDistribution,
  DatasetOnlineResource,
  DatasetServiceDistribution,
} from '@geonetwork-ui/common/domain/model/record'
import { CommonModule } from '@angular/common'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { matOpenInNew } from '@ng-icons/material-icons/baseline'
import { getBadgeColor, getFileFormat } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'

type CardSize = 'L' | 'M' | 'S' | 'XS'
@Component({
  selector: 'gn-ui-link-card',
  templateUrl: './link-card.component.html',
  styleUrls: ['./link-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NgIconComponent, TranslateModule],
  providers: [
    provideIcons({
      matOpenInNew,
    }),
    provideNgIconsConfig({ size: '1.5em' }),
  ],
})
export class LinkCardComponent {
  private _size: 'L' | 'M' | 'S' | 'XS'
  @Input() link: DatasetOnlineResource
  private readonly sizeClassMap: Record<CardSize, string> = {
    L: 'gn-ui-card-l py-2 px-5',
    M: 'gn-ui-card-m py-2 px-5',
    S: 'gn-ui-card-s p-4',
    XS: 'gn-ui-card-xs py-2 px-5',
  }

  @Input() set size(value: CardSize) {
    this._size = value
    this.cardClass = this.sizeClassMap[value]
  }
  get size(): 'L' | 'M' | 'S' | 'XS' {
    return this._size
  }
  cardClass = ''

  get title() {
    if (this.link.name && this.link.description) {
      return `${this.link.name} | ${this.link.description}`
    }
    return this.link.name || this.link.description || ''
  }

  getLinkFormat(link: any) {
    return getFileFormat(link)
  }

  getLinkColor(link: any) {
    return getBadgeColor(getFileFormat(link))
  }
}
