import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Individual } from '@geonetwork-ui/common/domain/model/record'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matInfoOutline } from '@ng-icons/material-icons/outline'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { getUserDisplayName } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-contact-pill',
  templateUrl: './contact-pill.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIcon, ButtonComponent],
  viewProviders: [
    provideIcons({
      matInfoOutline,
    }),
  ],
})
export class ContactPillComponent {
  @Input() contact: Individual

  get displayName(): string {
    return getUserDisplayName(this.contact)
  }
}
