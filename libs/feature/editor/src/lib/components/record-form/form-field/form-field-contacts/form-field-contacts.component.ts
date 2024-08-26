import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
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
  Role,
} from '@geonetwork-ui/common/domain/model/record'
import { TranslateModule } from '@ngx-translate/core'
import {
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  Observable,
  Subscription,
  switchMap,
} from 'rxjs'
import { UserModel } from '@geonetwork-ui/common/domain/model/user'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { ContactCardComponent } from '../../../contact-card/contact-card.component'
import {
  DynamicElement,
  SortableListComponent,
} from '@geonetwork-ui/ui/elements'
import { createFuzzyFilter } from '@geonetwork-ui/util/shared'
import { map } from 'rxjs/operators'

@Component({
  selector: 'gn-ui-form-field-contacts',
  templateUrl: './form-field-contacts.component.html',
  styleUrls: ['./form-field-contacts.component.css'],
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
    SortableListComponent,
  ],
})
export class FormFieldContactsComponent
  implements OnInit, OnDestroy, OnChanges
{
  @Input() control: FormControl<Individual[]>

  contacts: Individual[] = []
  contactsAsDynElem: DynamicElement[] = []

  subscription: Subscription = new Subscription()

  allUsers$: Observable<UserModel[]>

  rolesToPick: Role[] = ['point_of_contact']

  allOrganizations: Map<string, Organization> = new Map()

  constructor(
    private platformServiceInterface: PlatformServiceInterface,
    private organizationsServiceInterface: OrganizationsServiceInterface,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.allUsers$ = this.platformServiceInterface.getUsers()
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['control'])
  }

  async ngOnInit(): Promise<void> {
    this.allOrganizations = new Map<string, Organization>(
      (
        await firstValueFrom(this.organizationsServiceInterface.organisations$)
      ).map((organization) => [organization.name, organization])
    )

    this.updateContacts()

    this.changeDetectorRef.markForCheck()

    this.subscription.add(
      this.control.valueChanges.subscribe((contacts) => {
        console.log('new contacts (valueChange): ', contacts)
        this.updateContacts()
        this.changeDetectorRef.markForCheck()
      })
    )
  }

  updateContacts() {
    this.contacts = this.control.value.reduce((acc, contact) => {
      const completeOrganization = this.allOrganizations.get(
        contact.organization.name
      )

      const updatedContact = {
        ...contact,
        organization:
          completeOrganization ??
          ({ name: contact.organization.name } as Organization),
      }

      acc.push(updatedContact)

      return acc
    }, [] as Individual[])

    this.contactsAsDynElem = this.control.value.reduce((acc, contact) => {
      const completeOrganization = this.allOrganizations.get(
        contact.organization.name
      )

      const updatedContact = {
        ...contact,
        organization:
          completeOrganization ??
          ({ name: contact.organization.name } as Organization),
      }

      const contactAsDynElem = {
        component: ContactCardComponent,
        inputs: {
          contact: updatedContact,
          removable: false,
        },
      } as DynamicElement

      acc.push(contactAsDynElem)

      return acc
    }, [] as DynamicElement[])

    this.changeDetectorRef.markForCheck()
  }

  removeContact() {
    this.control.setValue([])
  }

  handleContactsChanged(event: DynamicElement[]) {
    const newContactsOrdered = event.map(
      (contactAsDynElem) => contactAsDynElem.inputs['contact']
    ) as Individual[]

    console.log('newContactsOrdered :', newContactsOrdered)

    this.control.setValue(newContactsOrdered)
  }

  /**
   * gn-ui-autocomplete
   */
  displayWithFn: (user: UserModel) => string = (user) =>
    `${user.name} ${user.surname} ${
      user.organisation ? `(${user.organisation})` : ''
    }`

  /**
   * gn-ui-autocomplete
   */
  autoCompleteAction = (query: string) => {
    const fuzzyFilter = createFuzzyFilter(query)
    return this.allUsers$.pipe(
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
  addContact(contact: UserModel) {
    const newContacts = {
      firstName: contact.name ?? '',
      lastName: contact.surname ?? '',
      organization:
        this.allOrganizations.get(contact.organisation) ??
        ({ name: contact.organisation } as Organization),
      email: contact.email ?? '',
      role: 'point_of_contact',
      address: '',
      phone: '',
      position: '',
    } as Individual

    const newControlValue = [...this.control.value, newContacts]

    this.control.setValue(newControlValue)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
