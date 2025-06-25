import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MetadataQualityComponent } from './metadata-quality.component'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import {
  DatasetRecord,
  ReuseRecord,
  ServiceRecord,
} from '@geonetwork-ui/common/domain/model/record'

describe('MetadataQualityComponent', () => {
  let component: MetadataQualityComponent
  let fixture: ComponentFixture<MetadataQualityComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideI18n()],
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

  it('should show correct quality score an item presence for a sample dataset ', () => {
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
    expect(component.calculatedQualityScore).toBe(100)
  })

  describe('When a dataset record is provided, the quality score and items must be correct', () => {
    it('should display correct quality score and items presence in a partial record', () => {
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
      expect(component.calculatedQualityScore).toBe(25)
    })

    it('should display all items absent and quality score at 0 when nothing was given', () => {
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

      expect(component.items.every((item) => item.value)).toBe(false)
      expect(component.items.length).toBe(8)
      expect(component.calculatedQualityScore).toBe(0)
    })

    it('should show all items present and 100% quality score for a complete dataset (all needed field given)', () => {
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
        status: '',
        lineage: '',
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

    it('should verify specific Dataset items', () => {
      const datasetWithTopicsAndContacts: Partial<DatasetRecord> = {
        kind: 'dataset',
        title: '',
        abstract: '',
        contacts: [
          {
            email: '',
            organization: { name: 'Test Organization' },
            role: 'pointOfContact',
          },
        ],
        keywords: [],
        topics: ['environment', 'climate'],
        legalConstraints: [],
        updateFrequency: 'daily',
        status: 'completed',
        spatialExtents: [],
        temporalExtents: [],
        onlineResources: [],
      }
      component.metadata = datasetWithTopicsAndContacts
      component.initialize()
      fixture.detectChanges()

      const expectedItems = [
        { name: 'title', value: false },
        { name: 'description', value: false },
        { name: 'keywords', value: false },
        { name: 'legalConstraints', value: false },
        { name: 'contact', value: false },
        { name: 'updateFrequency', value: true },
        { name: 'topic', value: true },
        { name: 'organisation', value: true },
      ]
      expect(component.items).toEqual(expectedItems)
      expect(component.calculatedQualityScore).toBe(38)
    })
  })
  describe('When a service record is provided, the quality score and items must be correct', () => {
    it('should show 0 and all items false when no fields are given for service record', () => {
      const partialServiceMetadata: Partial<ServiceRecord> = {
        kind: 'service',
        title: '',
        abstract: '',
        keywords: [],
        contacts: [],
        legalConstraints: [],
        onlineResources: [],
        spatialExtents: [],
      }
      component.metadata = partialServiceMetadata
      component.initialize()
      fixture.detectChanges()
      expect(component.items.every((item) => item.value)).toBe(false)
      expect(component.items.length).toBe(6)
      expect(component.calculatedQualityScore).toBe(0)
    })
  })

  it('should show 100 and all items true when all needed fields are given for service record', () => {
    const serviceMetadata: Partial<ServiceRecord> = {
      kind: 'service',
      title: 'Test Service',
      abstract: 'Test Description',
      contacts: [
        {
          email: 'test@test.com',
          role: 'pointOfContact',
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
  describe('When a reuse record is provided, the quality score and items must be correct', () => {
    it('should show quality score at 0 and all items false when all fields empty for reuse record', () => {
      const partialReuseMetadata: Partial<ReuseRecord> = {
        kind: 'reuse',
        title: '',
        abstract: '',
        contacts: [
          {
            email: '',
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
      expect(component.items.every((item) => item.value)).toBe(false)
      expect(component.items.length).toBe(8)
      expect(component.calculatedQualityScore).toBe(0)
    })
    it('should show quality score at 100 and all items true when all fields needed are given for reuse record', () => {
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
        onlineResources: [],
        extras: {
          sourcesIdentifiers: 'test-uuid',
        },
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
  })
})
