import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { LinkHelperService } from '@geonetwork-ui/feature/search'
import { MapConfig } from '@geonetwork-ui/util/app-config'
import { MetadataLinkValid } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-external-viewer-button',
  templateUrl: './external-viewer-button.component.html',
  styleUrls: ['./external-viewer-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalViewerButtonComponent {
  @Input() link: MetadataLinkValid
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
    return this.linkHelper.isWmsLink(this.link)
      ? 'wms'
      : this.linkHelper.isWfsLink(this.link)
      ? 'wfs'
      : null
  }

  constructor(private linkHelper: LinkHelperService) {}

  openInExternalViewer() {
    const templateUrl = this.mapConfig.EXTERNAL_VIEWER_URL_TEMPLATE
    const url = templateUrl
      .replace('${layer_name}', `${this.link.name}`)
      .replace('${service_url}', `${encodeURIComponent(this.link.url)}`)
      .replace('${service_type}', `${this.supportedLinkLayerType}`)
    window
      .open(
        url,
        this.mapConfig.EXTERNAL_VIEWER_OPEN_NEW_TAB ? '_blank' : '_self'
      )
      .focus()
  }
}
