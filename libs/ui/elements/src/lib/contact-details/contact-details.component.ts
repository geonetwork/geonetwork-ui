import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Individual } from '@geonetwork-ui/common/domain/model/record'
import {
  getAddressLines,
  getIndividualDisplayName,
} from '@geonetwork-ui/util/shared'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matMailOutline, matOpenInNew } from '@ng-icons/material-icons/baseline'
import {
  matCallOutline,
  matLocationOnOutline,
} from '@ng-icons/material-icons/outline'
import { ThumbnailComponent } from '../thumbnail/thumbnail.component'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-contact-details',
  templateUrl: './contact-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIcon, ThumbnailComponent, TranslateModule],
  viewProviders: [
    provideIcons({
      matCallOutline,
      matLocationOnOutline,
      matMailOutline,
      matOpenInNew,
    }),
  ],
})
export class ContactDetailsComponent {
  @Input() contact: Individual

  get organization() {
    return this.contact?.organization
  }

  get displayName(): string {
    return getIndividualDisplayName(this.contact)
  }

  get addressLines(): string[] {
    return getAddressLines(this.contact?.address)
  }
}
