import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  Individual,
  Organization,
  Role,
} from '@geonetwork-ui/common/domain/model/record'
import { UserModel } from '@geonetwork-ui/common/domain/model/user'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { MockBuilder, MockProviders } from 'ng-mocks'
import { BehaviorSubject } from 'rxjs'
import { FormFieldContactsForResourceComponent } from './form-field-contacts-for-resource.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

const organizationBarbie: Organization = {
  name: 'Barbie Inc.',
}

const organizationGoogle: Organization = {
  name: 'Google',
}

describe('FormFieldContactsForResourceComponent', () => {
  let component: FormFieldContactsForResourceComponent
  let fixture: ComponentFixture<FormFieldContactsForResourceComponent>
  let platformServiceInterface: PlatformServiceInterface
  let organizationsServiceInterface: OrganizationsServiceInterface

  beforeEach(() => {
    return MockBuilder(FormFieldContactsForResourceComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        MockProviders(PlatformServiceInterface, OrganizationsServiceInterface),
      ],
    }).compileComponents()

    platformServiceInterface = TestBed.inject(PlatformServiceInterface)
    platformServiceInterface.getUsers = jest.fn(() => new BehaviorSubject([]))
    organizationsServiceInterface = TestBed.inject(
      OrganizationsServiceInterface
    )
    organizationsServiceInterface.organisations$ = new BehaviorSubject([
      organizationBarbie,
      organizationGoogle,
    ])

    fixture = TestBed.createComponent(FormFieldContactsForResourceComponent)
    component = fixture.componentInstance
    component.value = []
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
    it('should update contactsForRessourceByRole ', () => {
      const mockContact: Individual = {
        role: 'owner',
        organization: { name: 'Org1' } as Organization,
      } as Individual

      component.allOrganizations.set('Org1', { name: 'Org1' } as Organization)
      component.value = [mockContact]

      component.updateContactsForRessource()

      expect(component.contactsForRessourceByRole.get('owner')).toEqual([
        mockContact,
      ])
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
    it('should remove contact at specified index, and emit new contacts', () => {
      const spy = jest.spyOn(component.valueChange, 'emit')
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

      component.value = mockContacts
      component.removeContact(0)

      expect(spy).toHaveBeenCalledWith([mockContacts[1]])
    })
  })

  describe('handleContactsChanged', () => {
    it('should emit new contacts based on reordered dynamic elements', () => {
      const spy = jest.spyOn(component.valueChange, 'emit')
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

      const reorderedElements = [mockContacts[1], mockContacts[0]]

      component.handleContactsChanged(reorderedElements, 'owner')

      expect(spy).toHaveBeenCalledWith([mockContacts[1], mockContacts[0]])
    })
  })

  describe('addContact', () => {
    it('should add the contact, and emit new contacts', () => {
      const spy = jest.spyOn(component.valueChange, 'emit')
      const mockUser: UserModel = {
        username: 'user1',
        name: 'John',
        surname: 'Doe',
        organisation: 'Org1',
      } as UserModel
      component.allOrganizations.set('Org1', { name: 'Org1' } as Organization)

      component.addContact(mockUser, 'owner')

      expect(spy).toHaveBeenCalledWith([
        {
          address: '',
          email: '',
          firstName: 'John',
          lastName: 'Doe',
          organization: { name: 'Org1' } as Organization,
          phone: '',
          position: '',
          role: 'owner',
        },
      ])
    })
  })
})
