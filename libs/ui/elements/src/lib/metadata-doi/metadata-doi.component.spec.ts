import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { MetadataDoiComponent } from './metadata-doi.component.js'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('MetadataDoiComponent', () => {
  let component: MetadataDoiComponent
  let fixture: ComponentFixture<MetadataDoiComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(MetadataDoiComponent)
    component = fixture.componentInstance
    component.code = '10.1234/example.doi'
    component.link = 'https://doi.org/10.1234/example.doi'
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('content', () => {
    it('displays the DOI code', () => {
      const doiText = fixture.debugElement.query(
        By.css('p.text-base.font-medium.overflow-hidden')
      )
      expect(doiText.nativeElement.textContent.trim()).toBe(
        '10.1234/example.doi'
      )
    })

    it('displays the link button when link is provided', () => {
      const linkButton = fixture.debugElement.query(
        By.css('a[target="_blank"]')
      )
      expect(linkButton).toBeTruthy()
      expect(linkButton.nativeElement.href).toBe(
        'https://doi.org/10.1234/example.doi'
      )
    })

    it('does not display link button when link is null', () => {
      component.link = null
      fixture.detectChanges()
      const linkButton = fixture.debugElement.query(
        By.css('a[target="_blank"]')
      )
      expect(linkButton).toBeNull()
    })
  })
})
