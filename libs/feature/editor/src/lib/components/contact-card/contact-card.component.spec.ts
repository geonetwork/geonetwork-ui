import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ContactCardComponent } from './contact-card.component'
import {
  Individual,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'
import {
  AutocompleteComponent,
  ButtonComponent,
} from '@geonetwork-ui/ui/inputs'
import { ChangeDetectionStrategy } from '@angular/core'

describe('ContactCardComponent', () => {
  let component: ContactCardComponent
  let fixture: ComponentFixture<ContactCardComponent>

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatIconModule,
        ButtonComponent,
        ContactCardComponent,
      ],
    })
      .overrideComponent(AutocompleteComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCardComponent)
    component = fixture.componentInstance
    component.contact = mockContact
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should emit contactRemoved event with the correct contact', () => {
    const contactRemovedSpy = jest.spyOn(component.contactRemoved, 'emit')
    component.removeContact(mockContact)
    expect(contactRemovedSpy).toHaveBeenCalledWith(mockContact)
  })
})