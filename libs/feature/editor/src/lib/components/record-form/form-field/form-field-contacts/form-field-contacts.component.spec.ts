import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormFieldContactsComponent } from './form-field-contacts.component'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { BehaviorSubject } from 'rxjs'
import {
  Individual,
  Organization,
  Role,
} from '@geonetwork-ui/common/domain/model/record'
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { UserModel } from '@geonetwork-ui/common/domain/model/user'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { ContactCardComponent } from '../../../contact-card/contact-card.component'
import {
  AutocompleteComponent,
  DropdownSelectorComponent,
  UiInputsModule,
} from '@geonetwork-ui/ui/inputs'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { FormControl } from '@angular/forms'

const organizationBarbie: Organization = {
  name: 'Barbie Inc.',
}

const organizationGoogle: Organization = {
  name: 'Google',
}

class MockPlatformServiceInterface {
  getUsers = jest.fn(() => new BehaviorSubject([]))
}

class MockOrganizationsServiceInterface {
  organisations$ = new BehaviorSubject([organizationBarbie, organizationGoogle])
}

describe('FormFieldContactsForResourceComponent', () => {
  let component: FormFieldContactsComponent
  let fixture: ComponentFixture<FormFieldContactsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormFieldContactsComponent,
        CommonModule,
        TranslateModule.forRoot(),
        UiInputsModule,
        ContactCardComponent,
        DropdownSelectorComponent,
      ],
      providers: [
        {
          provide: PlatformServiceInterface,
          useClass: MockPlatformServiceInterface,
        },
        {
          provide: OrganizationsServiceInterface,
          useClass: MockOrganizationsServiceInterface,
        },
        ChangeDetectorRef,
      ],
    })
      .overrideComponent(AutocompleteComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()

    fixture = TestBed.createComponent(FormFieldContactsComponent)
    component = fixture.componentInstance
    component.control = new FormControl<Individual[]>([])
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  describe('ngOnInit', () => {
    it('should initialize organizations', async () => {
      await component.ngOnInit()

      expect(component.allOrganizations.size).toBe(2)
    })
  })

  describe('addRoleToDisplay', () => {
    it('should add role to display and filter roles to pick', () => {
      const initialRolesToPick = [...component.rolesToPick]
      const roleToAdd = initialRolesToPick[0]

      component.addRoleToDisplay(roleToAdd)

      expect(component.roleSectionsToDisplay).toContain(roleToAdd)
      expect(component.rolesToPick).not.toContain(roleToAdd)
    })
  })

  describe('filterRolesToPick', () => {
    it('should filter roles already in roleSectionsToDisplay', () => {
      component.rolesToPick = ['custodian', 'owner'] as Role[]
      component.roleSectionsToDisplay = ['custodian'] as Role[]

      component.filterRolesToPick()

      expect(component.rolesToPick).toEqual(['owner'])
    })
  })

  describe('updateContactsForRessource', () => {
    it('should update contactsForRessourceByRole and contactsAsDynElemByRole', () => {
      const mockContact: Individual = {
        role: 'owner',
        organization: { name: 'Org1' } as Organization,
      } as Individual

      component.allOrganizations.set('Org1', { name: 'Org1' } as Organization)
      component.control.setValue([mockContact])

      component.updateContacts()

      expect(component.contactsForRessourceByRole.get('owner')).toEqual([
        mockContact,
      ])
      expect(component.contactsAsDynElemByRole.get('owner').length).toBe(1)
    })
  })

  describe('manageRoleSectionsToDisplay', () => {
    it('should add new roles to roleSectionsToDisplay', () => {
      const mockContact: Individual = {
        role: 'owner',
        organization: { name: 'Org1' } as Organization,
      } as Individual

      component.manageRoleSectionsToDisplay([mockContact])

      expect(component.roleSectionsToDisplay).toContain('owner')
    })
  })

  describe('removeContact', () => {
    it('should remove contact at specified index', () => {
      const mockContacts: Individual[] = [
        {
          role: 'owner',
          organization: { name: 'Org1' } as Organization,
        } as Individual,
        {
          role: 'custodian',
          organization: { name: 'Org2' } as Organization,
        } as Individual,
      ]

      component.control.setValue(mockContacts)
      component.removeContact(0)

      expect(component.control.value.length).toBe(1)
      expect(component.control.value[0]).toEqual(mockContacts[1])
    })
  })

  describe('handleContactsChanged', () => {
    it('should update contacts based on reordered dynamic elements', () => {
      const mockContacts: Individual[] = [
        {
          role: 'owner',
          organization: { name: 'Org1' } as Organization,
        } as Individual,
        {
          role: 'owner',
          organization: { name: 'Org2' } as Organization,
        } as Individual,
      ]

      component.contactsForRessourceByRole.set('owner', [mockContacts[0]])
      component.contactsForRessourceByRole.set('owner', [mockContacts[1]])

      const reorderedElements = [
        { inputs: { contact: mockContacts[1] } } as any,
        { inputs: { contact: mockContacts[0] } } as any,
      ]

      component.handleContactsChanged(reorderedElements)

      const newControlValue = component.control.value
      expect(newControlValue[0]).toEqual(mockContacts[1])
      expect(newControlValue[1]).toEqual(mockContacts[0])
    })
  })

  describe('addContact', () => {
    it('should add a new contact to the control value', () => {
      const mockUser: UserModel = {
        username: 'user1',
        name: 'John',
        surname: 'Doe',
        organisation: 'Org1',
      } as UserModel

      component.allOrganizations.set('Org1', { name: 'Org1' } as Organization)
      const initialContacts = component.control.value.length

      component.addContact(mockUser, 'owner')

      expect(component.control.value.length).toBe(initialContacts + 1)
      expect(component.control.value[initialContacts].role).toBe('owner')
      expect(component.control.value[initialContacts].organization.name).toBe(
        'Org1'
      )
    })
  })

  describe('ngOnDestroy', () => {
    it('should unsubscribe from all subscriptions', () => {
      const subscriptionSpy = jest.spyOn(component.subscription, 'unsubscribe')

      component.ngOnDestroy()

      expect(subscriptionSpy).toHaveBeenCalled()
    })
  })
})
