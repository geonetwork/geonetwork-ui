import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MetadataLink, MetadataRecord } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-metadata-page',
  templateUrl: './metadata-page.component.html',
  styleUrls: ['./metadata-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataPageComponent {
  @Input() metadata: MetadataRecord
  @Input() dataLinks: MetadataLink[] = []
  @Input() otherLinks: MetadataLink[] = []
  @Input() incomplete: boolean

  fieldReady(propName: string) {
    return !this.incomplete || propName in this.metadata
  }
}
