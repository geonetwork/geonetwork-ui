import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core'
import {
  Individual,
  Organization,
  Role,
  RoleLabels,
  RoleValues,
} from '@geonetwork-ui/common/domain/model/record'
import { UserModel } from '@geonetwork-ui/common/domain/model/user'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { SortableListComponent } from '@geonetwork-ui/ui/layout'
import {
  AutocompleteComponent,
  ButtonComponent,
} from '@geonetwork-ui/ui/inputs'
import { createFuzzyFilter } from '@geonetwork-ui/util/shared'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import {
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  switchMap,
} from 'rxjs'
import { map } from 'rxjs/operators'
import { ContactCardComponent } from '../../../contact-card/contact-card.component'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirPlus } from '@ng-icons/iconoir'

@Component({
  selector: 'gn-ui-form-field-contacts-for-resource',
  templateUrl: './form-field-contacts-for-resource.component.html',
  styleUrls: ['./form-field-contacts-for-resource.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    AutocompleteComponent,
    ContactCardComponent,
    SortableListComponent,
    NgIconComponent,
    ButtonComponent,
    TranslatePipe,
    TranslateDirective,
  ],
  providers: [
    provideIcons({ iconoirPlus }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
  ],
})
export class FormFieldContactsForResourceComponent
  implements OnChanges, OnInit
{
  @Input() value: Individual[]
  @Output() valueChange: EventEmitter<Individual[]> = new EventEmitter()

  contactsForRessourceByRole: Map<Role, Individual[]> = new Map()
  roleValues = RoleValues

  rolesToPick: Role[] = this.roleValues.filter(
    (role) => role !== 'other' && role !== 'unspecified'
  )

  roleSectionsToDisplay: Role[] = []

  allOrganizations: Map<string, Organization> = new Map()

  constructor(
    private platformServiceInterface: PlatformServiceInterface,
    private organizationsServiceInterface: OrganizationsServiceInterface
  ) {}

  ngOnChanges() {
    this.updateContactsForRessource()
    this.manageRoleSectionsToDisplay(this.value)
    this.filterRolesToPick()
  }

  async ngOnInit(): Promise<void> {
    this.allOrganizations = new Map<string, Organization>(
      (
        await firstValueFrom(this.organizationsServiceInterface.organisations$)
      ).map((organization) => [organization.name, organization])
    )
    this.updateContactsForRessource()
    this.manageRoleSectionsToDisplay(this.value)
    this.filterRolesToPick()
  }

  addRoleToDisplay(roleToAdd: string) {
    this.roleSectionsToDisplay.push(roleToAdd)
    this.filterRolesToPick()
  }

  filterRolesToPick() {
    this.rolesToPick = this.rolesToPick.filter(
      (role) => !this.roleSectionsToDisplay.includes(role)
    )
  }

  updateContactsForRessource() {
    this.contactsForRessourceByRole = this.value.reduce((acc, contact) => {
      const completeOrganization = contact.organization
        ? this.allOrganizations.get(contact.organization.name)
        : null
      const organization = completeOrganization ?? contact.organization

      const updatedContact = {
        ...contact,
        ...(organization && { organization }),
      }

      if (!acc.has(contact.role)) {
        acc.set(contact.role, [])
      }

      acc.get(contact.role).push(updatedContact)

      return acc
    }, new Map<Role, Individual[]>())
  }

  manageRoleSectionsToDisplay(contactsForResource: Individual[]) {
    const roles = contactsForResource.map(
      (contact: Individual) => contact.role
    ) as Role[]

    roles.forEach((role: Role) => {
      if (!this.roleSectionsToDisplay.includes(role)) {
        this.roleSectionsToDisplay.push(role)
      }
    })
  }

  removeContact(index: number) {
    const newContactsforRessource = this.value.filter((_, i) => i !== index)
    this.valueChange.emit(newContactsforRessource)
  }

  handleContactsChanged(items: unknown[], role: Role) {
    const contacts = items as Individual[]

    this.contactsForRessourceByRole.set(role, contacts)

    const newControlValue = Array.from(
      this.contactsForRessourceByRole.values()
    ).flat()

    this.valueChange.emit(newControlValue)
  }

  protected roleToLabel(role: string): string {
    return RoleLabels.get(role)
  }

  /**
   * gn-ui-autocomplete
   */
  displayWithFn: (user: UserModel) => string = (user) =>
    user.name
      ? `${user.name} ${user.surname} ${
          user.organisation ? `(${user.organisation})` : ''
        }`
      : ``

  /**
   * gn-ui-autocomplete
   */
  autoCompleteAction = (query: string) => {
    const fuzzyFilter = createFuzzyFilter(query)
    return this.platformServiceInterface.getUsers().pipe(
      switchMap((users) => [
        users.filter((user) => fuzzyFilter(user.username)),
      ]),
      map((results) => results.slice(0, 10)),
      debounceTime(300),
      distinctUntilChanged()
    )
  }

  /**
   * gn-ui-autocomplete
   */
  addContact(contact: unknown, role: string) {
    const newContact = contact as UserModel
    const newContactsForRessource = {
      firstName: newContact.name ?? '',
      lastName: newContact.surname ?? '',
      organization:
        this.allOrganizations.get(newContact.organisation) ??
        ({ name: newContact.organisation } as Organization),
      email: newContact.email ?? '',
      role,
      address: '',
      phone: '',
      position: '',
    } as Individual

    const newControlValue = [...this.value, newContactsForRessource]

    this.valueChange.emit(newControlValue)
  }
}
