import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ContactCardComponent } from './contact-card.component'
import {
  Individual,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'

describe('ContactCardComponent', () => {
  let component: ContactCardComponent
  let fixture: ComponentFixture<ContactCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatIconModule,
        ButtonComponent,
        ContactCardComponent,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should have a defined contact input', () => {
    const mockContact: Individual = {
      firstName: 'John',
      lastName: 'Doe',
      organization: { name: 'Org1' } as Organization,
      email: 'john.doe@example.com',
      role: 'admin',
      address: '',
      phone: '',
      position: '',
    }
    component.contact = mockContact
    fixture.detectChanges()
    expect(component.contact).toEqual(mockContact)
  })

  it('should have a defined organization input', () => {
    const mockOrganization: Organization = {
      name: 'Org1',
    }
    component.organization = mockOrganization
    fixture.detectChanges()
    expect(component.organization).toEqual(mockOrganization)
  })

  it('should emit contactRemoved event with the correct contact', () => {
    const mockContact: Individual = {
      firstName: 'John',
      lastName: 'Doe',
      organization: { name: 'Org1' } as Organization,
      email: 'john.doe@example.com',
      role: 'admin',
      address: '',
      phone: '',
      position: '',
    }
    component.contact = mockContact

    const contactRemovedSpy = jest.spyOn(component.contactRemoved, 'emit')
    component.removeContact(mockContact)
    expect(contactRemovedSpy).toHaveBeenCalledWith(mockContact)
  })
})
