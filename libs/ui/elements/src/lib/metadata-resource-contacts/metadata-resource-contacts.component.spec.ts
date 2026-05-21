import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Individual } from '@geonetwork-ui/common/domain/model/record'
import { MetadataResourceContactsComponent } from './metadata-resource-contacts.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('MetadataResourceContactsComponent', () => {
  let component: MetadataResourceContactsComponent
  let fixture: ComponentFixture<MetadataResourceContactsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataResourceContactsComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('contactGroups', () => {
    it('should group contacts by role', () => {
      component.contacts = [
        {
          email: 'alice@org.com',
          role: 'author',
          organization: { name: 'Organization A' },
        },
        {
          email: 'bob@org.com',
          role: 'author',
          organization: { name: 'Organization B' },
        },
        {
          email: 'carol@other.com',
          role: 'custodian',
          organization: { name: 'Organization C' },
        },
      ]
      expect(component.contactGroups.length).toBe(2)
      expect(component.contactGroups[0].role).toBe('author')
      expect(component.contactGroups[0].contacts.length).toBe(2)
      expect(component.contactGroups[1].role).toBe('custodian')
      expect(component.contactGroups[1].contacts.length).toBe(1)
    })

    it('should return empty when no contacts are provided', () => {
      component.contacts = []
      expect(component.contactGroups.length).toBe(0)
    })
  })

  describe('getContactDisplayName', () => {
    it('should return organization name when available', () => {
      const contact: Individual = {
        email: 'a@b.com',
        role: 'author',
        organization: { name: 'My Org' },
        firstName: 'John',
        lastName: 'Doe',
      }
      expect(component.getContactDisplayName(contact)).toBe('My Org')
    })

    it('should return full name when no organization', () => {
      const contact: Individual = {
        email: 'a@b.com',
        role: 'author',
        firstName: 'John',
        lastName: 'Doe',
      }
      expect(component.getContactDisplayName(contact)).toBe('John Doe')
    })

    it('should return email as fallback', () => {
      const contact: Individual = {
        email: 'a@b.com',
        role: 'author',
      }
      expect(component.getContactDisplayName(contact)).toBe('a@b.com')
    })
  })
})
