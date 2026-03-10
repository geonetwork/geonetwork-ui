import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  Input,
  inject,
} from '@angular/core'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { getFileFormat } from '@geonetwork-ui/util/shared'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import { WmsEndpoint } from '@camptocamp/ogc-client'

import { matOpenInNew } from '@ng-icons/material-icons/baseline'

marker('externalviewer.dataset.unnamed')

export const EXTERNAL_VIEWER_URL_TEMPLATE = new InjectionToken<string>(
  'externalViewerUrlTemplate'
)
export const EXTERNAL_VIEWER_OPEN_NEW_TAB = new InjectionToken<boolean>(
  'externalViewerOpenNewTab',
  { factory: () => false }
)

@Component({
  selector: 'gn-ui-external-viewer-button',
  templateUrl: './external-viewer-button.component.html',
  styleUrls: ['./external-viewer-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ButtonComponent, NgIcon, TranslatePipe],
  viewProviders: [
    provideIcons({ matOpenInNew }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class ExternalViewerButtonComponent {
  private translateService = inject(TranslateService)
  private urlTemplate = inject(EXTERNAL_VIEWER_URL_TEMPLATE, { optional: true })
  private openinNewTab = inject(EXTERNAL_VIEWER_OPEN_NEW_TAB)

  @Input() link: DatasetOnlineResource
  @Input() extraClass = ''

  get externalViewer() {
    return !!this.urlTemplate && !!this.supportedLinkLayerType
  }

  get supportedLinkLayerType() {
    if (!this.link) return null
    if (this.link.type === 'service') {
      if (this.link.accessServiceProtocol === 'wms') {
        return 'wms'
      }
      if (this.link.accessServiceProtocol === 'wfs') {
        return 'wfs'
      }
    } else if (
      this.link.type === 'download' &&
      getFileFormat(this.link) === 'geojson'
    ) {
      return 'geojson'
    }
    return null
  }

  async openInExternalViewer() {
    const mimeType = await this.resolveWmsMimeType()
    const templateUrl = this.urlTemplate
    const layerName = this.link.name
      ? this.link.name
      : this.translateService.instant('externalviewer.dataset.unnamed')
    const url = templateUrl
      .replace('${layer_name}', `${layerName}`)
      .replace(
        '${service_url}',
        `${encodeURIComponent(this.link.url.toString())}`
      )
      .replace('${service_type}', `${this.supportedLinkLayerType}`)
      .replace('${mime_type}', `${encodeURIComponent(mimeType)}`)
    window.open(url, this.openinNewTab ? '_blank' : '_self').focus()
  }

  private async resolveWmsMimeType(): Promise<string> {
    if (this.supportedLinkLayerType !== 'wms') return ''
    try {
      const endpoint = await new WmsEndpoint(this.link.url.toString()).isReady()
      const description = await endpoint.describeLayer(this.link.name)
      return description?.owsType === 'wfs' ? 'image/png' : 'image/jpeg'
    } catch {
      return 'image/jpeg'
    }
  }
}
