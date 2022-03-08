import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MetadataLinkValid, MetadataRecord } from '@geonetwork-ui/util/shared'
import { CatalogSource } from '@geonetwork-ui/feature/catalog'

@Component({
  selector: 'gn-ui-metadata-info',
  templateUrl: './metadata-info.component.html',
  styleUrls: ['./metadata-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataInfoComponent {
  @Input() metadata: MetadataRecord
  @Input() incomplete: boolean
  @Input() landingPages: MetadataLinkValid[]
  @Input() source: CatalogSource

  fieldReady(propName: string) {
    return !this.incomplete || propName in this.metadata
  }
}
