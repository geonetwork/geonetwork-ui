import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ExternalLinkCardComponent } from './external-link-card.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { aSetOfLinksFixture } from '@geonetwork-ui/common/fixtures'

describe('ExternalLinkCardComponent', () => {
  let component: ExternalLinkCardComponent
  let fixture: ComponentFixture<ExternalLinkCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [provideI18n()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalLinkCardComponent)
    component = fixture.componentInstance
    component.link = {
      name: 'Consulter sur Géoclip',
      description:
        'Lorem ipsum dolor sit amet, consect etur adipiscing elit. Donec id condim entum ex. Etiam sed molestie est.',
      url: new URL('https://example.com/someurlpath'),
      type: 'link',
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('PostGIS links', () => {
    let postgisFixture: ComponentFixture<ExternalLinkCardComponent>
    let postgisComponent: ExternalLinkCardComponent

    beforeEach(() => {
      postgisFixture = TestBed.createComponent(ExternalLinkCardComponent)
      postgisComponent = postgisFixture.componentInstance
      postgisComponent.link = aSetOfLinksFixture().postgisLink()
      postgisFixture.detectChanges()
    })

    it('should identify PostGIS links correctly', () => {
      expect(postgisComponent.isDatabase).toBe(true)
    })

    it('should render as non-clickable for PostGIS links', () => {
      const anchorElement = postgisFixture.nativeElement.querySelector('a')
      expect(anchorElement).toBeNull()
    })
  })

  describe('Regular links', () => {
    it('should not identify regular links as PostGIS', () => {
      expect(component.isDatabase).toBe(false)
    })

    it('should render as clickable for regular links', () => {
      const anchorElement = fixture.nativeElement.querySelector('a')
      expect(anchorElement).toBeTruthy()
    })

    it('should display open-in-new icon for regular links', () => {
      const openIcon = fixture.nativeElement.querySelector(
        'ng-icon[name="matOpenInNew"]'
      )
      expect(openIcon).toBeTruthy()
    })
  })
})
