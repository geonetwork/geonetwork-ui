import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Individual } from '@geonetwork-ui/common/domain/model/record'
import { ContactPillComponent } from './contact-pill.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('ContactPillComponent', () => {
  let component: ContactPillComponent
  let fixture: ComponentFixture<ContactPillComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPillComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('displayName', () => {
    it('should return organization name when available', () => {
      component.contact = {
        email: 'a@b.com',
        role: 'author',
        organization: { name: 'My Org' },
        firstName: 'John',
        lastName: 'Doe',
      }
      expect(component.displayName).toBe('My Org')
    })

    it('should return full name when no organization', () => {
      component.contact = {
        email: 'a@b.com',
        role: 'author',
        firstName: 'John',
        lastName: 'Doe',
      }
      expect(component.displayName).toBe('John Doe')
    })

    it('should return empty string when no org or name', () => {
      component.contact = {
        email: 'a@b.com',
        role: 'author',
      }
      expect(component.displayName).toBe('')
    })
  })
})
