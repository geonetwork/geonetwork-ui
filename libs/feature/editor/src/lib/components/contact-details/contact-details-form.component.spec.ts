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
    } as Organization,
    email: 'john.doe@example.com',
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

  it('renders the email field as an email input', () => {
    const emailInput = fixture.nativeElement.querySelector(
      '[data-test="contactDetailsEmail"] input'
    )
    expect(emailInput.getAttribute('type')).toEqual('email')
  })

  describe('emitting changes', () => {
    let emitted: Individual

    beforeEach(() => {
      emitted = undefined
      component.contactChange.subscribe((c) => (emitted = c))
    })

    it('emits the updated first name', () => {
      component.handleChange({ firstName: 'Jane' })
      expect(emitted).toEqual({ ...mockContact, firstName: 'Jane' })
    })

    it('emits the updated last name', () => {
      component.handleChange({ lastName: 'Smith' })
      expect(emitted).toEqual({ ...mockContact, lastName: 'Smith' })
    })

    it('emits the updated email', () => {
      component.handleChange({ email: 'jane@example.com' })
      expect(emitted).toEqual({ ...mockContact, email: 'jane@example.com' })
    })

    it('emits the updated organization name', () => {
      component.handleOrganizationChange({ name: 'New Org' })
      expect(emitted).toEqual({
        ...mockContact,
        organization: { ...mockContact.organization, name: 'New Org' },
      })
    })

    it('does not mutate the input contact', () => {
      component.handleChange({ firstName: 'Jane' })
      component.handleOrganizationChange({ name: 'New Org' })
      expect(component.contact).toEqual(mockContact)
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
      component.handleChange({ firstName: 'Jane' })
      expect(emitted).toEqual({ ...emptyContact, firstName: 'Jane' })
    })
  })

  describe('when organization is undefined', () => {
    beforeEach(() => {
      component.contact = {
        firstName: 'John',
        lastName: 'Doe',
        email: '',
        role: 'unspecified',
        organization: undefined,
      }
    })

    it('creates the organization when setting the name', () => {
      let emitted: Individual
      component.contactChange.subscribe((c) => (emitted = c))
      component.handleOrganizationChange({ name: 'New Org' })
      expect(emitted.organization).toEqual({ name: 'New Org' })
    })
  })
})
