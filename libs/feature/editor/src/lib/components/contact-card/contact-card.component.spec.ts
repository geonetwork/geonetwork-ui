import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ContactCardComponent } from './contact-card.component'
import {
  Individual,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
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
      imports: [CommonModule, ButtonComponent, ContactCardComponent],
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
})
