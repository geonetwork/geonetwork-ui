import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
  Input,
  Optional,
} from '@angular/core'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { getFileFormat } from '@geonetwork-ui/util/shared'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { CommonModule } from '@angular/common'
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
  imports: [CommonModule, ButtonComponent, NgIcon, TranslateModule],
  viewProviders: [provideIcons({ matOpenInNew })],
})
export class ExternalViewerButtonComponent {
  @Input() set link(value: {
    link: DatasetOnlineResource
    style: { href: string; name: string }
  }) {
    if (!value) return
    // do not use style for now
    this.link_ = value.link
  }
  link_: DatasetOnlineResource

  get externalViewer() {
    return !!this.urlTemplate && !!this.supportedLinkLayerType
  }

  get supportedLinkLayerType() {
    if (!this.link_) return null
    if (this.link_.type === 'service') {
      if (this.link_.accessServiceProtocol === 'wms') {
        return 'wms'
      }
      if (this.link_.accessServiceProtocol === 'wfs') {
        return 'wfs'
      }
    } else if (
      this.link_.type === 'download' &&
      getFileFormat(this.link_) === 'geojson'
    ) {
      return 'geojson'
    }
    return null
  }

  constructor(
    private translateService: TranslateService,
    @Inject(EXTERNAL_VIEWER_URL_TEMPLATE)
    @Optional()
    private urlTemplate: string,
    @Inject(EXTERNAL_VIEWER_OPEN_NEW_TAB)
    private openinNewTab: boolean
  ) {}

  openInExternalViewer() {
    const templateUrl = this.urlTemplate
    const layerName = this.link_.name
      ? this.link_.name
      : this.translateService.instant('externalviewer.dataset.unnamed')
    const url = templateUrl
      .replace('${layer_name}', `${layerName}`)
      .replace(
        '${service_url}',
        `${encodeURIComponent(this.link_.url.toString())}`
      )
      .replace('${service_type}', `${this.supportedLinkLayerType}`)
    window.open(url, this.openinNewTab ? '_blank' : '_self').focus()
  }
}
