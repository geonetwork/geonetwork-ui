import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import {
  AutocompleteComponent,
  DropdownSelectorComponent,
  UiInputsModule,
} from '@geonetwork-ui/ui/inputs'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import {
  Individual,
  Organization,
  RoleLabels,
} from '@geonetwork-ui/common/domain/model/record'
import { TranslateModule } from '@ngx-translate/core'
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs'
import { UserModel } from '@geonetwork-ui/common/domain/model/user'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { ContactCardComponent } from '../../../contact-card/contact-card.component'

@Component({
  selector: 'gn-ui-form-field-contacts-for-resource',
  templateUrl: './form-field-contacts-for-resource.component.html',
  styleUrls: ['./form-field-contacts-for-resource.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DropdownSelectorComponent,
    UiInputsModule,
    CommonModule,
    UiWidgetsModule,
    AutocompleteComponent,
    TranslateModule,
    ContactCardComponent,
  ],
})
export class FormFieldContactsForResourceComponent
  implements OnInit, OnChanges
{
  @Input() control: FormControl<Individual[]>

  allUser$: Observable<UserModel[]>

  rolesToPick: string[] = [
    'resource_provider',
    'custodian',
    'owner',
    'point_of_contact',
    'author',
  ]

  rolesToDisplay = []

  allOrganizations: Map<string, Organization> = new Map()

  constructor(
    private platformServiceInterface: PlatformServiceInterface,
    private organizationsServiceInterface: OrganizationsServiceInterface,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.allUser$ = this.platformServiceInterface.getUsers()
  }

  ngOnInit(): void {
    this.organizationsServiceInterface.organisations$.subscribe(
      (organizations) => {
        this.allOrganizations = new Map<string, Organization>(
          organizations.map((organization) => [organization.name, organization])
        )
        this.changeDetectorRef.markForCheck()
      }
    )
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    const contactsForResource = changes['control']

    if (
      contactsForResource &&
      contactsForResource.currentValue !== contactsForResource.previousValue
    ) {
      const rolesToAdd = contactsForResource.currentValue.value.map(
        (contact: Individual) => contact.role
      )

      rolesToAdd.forEach((role: string) => {
        if (!this.rolesToDisplay.includes(role)) {
          this.rolesToDisplay.push(role)
        }
      })

      this.filterRolesToPick()

      this.changeDetectorRef.markForCheck()
    }
  }

  addRoleToDisplay(roleToAdd: string) {
    this.rolesToDisplay.push(roleToAdd)
    this.filterRolesToPick()
  }

  filterRolesToPick() {
    this.rolesToPick = this.rolesToPick.filter(
      (role) => !this.rolesToDisplay.includes(role)
    )
  }

  removeContact(index: number) {
    const newContactsforRessource = this.control.value.filter(
      (_, i) => i !== index
    )
    this.control.setValue(newContactsforRessource)
  }

  protected roleToLabel(role: string): string {
    return RoleLabels.get(role)
  }

  /**
   * gn-ui-autocomplete
   */
  displayWithFn: (user: UserModel) => string = (user) =>
    `${user.name} ${user.surname}`

  /**
   * gn-ui-autocomplete
   */
  autoCompleteAction = (query: string) => {
    return this.allUser$.pipe(
      switchMap((users) => [
        users.filter((user) => user.username.includes(query)),
      ]),
      debounceTime(300),
      distinctUntilChanged()
    )
  }

  /**
   * gn-ui-autocomplete
   */
  async addContact(contact: UserModel, role: string) {
    let newContactsforRessource = {
      firstName: contact.name ?? '',
      lastName: contact.surname ?? '',
      organization: {
        name: contact.organisation,
      },
      email: contact.email ?? '',
      role,
      address: '',
      phone: '',
      position: '',
    } as Individual

    const newContactOrganization = this.getOrganizationByName(
      contact.organisation
    )

    newContactsforRessource = {
      ...newContactsforRessource,
      organization: newContactOrganization,
    }

    const newControlValue = [...this.control.value, newContactsforRessource]

    this.control.setValue(newControlValue)
  }

  getContactsByRole(role: string): Individual[] {
    return this.control.value.filter((contact: Individual) => {
      return contact.role === role
    })
  }

  getOrganizationByName(name: string): Organization {
    return this.allOrganizations.get(name)
  }
}
