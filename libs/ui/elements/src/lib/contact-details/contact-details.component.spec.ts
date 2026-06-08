import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Individual } from '@geonetwork-ui/common/domain/model/record'
import { TranslateModule } from '@ngx-translate/core'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ContactDetailsComponent } from './contact-details.component'

describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent
  let fixture: ComponentFixture<ContactDetailsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactDetailsComponent, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailsComponent)
    component = fixture.componentInstance
  })

  function render(contact: Individual) {
    component.contact = contact
    fixture.detectChanges()
  }

  it('should create', () => {
    render({ email: 'a@b.com', role: 'author' })
    expect(component).toBeTruthy()
  })

  describe('with full contact', () => {
    beforeEach(() => {
      render({
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@example.com',
        role: 'point_of_contact',
        phone: '+33 1 23 45 67 89',
        address: '10 rue Example, 75001 Paris, France',
        organization: {
          name: 'ACME Corp',
          website: new URL('https://acme.example.com/'),
          logoUrl: new URL('https://acme.example.com/logo.png'),
        },
      })
    })

    it('renders the display name with org', () => {
      const el = fixture.nativeElement.querySelector(
        '[data-test="contact-details-name"]'
      )
      expect(el?.textContent.trim()).toBe('Alice Smith (ACME Corp)')
    })

    it('renders email as mailto link', () => {
      const el = fixture.nativeElement.querySelector(
        '[data-test="contact-details-email"]'
      )
      expect(el?.getAttribute('href')).toBe('mailto:alice@example.com')
      expect(el?.textContent.trim()).toBe('alice@example.com')
    })

    it('renders phone', () => {
      const el = fixture.nativeElement.querySelector(
        '[data-test="contact-details-phone"]'
      )
      expect(el?.textContent.trim()).toBe('+33 1 23 45 67 89')
    })

    it('splits address into lines', () => {
      const el = fixture.nativeElement.querySelector(
        '[data-test="contact-details-address"]'
      )
      const lines = Array.from(el.querySelectorAll('p')).map((p: any) =>
        p.textContent.trim()
      )
      expect(lines).toEqual(['10 rue Example', '75001 Paris', 'France'])
    })

    it('renders the website link', () => {
      const el = fixture.nativeElement.querySelector(
        '[data-test="contact-details-website"]'
      )
      expect(el).toBeTruthy()
    })

    it('renders the org logo thumbnail', () => {
      expect(
        fixture.nativeElement.querySelector('gn-ui-thumbnail')
      ).toBeTruthy()
    })
  })

  describe('with no org (name only)', () => {
    beforeEach(() => {
      render({
        firstName: 'Bob',
        lastName: 'Doe',
        email: 'bob@example.com',
        role: 'author',
      })
    })

    it('shows full name as the display name', () => {
      const el = fixture.nativeElement.querySelector(
        '[data-test="contact-details-name"]'
      )
      expect(el?.textContent.trim()).toBe('Bob Doe')
    })

    it('does not render an org logo thumbnail', () => {
      expect(fixture.nativeElement.querySelector('gn-ui-thumbnail')).toBeNull()
    })
  })

  describe('with org but no website', () => {
    beforeEach(() => {
      render({
        email: 'contact@acme.com',
        role: 'point_of_contact',
        organization: { name: 'ACME Corp' },
      })
    })

    it('shows the website row but no link', () => {
      expect(
        fixture.nativeElement.querySelector(
          '[data-test="contact-details-website"]'
        )
      ).toBeNull()
      expect(
        fixture.nativeElement.querySelector('ng-icon[name="matOpenInNew"]')
      ).toBeTruthy()
    })
  })

  describe('with minimal contact', () => {
    beforeEach(() => {
      render({ email: 'a@b.com', role: 'author' })
    })

    it('hides phone when absent', () => {
      expect(
        fixture.nativeElement.querySelector(
          '[data-test="contact-details-phone"]'
        )
      ).toBeNull()
    })

    it('hides address when absent', () => {
      expect(
        fixture.nativeElement.querySelector(
          '[data-test="contact-details-address"]'
        )
      ).toBeNull()
    })

    it('hides website when absent', () => {
      expect(
        fixture.nativeElement.querySelector(
          '[data-test="contact-details-website"]'
        )
      ).toBeNull()
    })

    it('falls back to the email as display name', () => {
      const el = fixture.nativeElement.querySelector(
        '[data-test="contact-details-name"]'
      )
      expect(el?.textContent.trim()).toBe('a@b.com')
    })
  })
})
