import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { MetadataLink, MetadataRecord } from '@geonetwork-ui/util-shared'

@Component({
  selector: 'gn-ui-metadata-info',
  templateUrl: './metadata-info.component.html',
  styleUrls: ['./metadata-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataInfoComponent {
  @Input() metadata: MetadataRecord
  @Input() incomplete: boolean
  @Input() landingPages: MetadataLink[]
  @Output() keyword = new EventEmitter<string>()

  get hasUsage() {
    return 'isOpenData' in this.metadata || this.metadata.constraints?.length
  }

  fieldReady(propName: string) {
    return !this.incomplete || propName in this.metadata
  }

  onKeywordClick(keyword: string) {
    this.keyword.emit(keyword)
  }
}
