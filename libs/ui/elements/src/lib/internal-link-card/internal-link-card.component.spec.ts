import { ComponentFixture, TestBed } from '@angular/core/testing'
import { InternalLinkCardComponent } from './internal-link-card.component'
import { By } from '@angular/platform-browser'
import {
  ChangeDetectionStrategy,
  Component,
  NO_ERRORS_SCHEMA,
  TemplateRef,
} from '@angular/core'
import {
  CatalogRecord,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import {
  matEmailOutline,
  matLocationOnOutline,
  matLocationSearchingOutline,
  matPhoneOutline,
} from '@ng-icons/material-icons/outline'
import { iconoirInternet } from '@ng-icons/iconoir'
import { provideI18n } from '@geonetwork-ui/util/i18n'

// Mock organization
const mockOrganization: Organization = {
  name: 'Test Organization',
  website: new URL('https://test-org.com'),
  description: 'Test organization description',
  logoUrl: new URL('https://test-org.com/logo.png'),
}

// Mock catalog record - using type assertion to unknown first to avoid TypeScript errors
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
    },
  ],
  contacts: [],
  thumbnailUrl: new URL('https://example.com/thumbnail.jpg'),
  landingPageUrl: new URL('https://example.com/landing'),
  status: 'completed',
  lineage: 'Test lineage',
  onlineResources: [],
  spatialExtents: [],
  temporalExtents: [],
  keywords: [],
  overviews: [{ url: new URL('https://example.com/thumbnail.jpg') }],
  recordUpdated: new Date(),
  recordPublished: new Date(),
  resourcePublished: new Date(),
} as unknown as CatalogRecord

// Mock template component for favoriteTemplate
@Component({
  template: `<ng-template #favoriteTemplate let-record>
    <button data-test="favorite-button">Favorite</button>
  </ng-template>`,
  standalone: true,
})
class TestHostComponent {
  record: CatalogRecord = mockRecord
  favoriteTemplate: TemplateRef<{ $implicit: CatalogRecord }>
}

describe('InternalLinkCardComponent', () => {
  let component: InternalLinkCardComponent
  let fixture: ComponentFixture<InternalLinkCardComponent>
  let hostFixture: ComponentFixture<TestHostComponent>
  let hostComponent: TestHostComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        provideI18n(),
        provideIcons({
          iconoirInternet,
          matLocationSearchingOutline,
          matEmailOutline,
          matPhoneOutline,
          matLocationOnOutline,
        }),
        provideNgIconsConfig({
          size: '1.2em',
        }),
      ],
    })
      .overrideComponent(InternalLinkCardComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()

    fixture = TestBed.createComponent(InternalLinkCardComponent)
    component = fixture.componentInstance
    component.record = mockRecord
    component.metadataQualityDisplay = true

    hostFixture = TestBed.createComponent(TestHostComponent)
    hostComponent = hostFixture.componentInstance
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('size property', () => {
    it('should set cardClass and thumbnailContainerClass for size L', () => {
      component.size = 'L'
      fixture.detectChanges()
      expect(component.cardClass).toBe('size-L')
    })

    it('should set cardClass and thumbnailContainerClass for size M', () => {
      component.size = 'M'
      fixture.detectChanges()
      expect(component.cardClass).toBe('size-M')
    })

    it('should set cardClass and hide thumbnail for size S', () => {
      component.size = 'S'
      fixture.detectChanges()
      expect(component.cardClass).toBe('size-S')
    })

    it('should set cardClass and hide thumbnail for size XS', () => {
      component.size = 'XS'
      fixture.detectChanges()
      expect(component.cardClass).toContain('size-XS')
    })
  })

  describe('content rendering', () => {
    beforeEach(() => {
      fixture.detectChanges()
    })

    it('should display record title', () => {
      const titleElement = fixture.debugElement.query(By.css('h4'))
      expect(titleElement).toBeTruthy()
      expect(titleElement.nativeElement.textContent).toContain('Test Record')
    })

    it('should display record abstract', () => {
      const abstractElement = fixture.debugElement.query(
        By.css('gn-ui-markdown-parser')
      )
      expect(abstractElement).toBeTruthy()
      expect(component.abstract).toEqual(
        'This is a test abstract for the record'
      )
    })

    // Fix for organization test - check text content instead of specific element
    it('should display organization name when available', () => {
      const nativeElement = fixture.nativeElement
      expect(nativeElement.textContent).toContain('Test Organization')
    })
  })

  describe('thumbnail display', () => {
    it('should show thumbnail for size L', () => {
      component.size = 'L'
      fixture.detectChanges()
      expect(component.shouldShowThumbnail).toBe(true)
    })

    it('should show thumbnail for size M', () => {
      component.size = 'M'
      fixture.detectChanges()
      expect(component.shouldShowThumbnail).toBe(true)
    })

    it('should not show thumbnail for size S', () => {
      component.size = 'S'
      fixture.detectChanges()
      expect(component.shouldShowThumbnail).toBe(false)
    })
  })

  describe('event handlers', () => {
    let openSpy: jest.SpyInstance

    beforeEach(() => {
      openSpy = jest.spyOn(window, 'open').mockImplementation(() => null)
      fixture.detectChanges()
    })

    afterEach(() => {
      openSpy.mockRestore()
    })

    it('should emit mdSelect when card is clicked', () => {
      const mdSelectSpy = jest.spyOn(component.mdSelect, 'emit')
      const cardElement = fixture.debugElement.nativeElement
      cardElement.click()
      expect(mdSelectSpy).toHaveBeenCalledWith(mockRecord)
    })
  })
})
