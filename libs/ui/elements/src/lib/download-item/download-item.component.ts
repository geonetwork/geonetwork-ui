import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'
import { TranslateModule } from '@ngx-translate/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { iconoirDownload } from '@ng-icons/iconoir'

@Component({
  selector: 'gn-ui-download-item',
  templateUrl: './download-item.component.html',
  styleUrls: ['./download-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, NgIcon],
  standalone: true,
  viewProviders: [
    provideIcons({
      iconoirDownload,
    }),
  ],
})
export class DownloadItemComponent {
  private _size: 'L' | 'M' | 'S' | 'XS'
  @Input() link: DatasetOnlineResource
  @Input() color: string
  @Input() format: string
  @Input() isFromApi: boolean
  @Input() set size(value: 'L' | 'M' | 'S' | 'XS') {
    this._size = value
    switch (value) {
      case 'L':
        this.cardClass = 'gn-ui-card-l py-2 px-5'
        break
      case 'M':
        this.cardClass = 'gn-ui-card-m py-2 px-5'
        break
      case 'S':
        this.cardClass = 'gn-ui-card-s p-4'
        break
      case 'XS':
        this.cardClass = 'gn-ui-card-xs py-2 px-5'
        break
    }
  }
  get size(): 'L' | 'M' | 'S' | 'XS' {
    return this._size
  }
  cardClass = ''
  @Output() exportUrl = new EventEmitter<string>()

  openUrl() {
    this.exportUrl.emit(this.link.url.toString())
  }
}
