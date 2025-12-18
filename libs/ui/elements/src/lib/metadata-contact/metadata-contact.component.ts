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
} from '@geonetwork-ui/common/domain/model/record/index.js'
import { ThumbnailComponent } from '../thumbnail/thumbnail.component.js'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  matMailOutline,
  matOpenInNew,
  matPersonOutline,
} from '@ng-icons/material-icons/baseline'
import {
  matCallOutline,
  matLocationOnOutline,
} from '@ng-icons/material-icons/outline'

import { TranslateDirective } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-metadata-contact',
  templateUrl: './metadata-contact.component.html',
  styleUrls: ['./metadata-contact.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ThumbnailComponent, NgIcon, TranslateDirective],
  viewProviders: [
    provideIcons({
      matOpenInNew,
      matCallOutline,
      matMailOutline,
      matPersonOutline,
      matLocationOnOutline,
    }),
  ],
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

  get address() {
    const addressParts = this.contacts[0].address
      .split(',')
      .map((part) => part.trim())
    return addressParts
  }

  onOrganizationClick() {
    this.organizationClick.emit(this.shownOrganization)
  }
}
