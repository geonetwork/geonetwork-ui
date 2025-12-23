import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record/index.js'
import { CommonModule } from '@angular/common'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { matOpenInNew } from '@ng-icons/material-icons/baseline'
import { iconoirDatabase } from '@ng-icons/iconoir'
import { getBadgeColor, getFileFormat } from '@geonetwork-ui/util/shared'
import { TranslatePipe } from '@ngx-translate/core'

type CardSize = 'L' | 'M' | 'S' | 'XS'
@Component({
  selector: 'gn-ui-external-link-card',
  templateUrl: './external-link-card.component.html',
  styleUrls: ['./external-link-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NgIconComponent, TranslatePipe],
  providers: [
    provideIcons({
      matOpenInNew,
      iconoirDatabase,
    }),
    provideNgIconsConfig({ size: '1.5em' }),
  ],
})
export class ExternalLinkCardComponent {
  private _size: CardSize
  @Input() link: DatasetOnlineResource
  private readonly sizeClassMap: Record<CardSize, string> = {
    L: 'gn-ui-card-l py-2 px-5',
    M: 'gn-ui-card-m py-2 px-5',
    S: 'gn-ui-card-s p-4',
    XS: 'gn-ui-card-xs py-2 px-5',
  }

  @Input() set size(value: CardSize) {
    this._size = value
    this.cardClass = `group flex flex-row justify-between card-shadow rounded overflow-hidden ${this.sizeClassMap[value]}`
  }
  get size(): CardSize {
    return this._size
  }
  cardClass = ''

  get title() {
    if (this.link.name && this.link.description) {
      return `${this.link.name} | ${this.link.description}`
    }
    return this.link.name || this.link.description || ''
  }

  get isDatabase(): boolean {
    return (
      this.link.type === 'service' &&
      this.link.accessServiceProtocol === 'postgis'
    )
  }

  getLinkFormat(link: DatasetOnlineResource): string {
    return getFileFormat(link)
  }

  getLinkColor(link: DatasetOnlineResource): string {
    return getBadgeColor(getFileFormat(link))
  }
}
