import { ComponentFixture, TestBed } from '@angular/core/testing'
import { InternalLinkCardContactComponent } from './internal-link-card-contact.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import {
  matEmailOutline,
  matPhoneOutline,
  matLocationOnOutline,
} from '@ng-icons/material-icons/outline'
import { iconoirInternet } from '@ng-icons/iconoir'
import { TranslateModule } from '@ngx-translate/core'
import {
  CatalogRecord,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'

// Mock organization
const mockOrganization: Organization = {
  name: 'Test Organization',
  website: new URL('https://test-org.com'),
  description: 'Test organization description',
  logoUrl: new URL('https://test-org.com/logo.png'),
}

// Mock catalog record
const mockRecord = {
  uniqueIdentifier: '123',
  title: 'Test Record',
  abstract: 'This is a test abstract for the record',
  kind: 'dataset' as 'dataset' | 'reuse' | 'service',
  ownerOrganization: mockOrganization,
  contactsForResource: [
    {
      email: 'test@example.com',
      organization: 'Test Org',
      position: 'Tester',
      role: 'pointOfContact',
      phone: '+1234567890',
      address: '123 Test Street',
    },
  ],
  contacts: [],
} as unknown as CatalogRecord

const mockRecordWithoutContact = {
  ...mockRecord,
  ownerOrganization: null,
  contactsForResource: [],
  contacts: [],
} as unknown as CatalogRecord

describe('InternalLinkCardContactComponent', () => {
  let component: InternalLinkCardContactComponent
  let fixture: ComponentFixture<InternalLinkCardContactComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalLinkCardContactComponent, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        provideIcons({
          iconoirInternet,
          matEmailOutline,
          matPhoneOutline,
          matLocationOnOutline,
        }),
        provideNgIconsConfig({
          size: '1.2em',
        }),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(InternalLinkCardContactComponent)
    component = fixture.componentInstance
    component.record = mockRecord
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('organization getter', () => {
    it('returns ownerOrganization from record', () => {
      expect(component.organization).toBe(mockRecord.ownerOrganization)
    })

    it('returns null when no ownerOrganization', () => {
      component.record = mockRecordWithoutContact
      expect(component.organization).toBeNull()
    })
  })

  describe('contacts getter', () => {
    it('returns contactsForResource for dataset records', () => {
      component.record.kind = 'dataset'
      expect(component.contacts).toEqual(mockRecord.contactsForResource)
    })

    it('returns contacts for non-dataset records', () => {
      component.record.kind = 'service'
      expect(component.contacts).toEqual(mockRecord.contacts)
    })

    it('returns empty array when no contacts available', () => {
      component.record = mockRecordWithoutContact
      expect(component.contacts).toEqual([])
    })
  })

  describe('event handlers', () => {
    let openSpy: jest.SpyInstance
    let writeSpy: jest.SpyInstance

    beforeEach(() => {
      openSpy = jest.spyOn(window, 'open').mockImplementation(() => null)
      if (!navigator.clipboard) {
        Object.defineProperty(navigator, 'clipboard', {
          value: {
            writeText: jest.fn().mockImplementation(() => Promise.resolve()),
          },
          writable: true,
        })
      }
      writeSpy = jest.spyOn(navigator.clipboard, 'writeText')
    })

    afterEach(() => {
      openSpy.mockRestore()
      writeSpy.mockRestore()
    })
    it('should open external URL in new window', () => {
      const url = new URL('https://test-url.com')
      const mockEvent = new Event('click')
      jest.spyOn(mockEvent, 'stopPropagation').mockImplementation()
      component.openExternalUrl(mockEvent, url)
      expect(openSpy).toHaveBeenCalledWith(url, '_blank')
    })

    it('should open mailto link', () => {
      const email = 'test@example.com'
      const mockEvent = new Event('click')
      jest.spyOn(mockEvent, 'stopPropagation').mockImplementation()
      component.openMailto(mockEvent, email)
      expect(openSpy).toHaveBeenCalledWith(`mailto:${email}`, '_blank')
    })

    it('should copy text to clipboard', () => {
      const text = '+1234567890'
      const mockEvent = new Event('click')
      jest.spyOn(mockEvent, 'stopPropagation').mockImplementation()
      component.copyToClipboard(mockEvent, text)
      expect(writeSpy).toHaveBeenCalledWith(text)
    })
  })
})
