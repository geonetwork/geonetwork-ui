import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MetadataQualityComponent } from './metadata-quality.component'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { CommonModule } from '@angular/common'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import { PopoverComponent } from '@geonetwork-ui/ui/widgets'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import {
  DatasetRecord,
  ServiceRecord,
  ReuseRecord,
} from '@geonetwork-ui/common/domain/model/record'

describe('MetadataQualityComponent', () => {
  let component: MetadataQualityComponent
  let fixture: ComponentFixture<MetadataQualityComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MetadataQualityComponent,
        UtilSharedModule,
        CommonModule,
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        PopoverComponent,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataQualityComponent)
    component = fixture.componentInstance
    component.metadata = datasetRecordsFixture()[0]
    component.metadataQualityDisplay = true
    component.initialize()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('content', () => {
    expect(component.metadata?.contacts[0]?.email).toBe('bob@org.net')
  })

  it('should show correct default items for dataset type', () => {
    const datasetMetadata = datasetRecordsFixture()[0]
    component.metadata = datasetMetadata
    component.initialize()
    fixture.detectChanges()

    const expectedDatasetItems = [
      { name: 'title', value: true },
      { name: 'description', value: true },
      { name: 'keywords', value: true },
      { name: 'legalConstraints', value: true },
      { name: 'contact', value: true },
      { name: 'updateFrequency', value: true },
      { name: 'topic', value: true },
      { name: 'organisation', value: true },
    ]
    expect(component.items).toEqual(expectedDatasetItems)
    expect(component.calculatedQualityScore).toBe(100) // tous les critères sont remplis
  })

  describe('When i give a dataset, the quality score and items must be corrects', () => {
    it('should show 100 and all items true when all fields are given for service dataset type', () => {
      const serviceMetadata: Partial<ServiceRecord> = {
        kind: 'service',
        title: 'Test Service',
        abstract: 'Test Description',
        contacts: [
          {
            email: 'test@test.com',
            role: 'pointOfContact',
            organization: { name: 'Test Org' },
          },
        ],
        keywords: [
          {
            label: 'test',
            type: 'theme',
          },
        ],
        legalConstraints: [{ text: 'test constraint' }],
        onlineResources: [
          {
            type: 'endpoint',
            url: new URL('https://my-org.net/wfs?REQUEST=GetCapabilities'),
            accessServiceProtocol: 'wfs',
            description: 'Test service',
          },
        ],
        spatialExtents: [],
      }
      component.metadata = serviceMetadata
      component.initialize()
      fixture.detectChanges()

      const expectedServiceItems = [
        { name: 'title', value: true },
        { name: 'description', value: true },
        { name: 'keywords', value: true },
        { name: 'legalConstraints', value: true },
        { name: 'contact', value: true },
        { name: 'capabilities', value: true },
      ]
      expect(component.items).toEqual(expectedServiceItems)
      expect(component.calculatedQualityScore).toBe(100)
    })

    it('should show 100 and all items true when all fields are given for reuse dataset type', () => {
      const reuseMetadata: Partial<ReuseRecord> = {
        kind: 'reuse',
        title: 'Test Reuse',
        abstract: 'Test Description',
        contacts: [
          {
            email: 'test@test.com',
            role: 'pointOfContact',
            organization: { name: 'Test Org' },
          },
        ],
        keywords: [
          {
            label: 'test',
            type: 'theme',
          },
        ],
        legalConstraints: [{ text: 'test constraint' }],
        topics: ['testTopic'],
        onlineResources: [
          {
            type: 'link',
            url: new URL('http://test.com'),
            name: 'Test Link',
          },
        ],
        extras: {
          catalogUuid: 'test-uuid',
        },
        lineage: 'Test lineage',
        spatialExtents: [],
        temporalExtents: [],
      }
      component.metadata = reuseMetadata
      component.initialize()
      fixture.detectChanges()

      const expectedReuseItems = [
        { name: 'title', value: true },
        { name: 'description', value: true },
        { name: 'keywords', value: true },
        { name: 'legalConstraints', value: true },
        { name: 'contact', value: true },
        { name: 'topic', value: true },
        { name: 'organisation', value: true },
        { name: 'source', value: true },
      ]
      expect(component.items).toEqual(expectedReuseItems)
      expect(component.calculatedQualityScore).toBe(100)
    })

    it('should calculate quality percentage correctly with partial data', () => {
      const partialMetadata: Partial<DatasetRecord> = {
        kind: 'dataset',
        title: 'Test Title',
        abstract: 'Test Description',
        keywords: [],
        contacts: [],
        topics: [],
        legalConstraints: [],
        status: 'completed',
        lineage: '',
        onlineResources: [],
        spatialExtents: [],
        temporalExtents: [],
      }
      component.metadata = partialMetadata
      component.initialize()
      fixture.detectChanges()

      expect(component.calculatedQualityScore).toBe(25)
    })

    it('should verify specific Dataset items in partial data test', () => {
      const partialMetadata: Partial<DatasetRecord> = {
        kind: 'dataset',
        title: 'Test Title',
        abstract: 'Test Description',
        keywords: [],
        contacts: [],
        topics: [],
        legalConstraints: [],
        status: 'completed',
        lineage: '',
        onlineResources: [],
        spatialExtents: [],
        temporalExtents: [],
      }
      component.metadata = partialMetadata
      component.initialize()
      fixture.detectChanges()

      const expectedItems = [
        { name: 'title', value: true },
        { name: 'description', value: true },
        { name: 'keywords', value: false },
        { name: 'legalConstraints', value: false },
        { name: 'contact', value: false },
        { name: 'updateFrequency', value: false },
        { name: 'topic', value: false },
        { name: 'organisation', value: false },
      ]
      expect(component.items).toEqual(expectedItems)
      expect(component.calculatedQualityScore).toBe(25) // 2 sur 8 items remplis
    })

    it('should show all items at false and quality score at 0 when nothing was given', () => {
      const emptyMetadata: Partial<DatasetRecord> = {
        kind: 'dataset',
        title: '',
        abstract: undefined,
        keywords: [],
        contacts: [],
        topics: [],
        legalConstraints: [],
        status: 'completed',
        lineage: '',
        onlineResources: [],
        spatialExtents: [],
        temporalExtents: [],
      }
      component.metadata = emptyMetadata
      component.initialize()
      fixture.detectChanges()

      expect(component.items.every((item) => !item.value)).toBe(true)
      expect(component.items.length).toBe(8)
      expect(component.calculatedQualityScore).toBe(0)
    })

    it('should show partial quality score for service type with missing fields', () => {
      const partialServiceMetadata: Partial<ServiceRecord> = {
        kind: 'service',
        title: 'Test Service',
        abstract: 'Test Description',
        keywords: [],
        contacts: [],
        legalConstraints: [],
        onlineResources: [],
        spatialExtents: [],
      }
      component.metadata = partialServiceMetadata
      component.initialize()
      fixture.detectChanges()

      expect(component.items.length).toBe(6)
      expect(component.calculatedQualityScore).toBe(33) // Only title and description are filled
    })

    it('should verify specific Reuse items in partial data test', () => {
      const partialReuseMetadata: Partial<ReuseRecord> = {
        kind: 'reuse',
        title: 'Test Reuse',
        abstract: 'Test Description',
        contacts: [
          {
            email: 'test@test.com',
            role: 'pointOfContact',
            organization: { name: 'Test Org' },
          },
        ],
        keywords: [],
        legalConstraints: [],
        topics: [],
        onlineResources: [],
        extras: {},
      }
      component.metadata = partialReuseMetadata
      component.initialize()
      fixture.detectChanges()

      const expectedItems = [
        { name: 'title', value: true },
        { name: 'description', value: true },
        { name: 'keywords', value: false },
        { name: 'legalConstraints', value: false },
        { name: 'contact', value: true },
        { name: 'topic', value: false },
        { name: 'organisation', value: true },
        { name: 'source', value: false },
      ]
      expect(component.items).toEqual(expectedItems)
      expect(component.calculatedQualityScore).toBe(50) // 4 sur 8 items remplis
    })

    it('should verify specific Service items in partial data test', () => {
      const partialServiceMetadata: Partial<ServiceRecord> = {
        kind: 'service',
        title: 'Test Service',
        abstract: 'Test Description',
        contacts: [
          {
            email: 'test@test.com',
            role: 'pointOfContact',
          },
        ],
        keywords: [],
        legalConstraints: [],
        onlineResources: [
          {
            type: 'endpoint',
            url: new URL('https://my-org.net/wfs?REQUEST=GetCapabilities'),
            accessServiceProtocol: 'wfs',
          },
        ],
      }
      component.metadata = partialServiceMetadata
      component.initialize()
      fixture.detectChanges()

      const expectedItems = [
        { name: 'title', value: true },
        { name: 'description', value: true },
        { name: 'keywords', value: false },
        { name: 'legalConstraints', value: false },
        { name: 'contact', value: true },
        { name: 'capabilities', value: true },
      ]
      expect(component.items).toEqual(expectedItems)
      expect(component.calculatedQualityScore).toBe(67) // 4 sur 6 items remplis
    })

    it('should show partial quality score for reuse type with missing fields', () => {
      const partialReuseMetadata: Partial<ReuseRecord> = {
        kind: 'reuse',
        title: 'Test Reuse',
        abstract: 'Test Description',
        contacts: [
          {
            email: 'test@test.com',
            organization: { name: 'Test Org' },
            role: 'pointOfContact',
          },
        ],
        keywords: [],
        legalConstraints: [],
        topics: [],
        onlineResources: [],
        extras: {},
        lineage: '',
        spatialExtents: [],
        temporalExtents: [],
      }
      component.metadata = partialReuseMetadata
      component.initialize()
      fixture.detectChanges()

      expect(component.items.length).toBe(8)
      expect(component.calculatedQualityScore).toBe(50) // Title, description, contact, and organisation are filled
    })

    it('should show 100% quality score for complete dataset type', () => {
      const completeDatasetMetadata: Partial<DatasetRecord> = {
        kind: 'dataset',
        title: 'Complete Dataset',
        abstract: 'Complete Dataset Description',
        keywords: [{ label: 'test', type: 'theme' }],
        contacts: [
          {
            email: 'test@test.com',
            organization: { name: 'Test Organization' },
            role: 'pointOfContact',
          },
        ],
        topics: ['environment'],
        legalConstraints: [{ text: 'test constraint' }],
        updateFrequency: 'daily',
        status: 'completed',
        lineage: 'Test lineage',
        onlineResources: [],
        spatialExtents: [],
        temporalExtents: [],
      }
      component.metadata = completeDatasetMetadata
      component.initialize()
      fixture.detectChanges()

      expect(component.items.length).toBe(8)
      expect(component.calculatedQualityScore).toBe(100)
      expect(component.items.every((item) => item.value)).toBe(true)
    })

    it('should calculate quality percentage correctly with partial Service data', () => {
      const partialServiceMetadata: Partial<ServiceRecord> = {
        kind: 'service',
        title: 'Test Service',
        abstract: 'Test Description',
        contacts: [
          {
            email: 'test@test.com',
            role: 'pointOfContact',
          },
        ],
        keywords: [],
        legalConstraints: [],
        onlineResources: [
          {
            type: 'endpoint',
            url: new URL('https://my-org.net/wfs?request=getmap'),
            accessServiceProtocol: 'wfs',
          },
        ],
      }
      component.metadata = partialServiceMetadata
      component.initialize()
      fixture.detectChanges()

      expect(component.calculatedQualityScore).toBe(50) // 3 out of 6 items are filled (title, description, contact)
    })

    it('should calculate quality percentage correctly with partial Reuse data', () => {
      const partialReuseMetadata: Partial<ReuseRecord> = {
        kind: 'reuse',
        title: 'Test Reuse',
        abstract: 'Test Description',
        contacts: [
          {
            email: 'test@test.com',
            role: 'pointOfContact',
          },
        ],
        keywords: [],
        legalConstraints: [],
        topics: [],
        onlineResources: [],
        extras: {},
      }
      component.metadata = partialReuseMetadata
      component.initialize()
      fixture.detectChanges()

      expect(component.calculatedQualityScore).toBe(38) // 3 out of 8 items are filled (title, description, contact)
    })

    it('should show 100% quality score when all required Dataset fields are filled', () => {
      const completeDatasetMetadata: Partial<DatasetRecord> = {
        kind: 'dataset',
        title: 'Complete Dataset',
        abstract: 'A complete dataset with all required fields',
        contacts: [
          {
            email: 'contact@org.com',
            role: 'pointOfContact',
            organization: { name: 'Test Organization' },
          },
        ],
        keywords: [{ label: 'test', type: 'theme' }],
        legalConstraints: [{ text: 'legal constraint' }],
        topics: ['environment'],
        updateFrequency: 'daily',
        status: 'completed',
        lineage: 'Dataset lineage',
        onlineResources: [
          {
            type: 'download',
            url: new URL('https://test.org/data'),
            name: 'Download Link',
          },
        ],
        spatialExtents: [
          {
            bbox: [0, 0, 1, 1],
            description: 'Test extent',
          },
        ],
        temporalExtents: [],
      }
      component.metadata = completeDatasetMetadata
      component.initialize()
      fixture.detectChanges()

      expect(component.items.length).toBe(8)
      expect(component.calculatedQualityScore).toBe(100)
      expect(component.items.every((item) => item.value)).toBe(true)
    })

    it('should verify specific Dataset items with update frequency and spatial extent', () => {
      const datasetWithSpecificFields: Partial<DatasetRecord> = {
        kind: 'dataset',
        title: 'Test Dataset',
        abstract: 'Test Description',
        contacts: [],
        keywords: [],
        topics: [],
        legalConstraints: [],
        updateFrequency: 'daily',
        status: 'completed',
        spatialExtents: [
          {
            bbox: [0, 0, 1, 1],
            description: 'Test extent',
          },
        ],
        temporalExtents: [],
        onlineResources: [],
      }
      component.metadata = datasetWithSpecificFields
      component.initialize()
      fixture.detectChanges()

      const expectedItems = [
        { name: 'title', value: true },
        { name: 'description', value: true },
        { name: 'keywords', value: false },
        { name: 'legalConstraints', value: false },
        { name: 'contact', value: false },
        { name: 'updateFrequency', value: true },
        { name: 'topic', value: false },
        { name: 'organisation', value: false },
      ]
      expect(component.items).toEqual(expectedItems)
      expect(component.calculatedQualityScore).toBe(38) // 3 sur 8 items remplis
    })

    it('should verify specific Dataset items with topics and contacts', () => {
      const datasetWithTopicsAndContacts: Partial<DatasetRecord> = {
        kind: 'dataset',
        title: 'Test Dataset',
        abstract: 'Test Description',
        contacts: [
          {
            email: 'test@test.com',
            role: 'pointOfContact',
            organization: { name: 'Test Organization' },
          },
        ],
        keywords: [],
        topics: ['environment', 'climate'],
        legalConstraints: [],
        status: 'completed',
        spatialExtents: [],
        temporalExtents: [],
        onlineResources: [],
      }
      component.metadata = datasetWithTopicsAndContacts
      component.initialize()
      fixture.detectChanges()

      const expectedItems = [
        { name: 'title', value: true },
        { name: 'description', value: true },
        { name: 'keywords', value: false },
        { name: 'legalConstraints', value: false },
        { name: 'contact', value: true },
        { name: 'updateFrequency', value: false },
        { name: 'topic', value: true },
        { name: 'organisation', value: true },
      ]
      expect(component.items).toEqual(expectedItems)
      expect(component.calculatedQualityScore).toBe(63) // 6 sur 8 items remplis
    })

    it('should verify specific Dataset items with lineage and keywords', () => {
      const datasetWithLineageAndKeywords: Partial<DatasetRecord> = {
        kind: 'dataset',
        title: 'Test Dataset',
        abstract: 'Test Description',
        contacts: [],
        keywords: [{ label: 'test', type: 'theme' }],
        topics: [],
        legalConstraints: [],
        lineage: 'This is the data lineage',
        status: 'completed',
        spatialExtents: [],
        temporalExtents: [],
        onlineResources: [],
      }
      component.metadata = datasetWithLineageAndKeywords
      component.initialize()
      fixture.detectChanges()

      const expectedItems = [
        { name: 'title', value: true },
        { name: 'description', value: true },
        { name: 'keywords', value: true },
        { name: 'legalConstraints', value: false },
        { name: 'contact', value: false },
        { name: 'updateFrequency', value: false },
        { name: 'topic', value: false },
        { name: 'organisation', value: false },
      ]
      expect(component.items).toEqual(expectedItems)
      expect(component.calculatedQualityScore).toBe(38) // 3 sur 8 items remplis
    })
  })
})
