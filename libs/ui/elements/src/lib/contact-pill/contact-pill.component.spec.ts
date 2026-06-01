import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
} from '@angular/core/testing'
import { OverlayContainer } from '@angular/cdk/overlay'
import { TranslateModule } from '@ngx-translate/core'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ContactPillComponent } from './contact-pill.component'

describe('ContactPillComponent', () => {
  let component: ContactPillComponent
  let fixture: ComponentFixture<ContactPillComponent>
  let overlayContainer: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPillComponent, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPillComponent)
    component = fixture.componentInstance
    component.contact = { email: 'a@b.com', role: 'author' }
    overlayContainer = TestBed.inject(OverlayContainer).getContainerElement()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('displayName', () => {
    it('returns org and full name when available', () => {
      component.contact = {
        email: 'a@b.com',
        role: 'author',
        organization: { name: 'My Org' },
        firstName: 'John',
        lastName: 'Doe',
      }
      expect(component.displayName).toBe('John Doe (My Org)')
    })

    it('returns full name when no organization', () => {
      component.contact = {
        email: 'a@b.com',
        role: 'author',
        firstName: 'John',
        lastName: 'Doe',
      }
      expect(component.displayName).toBe('John Doe')
    })

    it('returns email when no org or name', () => {
      component.contact = { email: 'a@b.com', role: 'author' }
      expect(component.displayName).toBe('a@b.com')
    })
  })

  describe('overlay', () => {
    it('is closed by default', () => {
      expect(component.overlayOpen).toBe(false)
    })

    it('opens on trigger click and renders contact-details in the overlay', fakeAsync(() => {
      const btn: HTMLButtonElement =
        fixture.nativeElement.querySelector('button')
      btn.click()
      flush()
      fixture.detectChanges()
      expect(component.overlayOpen).toBe(true)
      expect(
        overlayContainer.querySelector('gn-ui-contact-details')
      ).toBeTruthy()
    }))

    it('closes on re-click of the trigger', fakeAsync(() => {
      const btn: HTMLButtonElement =
        fixture.nativeElement.querySelector('button')
      btn.click()
      flush()
      fixture.detectChanges()

      btn.click()
      flush()
      fixture.detectChanges()
      expect(component.overlayOpen).toBe(false)
      expect(
        overlayContainer.querySelector('gn-ui-contact-details')
      ).toBeFalsy()
    }))

    it('closes on outside click', fakeAsync(() => {
      const btn: HTMLButtonElement =
        fixture.nativeElement.querySelector('button')
      btn.click()
      flush()
      fixture.detectChanges()

      document.body.click()
      flush()
      fixture.detectChanges()
      expect(component.overlayOpen).toBe(false)
    }))
  })
})
