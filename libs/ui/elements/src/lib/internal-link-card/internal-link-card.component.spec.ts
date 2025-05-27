import { ComponentFixture, TestBed } from '@angular/core/testing'
import { InternalLinkCardComponent } from './internal-link-card.component'
import { By } from '@angular/platform-browser'
import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import {
  CatalogRecord,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import {
  matLocationSearchingOutline,
  matEmailOutline,
  matPhoneOutline,
  matLocationOnOutline,
} from '@ng-icons/material-icons/outline'
import { iconoirInternet } from '@ng-icons/iconoir'

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

const mockRecordWithoutContact = {
  ...mockRecord,
  ownerOrganization: null,
  contactsForResource: [],
  contacts: [],
} as unknown as CatalogRecord

// Mock template component for favoriteTemplate
@Component({
  template: `<ng-template #favoriteTemplate let-record>
    <button data-test="favorite-button">Favorite</button>
  </ng-template>`,
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
      imports: [InternalLinkCardComponent, TranslateModule.forRoot()],
      declarations: [TestHostComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
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
      expect(component.cardClass).toContain('min-h-[190px]')
      expect(component.thumbnailContainerClass).toContain('w-[190px]')
    })

    it('should set cardClass and thumbnailContainerClass for size M', () => {
      component.size = 'M'
      fixture.detectChanges()
      expect(component.cardClass).toContain('min-h-[140px]')
      expect(component.thumbnailContainerClass).toContain('w-[110px]')
    })

    it('should set cardClass and hide thumbnail for size S', () => {
      component.size = 'S'
      fixture.detectChanges()
      expect(component.cardClass).toContain('min-h-[220px]')
      expect(component.thumbnailContainerClass).toBe('hidden')
    })

    it('should set cardClass and hide thumbnail for size XS', () => {
      component.size = 'XS'
      fixture.detectChanges()
      expect(component.cardClass).toContain('min-h-[108px]')
      expect(component.thumbnailContainerClass).toBe('hidden')
    })
  })

  describe('content rendering', () => {
    beforeEach(() => {
      fixture.detectChanges()
    })

    it('should display record title', () => {
      const titleElement = fixture.debugElement.query(
        By.css(
          '.font-title, h1, h2, h3, h4, [class*="title"], [data-test="title"]'
        )
      )
      expect(titleElement).toBeTruthy()
      expect(titleElement.nativeElement.textContent).toContain('Test Record')
    })

    it('should display record abstract', () => {
      const abstractElement = fixture.debugElement.query(
        By.css(
          'gn-ui-markdown-parser, p, [class*="abstract"], [data-test="abstract"]'
        )
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

  describe('getAbstractClass with owner organization', () => {
    beforeEach(() => {
      component.record = mockRecord
    })

    it('returns the right line-clamp for L size ', () => {
      component.size = 'L'
      expect(component.getAbstractClass()).toBe('line-clamp-2')
    })
  })

  describe('getAbstractClass without owner organization', () => {
    beforeEach(() => {
      component.record = mockRecordWithoutContact
    })

    it('returns the right line-clamp for each size', () => {
      component.size = 'L'
      expect(component.getAbstractClass()).toBe('line-clamp-6')
      component.size = 'M'
      expect(component.getAbstractClass()).toBe('line-clamp-2')
      component.size = 'S'
      expect(component.getAbstractClass()).toBe('line-clamp-2 ml-2')
    })
  })

  describe('displayAbstract with owner organization', () => {
    beforeEach(() => {
      component.record = mockRecord
    })

    it('returns true for size L', () => {
      component.size = 'L'
      expect(component.displayAbstract()).toBe(true)
    })

    it('returns false for all other size M', () => {
      component.size = 'M'
      expect(component.displayAbstract()).toBe(false)
      component.size = 'S'
      expect(component.displayAbstract()).toBe(false)
      component.size = 'XS'
      expect(component.displayAbstract()).toBe(false)
    })
  })

  describe('displayAbstract without owner organization', () => {
    beforeEach(() => {
      component.record = mockRecordWithoutContact
    })
    it('returns false for size XS', () => {
      component.size = 'XS'
      expect(component.displayAbstract()).toBe(false)
    })
    it('returns true for all other size', () => {
      component.size = 'L'
      expect(component.displayAbstract()).toBe(true)
      component.size = 'M'
      expect(component.displayAbstract()).toBe(true)
      component.size = 'S'
      expect(component.displayAbstract()).toBe(true)
    })
  })
})
