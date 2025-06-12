import { Component, Input } from '@angular/core'
import { NgIf } from '@angular/common'
import {
  CatalogRecord,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { ThumbnailComponent } from '../thumbnail/thumbnail.component'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import {
  matEmailOutline,
  matLocationOnOutline,
  matPhoneOutline,
} from '@ng-icons/material-icons/outline'
import { iconoirInternet } from '@ng-icons/iconoir'
import { TranslateDirective } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-internal-link-card-contact',
  standalone: true,
  imports: [NgIf, ThumbnailComponent, NgIconComponent, TranslateDirective],
  providers: [
    provideIcons({
      iconoirInternet,
      matEmailOutline,
      matPhoneOutline,
      matLocationOnOutline,
    }),
  ],
  templateUrl: './internal-link-card-contact.component.html',
})
export class InternalLinkCardContactComponent {
  @Input() record: CatalogRecord
  @Input() size: 'L' | 'M' | 'S' | 'XS' = 'M'

  get organization(): Organization {
    return this.record.ownerOrganization
  }

  get contacts() {
    return (
      (this.record.kind === 'dataset'
        ? this.record.contactsForResource
        : this.record.contacts) || []
    )
  }

  openExternalUrl(event: Event, url: URL): void {
    event.stopPropagation()
    window.open(url, '_blank')
  }

  openMailto(event: Event, email: string): void {
    event.stopPropagation()
    window.open(`mailto:${email}`, '_blank')
  }

  copyToClipboard(event: Event, text: string): void {
    event.stopPropagation()
    navigator.clipboard.writeText(text)
  }
}
