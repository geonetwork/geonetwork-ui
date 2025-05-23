import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core'
import { AutocompleteComponent } from '@geonetwork-ui/ui/inputs'
import {
  Individual,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
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
import { createFuzzyFilter } from '@geonetwork-ui/util/shared'
import { map } from 'rxjs/operators'
import { SortableListComponent } from '@geonetwork-ui/ui/layout'

@Component({
  selector: 'gn-ui-form-field-contacts',
  templateUrl: './form-field-contacts.component.html',
  styleUrls: ['./form-field-contacts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    AutocompleteComponent,
    TranslateDirective,
    TranslatePipe,
    ContactCardComponent,
    SortableListComponent,
  ],
})
export class FormFieldContactsComponent implements OnDestroy, OnChanges {
  @Input() value: Individual[]
  @Output() valueChange: EventEmitter<Individual[]> = new EventEmitter()

  contacts: Individual[] = []

  subscription: Subscription = new Subscription()

  allUsers$: Observable<UserModel[]>

  allOrganizations: Map<string, Organization> = new Map()

  constructor(
    private platformServiceInterface: PlatformServiceInterface,
    private organizationsServiceInterface: OrganizationsServiceInterface,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.allUsers$ = this.platformServiceInterface.getUsers()
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    const contactsChanges = changes['value']

    if (contactsChanges.firstChange) {
      this.allOrganizations = new Map<string, Organization>(
        (
          await firstValueFrom(
            this.organizationsServiceInterface.organisations$
          )
        ).map((organization) => [organization.name, organization])
      )
    }

    if (contactsChanges.currentValue !== contactsChanges.previousValue) {
      this.updateContacts()

      this.changeDetectorRef.markForCheck()
    }
  }

  updateContacts() {
    this.contacts = this.value.reduce((acc, contact) => {
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
  }

  handleContactsChanged(items: unknown[]) {
    const contacts = items as Individual[]

    this.contacts = contacts

    this.valueChange.emit(contacts)
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
    const newContact = {
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

    this.valueChange.emit([...this.value, newContact])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
