import { Individual, Role } from '@geonetwork-ui/common/domain/model/record'

export interface ContactGroup {
  role: Role
  contacts: Individual[]
}

export function groupContactsByRole(contacts: Individual[]): ContactGroup[] {
  const groups: ContactGroup[] = []
  const indexByRole = new Map<Role, number>()

  for (const contact of contacts) {
    if (indexByRole.has(contact.role)) {
      groups[indexByRole.get(contact.role)].contacts.push(contact)
    } else {
      indexByRole.set(contact.role, groups.length)
      groups.push({ role: contact.role, contacts: [contact] })
    }
  }

  return groups
}
