import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { Individual } from '@geonetwork-ui/common/domain/model/record'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matInfoOutline } from '@ng-icons/material-icons/outline'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'

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
  @Output() contactClick = new EventEmitter<Individual>()

  get displayName(): string {
    if (this.contact?.organization?.name) return this.contact.organization.name
    const first = this.contact?.firstName?.trim()
    const last = this.contact?.lastName?.trim()
    if (first && last) return `${first} ${last}`
    return first || last || ''
  }
}
