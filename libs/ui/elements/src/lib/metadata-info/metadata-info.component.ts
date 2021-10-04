import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MetadataLink, MetadataRecord } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-metadata-info',
  templateUrl: './metadata-info.component.html',
  styleUrls: ['./metadata-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataInfoComponent {
  @Input() metadata: MetadataRecord
  @Input() incomplete: boolean

  fieldReady(propName: string) {
    return !this.incomplete || propName in this.metadata
  }
}
