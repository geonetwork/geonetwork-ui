import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { MetadataContactComponent } from './metadata-contact.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('MetadataContactComponent', () => {
  let component: MetadataContactComponent
  let fixture: ComponentFixture<MetadataContactComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataContactComponent)
    component = fixture.componentInstance
    component.metadata = {
      kind: 'dataset',
      ownerOrganization: {
        name: 'Worldcorp',
        website: new URL('https://john.world.co'),
      },
      contactsForResource: [
        {
          name: 'john',
          organization: 'Worldcorp',
          email: 'john@world.co',
          website: 'https://john.world.co',
        },
        {
          name: 'billy',
          organization: 'small corp',
          email: 'billy@small.co',
          website: 'https://billy.small.co',
        },
      ],
    } as any
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  describe('on contact click', () => {
    beforeEach(() => {
      jest.resetAllMocks()
      jest.spyOn(component.organizationClick, 'emit')
    })
    it('emit contact click with contact name', () => {
      const el = fixture.debugElement.query(
        By.css('[data-cy="organization-name-link"]')
      ).nativeElement
      el.click()
      expect(component.organizationClick.emit).toHaveBeenCalledWith({
        name: 'Worldcorp',
        website: new URL('https://john.world.co'),
      })
    })
  })
  describe('content', () => {
    let email
    beforeEach(() => {
      email = fixture.debugElement.queryAll(By.css('a'))[1]
    })
    it('displays the contact name', () => {
      const el = fixture.debugElement.query(
        By.css('[data-cy="organization-name-link"]')
      ).nativeElement
      expect(el.innerHTML).toBe(' Worldcorp ')
    })
    it('displays the contact email', () => {
      expect(email.attributes.href).toBe('mailto:john@world.co')
    })
    it('displays a link to the contact website', () => {
      const a = fixture.debugElement.query(By.css('.contact-website'))
      expect(a.attributes.href).toBe('https://john.world.co/')
      expect(a.attributes.target).toBe('_blank')
    })
  })
})
