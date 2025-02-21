import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  DatasetDownloadDistribution,
  OnlineLinkResource,
  OnlineResource,
} from '@geonetwork-ui/common/domain/model/record'
import { ThumbnailComponent } from '@geonetwork-ui/ui/elements'
import { bytesToMegabytes, getFileFormat } from '@geonetwork-ui/util/shared'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirAttachment } from '@ng-icons/iconoir'

@Component({
  selector: 'gn-ui-online-resource-card',
  standalone: true,
  imports: [
    CommonModule,
    ThumbnailComponent,
    ButtonComponent,
    TranslateModule,
    NgIconComponent,
  ],
  providers: [
    provideIcons({
      iconoirAttachment,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
  templateUrl: './online-resource-card.component.html',
  styleUrls: ['./online-resource-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnlineResourceCardComponent {
  @Input() onlineResource: OnlineResource
  @Output() modifyClick = new EventEmitter<OnlineResource>()

  get title(): string {
    switch (this.onlineResource.type) {
      case 'link':
      case 'service':
      case 'download':
        return (
          this.onlineResource.description ||
          this.onlineResource.name ||
          '(unknown)'
        )
      case 'endpoint':
        return this.onlineResource.description
    }
  }

  get subtitle(): string {
    switch (this.onlineResource.type) {
      case 'service':
        return `${this.onlineResource.accessServiceProtocol}`
      case 'endpoint':
        return `${this.onlineResource.protocol}`
      case 'link':
      case 'download':
        return this.getFormat(this.onlineResource)
    }
  }

  get fileSize(): string {
    if (this.onlineResource.type !== 'download') return ''
    if (!this.onlineResource.sizeBytes) return ''
    return bytesToMegabytes(this.onlineResource.sizeBytes).toLocaleString()
  }

  get identifierInService(): string {
    if (this.onlineResource.type !== 'service') return ''
    return this.onlineResource.identifierInService ?? ''
  }

  getFormat(onlineResource: OnlineLinkResource | DatasetDownloadDistribution) {
    return (getFileFormat(onlineResource) || '').toUpperCase()
  }
}
