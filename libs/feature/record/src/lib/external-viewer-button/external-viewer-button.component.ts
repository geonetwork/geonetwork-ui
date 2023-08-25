import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MapConfig } from '@geonetwork-ui/util/app-config'
import { DatasetDistribution } from '@geonetwork-ui/common/domain/record'

@Component({
  selector: 'gn-ui-external-viewer-button',
  templateUrl: './external-viewer-button.component.html',
  styleUrls: ['./external-viewer-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalViewerButtonComponent {
  @Input() link: DatasetDistribution
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
    }
    return null
  }

  openInExternalViewer() {
    const templateUrl = this.mapConfig.EXTERNAL_VIEWER_URL_TEMPLATE
    const url = templateUrl
      .replace('${layer_name}', `${this.link.name}`)
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
