import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {
  CatalogRecord,
  Individual,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'gn-ui-metadata-contact',
  templateUrl: './metadata-contact.component.html',
  styleUrls: ['./metadata-contact.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataContactComponent {
  @Input() metadata: Partial<CatalogRecord>
  @Output() organizationClick = new EventEmitter<Organization>()
  @Output() contactClick = new EventEmitter<Individual>()

  get shownOrganization() {
    return this.metadata.ownerOrganization
  }

  get contacts() {
    return (
      (this.metadata.kind === 'dataset'
        ? this.metadata.contactsForResource
        : this.metadata.contacts) || []
    )
  }

  parseAddress(inputAddress) {
    const addressParts = inputAddress.split(',').map((part) => part.trim())

    const addressArray = []

    for (let i = 0; i < addressParts.length; i++) {
      const part = addressParts[i]
      if (part.toLowerCase().includes('cs')) {
        // Handle "CS Number" in a single line
        addressArray.push(part)
      } else if (part.match(/^\d{5}$/)) {
        // Combine postcode and city in a single line
        const postcodeCity = `${part} ${addressParts[i - 1]}`
        // delete duplicate city
        if (postcodeCity.includes(addressParts[i - 1])) {
          addressArray.pop()
        }
        addressArray.push(postcodeCity)
      } else {
        // Treat as a separate line
        addressArray.push(part)
      }
    }

    return addressArray
  }

  get address() {
    return this.parseAddress(this.contacts[0].address)
  }

  onOrganizationClick() {
    this.organizationClick.emit(this.shownOrganization)
  }
}
