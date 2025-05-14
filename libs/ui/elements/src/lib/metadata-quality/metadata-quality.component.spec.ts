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
import { cold } from 'jasmine-marbles'
import { of } from 'rxjs'
import {
  DatasetRecord,
  ServiceRecord,
  ReuseRecord,
} from '@geonetwork-ui/common/domain/model/record'

describe('MetadataQualityComponent', () => {
  let component: MetadataQualityComponent
  let fixture: ComponentFixture<MetadataQualityComponent>
  const expectedItems = [
    { name: 'title', value: true },
    { name: 'description', value: true },
    { name: 'topic', value: true },
    { name: 'keywords', value: true },
    { name: 'legalConstraints', value: true },
    { name: 'organisation', value: true },
    { name: 'contact', value: true },
    { name: 'updateFrequency', value: true },
  ]

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

  /*it('should populate info', () => {
    const infoObservable = of(component.items)
    const expected$ = cold('(a|)', { a: expectedItems })
    expect(infoObservable).toBeObservable(expected$)
  })*/

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
  })
})
