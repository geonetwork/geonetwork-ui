import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormFieldContactsForResourceComponent } from './form-field-contacts-for-resource.component'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { BehaviorSubject } from 'rxjs'
import {
  Individual,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { ChangeDetectorRef, SimpleChanges } from '@angular/core'
import { UserModel } from '@geonetwork-ui/common/domain/model/user'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { ContactCardComponent } from '../../../contact-card/contact-card.component'
import {
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
  let component: FormFieldContactsForResourceComponent
  let fixture: ComponentFixture<FormFieldContactsForResourceComponent>

  const contactJohn: Individual = {
    firstName: 'John',
    lastName: 'Doe',
    organization: { name: 'Org1' } as Organization,
    email: 'john.doe@example.com',
    role: 'author',
  }

  const contactJane: Individual = {
    firstName: 'John',
    lastName: 'Doe',
    organization: { name: 'Org1' } as Organization,
    email: 'john.doe@example.com',
    role: 'custodian',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormFieldContactsForResourceComponent,
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
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldContactsForResourceComponent)
    component = fixture.componentInstance
    component.control = new FormControl<Individual[]>([])
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize with default values', () => {
    expect(component.rolesToPick).toEqual([
      'resource_provider',
      'custodian',
      'owner',
      'point_of_contact',
      'author',
    ])
    expect(component.rolesToDisplay).toEqual([])
    expect(component.allOrganizations.size).toBe(2)
  })

  it('should fetch users on initialization', () => {
    const platformService = TestBed.inject(PlatformServiceInterface)
    expect(platformService.getUsers).toHaveBeenCalled()
  })

  it('should subscribe to organizations and update the allOrganizations map', () => {
    component.ngOnInit()
    expect(component.allOrganizations.size).toBe(2)
    expect(component.allOrganizations.get('Barbie Inc.')).toEqual(
      organizationBarbie
    )
  })

  it('should add role to rolesToDisplay and remove from rolesToPick', () => {
    component.addRoleToDisplay('owner')
    expect(component.rolesToPick).not.toContain('owner')
    expect(component.rolesToDisplay).toContain('owner')
  })

  it('should remove contact by index', () => {
    component.control.setValue([
      { firstName: 'John', lastName: 'Doe' } as Individual,
    ])
    component.removeContact(0)
    expect(component.control.value.length).toBe(0)
  })

  it('should add a new contact with correct data', async () => {
    const contact = {
      name: 'John',
      surname: 'Doe',
      organisation: 'Org1',
      email: 'john.doe@example.com',
    } as UserModel
    jest
      .spyOn(component, 'getOrganizationByName')
      .mockReturnValue({ name: 'Org1' } as Organization)
    await component.addContact(contact, 'owner')
    expect(component.control.value.length).toBe(1)
    expect(component.control.value[0].firstName).toBe('John')
    expect(component.control.value[0].lastName).toBe('Doe')
    expect(component.control.value[0].organization.name).toBe('Org1')
  })

  it('should handle ngOnChanges and update rolesToDisplay', () => {
    const changes = {
      control: {
        currentValue: {
          value: [contactJane, contactJohn],
        },
        previousValue: { value: [] },
        firstChange: false,
      },
    } as unknown as SimpleChanges
    component.ngOnChanges(changes)
    expect(component.rolesToDisplay).toEqual([
      contactJane.role,
      contactJohn.role,
    ])
  })

  it('should return contacts by role', () => {
    const contacts: Individual[] = [
      { role: 'owner' } as Individual,
      { role: 'custodian' } as Individual,
      { role: 'owner' } as Individual,
    ]
    component.control.setValue(contacts)
    const result = component.getContactsByRole('owner')
    expect(result.length).toBe(2)
  })

  it('should return the correct organization by name', () => {
    const org = { name: 'Org1' } as Organization
    component.allOrganizations.set('Org1', org)
    expect(component.getOrganizationByName('Org1')).toBe(org)
  })
})
