import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MapConfig } from '@geonetwork-ui/util/app-config'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { TranslateService } from '@ngx-translate/core'
import { getFileFormat } from '@geonetwork-ui/util/shared'

marker('externalviewer.dataset.unnamed')

@Component({
  selector: 'gn-ui-external-viewer-button',
  templateUrl: './external-viewer-button.component.html',
  styleUrls: ['./external-viewer-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalViewerButtonComponent {
  @Input() link: DatasetOnlineResource
  @Input() mapConfig: MapConfig

  get externalViewer() {
    if (this.link && this.mapConfig) {
      return (
        !!this.mapConfig.EXTERNAL_VIEWER_URL_TEMPLATE &&
        !!this.supportedLinkLayerType
      )
    }
    return false
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

  constructor(private translateService: TranslateService) {}

  openInExternalViewer() {
    const templateUrl = this.mapConfig.EXTERNAL_VIEWER_URL_TEMPLATE
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
    window
      .open(
        url,
        this.mapConfig.EXTERNAL_VIEWER_OPEN_NEW_TAB ? '_blank' : '_self'
      )
      .focus()
  }
}
