import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { iconoirDownload } from '@ng-icons/iconoir'

type CardSize = 'L' | 'M' | 'S' | 'XS'

@Component({
  selector: 'gn-ui-download-item',
  templateUrl: './download-item.component.html',
  styleUrls: ['./download-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateDirective, TranslatePipe, NgIcon],
  standalone: true,
  viewProviders: [
    provideIcons({
      iconoirDownload,
    }),
  ],
})
export class DownloadItemComponent {
  private _size: CardSize
  @Input() link: DatasetOnlineResource
  @Input() color: string
  @Input() format: string
  @Input() isFromApi: boolean
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
  get size(): CardSize {
    return this._size
  }
  cardClass = ''
  @Output() exportUrl = new EventEmitter<string>()

  openUrl() {
    this.exportUrl.emit(this.link.url.toString())
  }
}
