import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ContactDetailsFormComponent } from './contact-details-form.component'
import {
  Individual,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('ContactDetailsFormComponent', () => {
  let component: ContactDetailsFormComponent
  let fixture: ComponentFixture<ContactDetailsFormComponent>

  const mockContact: Individual = {
    firstName: 'John',
    lastName: 'Doe',
    organization: {
      name: 'Org1',
      email: 'john.doe@example.com',
    } as Organization,
    email: '',
    role: 'point_of_contact',
    address: '',
    phone: '',
    position: '',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactDetailsFormComponent],
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(ContactDetailsFormComponent)
    component = fixture.componentInstance
    component.contact = mockContact
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('emitting changes', () => {
    let emitted: Individual

    beforeEach(() => {
      emitted = undefined
      component.contactChange.subscribe((c) => (emitted = c))
    })

    it('emits the updated first name', () => {
      component.handleFirstNameChange('Jane')
      expect(emitted).toEqual({ ...mockContact, firstName: 'Jane' })
    })

    it('emits the updated last name', () => {
      component.handleLastNameChange('Smith')
      expect(emitted).toEqual({ ...mockContact, lastName: 'Smith' })
    })

    it('emits the updated email', () => {
      component.handleEmailChange('jane@example.com')
      expect(emitted).toEqual({
        ...mockContact,
        organization: {
          ...mockContact.organization,
          email: 'jane@example.com',
        },
      })
    })

    it('emits the updated organization name', () => {
      component.handleOrganizationChange('New Org')
      expect(emitted).toEqual({
        ...mockContact,
        organization: { ...mockContact.organization, name: 'New Org' },
      })
    })
  })

  describe('with an empty contact', () => {
    const emptyContact: Individual = {
      firstName: '',
      lastName: '',
      organization: { name: '', email: '' } as Organization,
      email: '',
      role: 'unspecified',
    }

    beforeEach(() => {
      component.contact = emptyContact
    })

    it('emits the typed first name preserving other empty fields', () => {
      let emitted: Individual
      component.contactChange.subscribe((c) => (emitted = c))
      component.handleFirstNameChange('Jane')
      expect(emitted).toEqual({ ...emptyContact, firstName: 'Jane' })
    })
  })
})
