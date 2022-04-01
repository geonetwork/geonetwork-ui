import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core'
import { MetadataRecord } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-metadata-contact',
  templateUrl: './metadata-contact.component.html',
  styleUrls: ['./metadata-contact.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataContactComponent {
  @Input() metadata: MetadataRecord
  @Output() contact = new EventEmitter<string>()

  onContactClick() {
    this.contact.emit(this.metadata.contact.organisation)
  }
}
