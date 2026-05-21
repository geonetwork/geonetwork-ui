import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {
  Individual,
  Role,
  RoleLabels,
} from '@geonetwork-ui/common/domain/model/record'
import { TranslatePipe } from '@ngx-translate/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matInfoOutline } from '@ng-icons/material-icons/outline'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'

interface ContactGroup {
  role: Role
  contacts: Individual[]
}

@Component({
  selector: 'gn-ui-metadata-resource-contacts',
  templateUrl: './metadata-resource-contacts.component.html',
  styleUrls: ['./metadata-resource-contacts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TranslatePipe, NgIcon, ButtonComponent],
  viewProviders: [
    provideIcons({
      matInfoOutline,
    }),
  ],
})
export class MetadataResourceContactsComponent {
  @Input() contacts: Individual[] = []
  @Output() contactClick = new EventEmitter<Individual>()

  get contactGroups(): ContactGroup[] {
    const groups: ContactGroup[] = []
    const indexByRole = new Map<Role, number>()
    for (const contact of this.contacts ?? []) {
      if (indexByRole.has(contact.role)) {
        groups[indexByRole.get(contact.role)].contacts.push(contact)
      } else {
        indexByRole.set(contact.role, groups.length)
        groups.push({ role: contact.role, contacts: [contact] })
      }
    }
    return groups
  }

  getRoleTranslationKey(role: Role): string {
    return RoleLabels.get(role)
  }

  getContactDisplayName(contact: Individual): string {
    if (contact.organization?.name) return contact.organization.name
    const first = contact.firstName?.trim()
    const last = contact.lastName?.trim()
    if (first && last) return `${first} ${last}`
    if (first || last) return first || last
    return contact.email || ''
  }
}
