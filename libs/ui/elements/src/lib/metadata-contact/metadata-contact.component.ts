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

  get shownContact() {
    return this.metadata.resourceContacts?.[0] || this.metadata.contact
  }

  onContactClick() {
    this.contact.emit(this.shownContact.organisation)
  }
}
