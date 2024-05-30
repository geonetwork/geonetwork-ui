import {
  Component,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { SourcesService } from '@geonetwork-ui/feature/catalog'
import { MapManagerService } from '@geonetwork-ui/feature/map'
import { SearchService } from '@geonetwork-ui/feature/search'
import { ErrorComponent, ErrorType } from '@geonetwork-ui/ui/elements'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of } from 'rxjs'
import { RecordMetadataComponent } from './record-metadata.component'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import {
  CatalogRecord,
  DatasetRecord,
  DatasetServiceDistribution,
  Individual,
  Keyword,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'

const SAMPLE_RECORD = {
  ...DATASET_RECORDS[0],
  extras: {
    catalogUuid: 'catalog-0001',
  },
}

class MdViewFacadeMock {
  isPresent$ = new BehaviorSubject(false)
  metadata$ = new BehaviorSubject(SAMPLE_RECORD)
  mapApiLinks$ = new BehaviorSubject([])
  dataLinks$ = new BehaviorSubject([])
  geoDataLinks$ = new BehaviorSubject([])
  geoDataLinksWithGeometry$ = new BehaviorSubject([])
  downloadLinks$ = new BehaviorSubject([])
  apiLinks$ = new BehaviorSubject([])
  otherLinks$ = new BehaviorSubject([])
  related$ = new BehaviorSubject(null)
  error$ = new BehaviorSubject(null)
}

class SearchServiceMock {
  setFilters = jest.fn()
  updateFilters = jest.fn()
}
class SourcesServiceMock {
  getSourceLabel = jest.fn(() => of('catalog label'))
}

class OrganisationsServiceMock {
  getFiltersForOrgs = jest.fn((orgs) =>
    of({
      orgs: orgs.reduce((prev, curr) => ({ ...prev, [curr.name]: true }), {}),
    })
  )
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'gn-ui-map-view',
  template: '<div></div>',
})
export class MockDataMapComponent {}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'gn-ui-data-view',
  template: '<div></div>',
})
export class MockDataViewComponent {}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'gn-ui-data-view-share',
  template: '<div></div>',
})
export class MockDataViewShareComponent {}

@Component({
  selector: 'datahub-record-downloads',
  template: '<div></div>',
})
export class MockDataDownloadsComponent {}

@Component({
  selector: 'datahub-record-otherlinks',
  template: '<div></div>',
})
export class MockDataOtherlinksComponent {}

@Component({
  selector: 'datahub-record-apis',
  template: '<div></div>',
})
export class MockDataApisComponent {}

@Component({
  selector: 'datahub-record-related-records',
  template: '<div></div>',
})
export class MockRelatedComponent {}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'gn-ui-metadata-info',
  template: '<div></div>',
})
export class MockMetadataInfoComponent {
  @Input() metadata: Partial<DatasetRecord>
  @Input() incomplete: boolean
  @Output() keyword = new EventEmitter<Keyword>()
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'gn-ui-metadata-contact',
  template: '<div></div>',
})
export class MockMetadataContactComponent {
  @Input() metadata: Partial<CatalogRecord>
  @Output() organizationClick = new EventEmitter<Organization>()
  @Output() contactClick = new EventEmitter<Individual>()
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'gn-ui-metadata-catalog',
  template: '<div></div>',
})
export class MockMetadataCatalogComponent {
  @Input() sourceLabel: string
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'gn-ui-record-api-form',
  template: '<div></div>',
})
export class MockRecordApiFormComponent {
  @Input() apiLink: DatasetServiceDistribution
}
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'gn-ui-image-overlay-preview',
  template: '<div></div>',
})
export class MockImgOverlayPreviewComponent {
  @Input() imageUrl: string
  @Output() isPlaceholderShown = new EventEmitter<boolean>()
}

describe('RecordMetadataComponent', () => {
  let component: RecordMetadataComponent
  let fixture: ComponentFixture<RecordMetadataComponent>
  let facade
  let searchService: SearchService
  let sourcesService: SourcesService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RecordMetadataComponent,
        MockDataMapComponent,
        MockDataViewComponent,
        MockDataViewShareComponent,
        MockDataDownloadsComponent,
        MockDataOtherlinksComponent,
        MockDataApisComponent,
        MockRelatedComponent,
        ErrorComponent,
        MockMetadataInfoComponent,
        MockMetadataCatalogComponent,
        MockMetadataContactComponent,
        MockRecordApiFormComponent,
        MockImgOverlayPreviewComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
        {
          provide: MapManagerService,
          useValue: {},
        },
        {
          provide: SearchService,
          useClass: SearchServiceMock,
        },
        {
          provide: SourcesService,
          useClass: SourcesServiceMock,
        },
        {
          provide: OrganizationsServiceInterface,
          useClass: OrganisationsServiceMock,
        },
      ],
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)
    searchService = TestBed.inject(SearchService)
    sourcesService = TestBed.inject(SourcesService)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordMetadataComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('about', () => {
    let metadataInfo: MockMetadataInfoComponent
    let metadataContact: MockMetadataContactComponent
    let catalogComponent: MockMetadataCatalogComponent

    beforeEach(() => {
      facade.isPresent$.next(true)
      fixture.detectChanges()
      metadataInfo = fixture.debugElement.query(
        By.directive(MockMetadataInfoComponent)
      ).componentInstance
      metadataContact = fixture.debugElement.query(
        By.directive(MockMetadataContactComponent)
      ).componentInstance
      catalogComponent = fixture.debugElement.query(
        By.directive(MockMetadataCatalogComponent)
      ).componentInstance
    })
    describe('if metadata present', () => {
      it('shows the full metadata', () => {
        expect(metadataInfo.metadata).toHaveProperty('abstract')
      })
      it('shows the metadata contact', () => {
        expect(metadataContact.metadata).toHaveProperty('contacts')
      })
      it('shows the metadata catalog', () => {
        expect(sourcesService.getSourceLabel).toBeCalledWith(
          SAMPLE_RECORD.extras.catalogUuid
        )
        expect(catalogComponent.sourceLabel).toEqual('catalog label')
      })
    })
    describe('if metadata not present', () => {
      beforeEach(() => {
        facade.isPresent$.next(false)
        fixture.detectChanges()
        metadataInfo = fixture.debugElement.query(
          By.directive(MockMetadataInfoComponent)
        ).componentInstance
      })
      it('shows a placeholder', () => {
        expect(metadataInfo.metadata).not.toHaveProperty('abstract')
        expect(metadataInfo.incomplete).toBeTruthy()
      })
      it('does not display the metadata contact component', () => {
        expect(
          fixture.debugElement.query(By.directive(MockMetadataContactComponent))
        ).toBeFalsy()
      })
      it('does not display the metadata catalog component', () => {
        expect(
          fixture.debugElement.query(By.directive(MockMetadataCatalogComponent))
        ).toBeFalsy()
      })
      it('does not display the image overlay preview', () => {
        expect(
          fixture.debugElement.query(
            By.directive(MockImgOverlayPreviewComponent)
          )
        ).toBeFalsy()
      })
    })
    describe('Image Overlay Preview', () => {
      describe('if metadata without overview', () => {
        let imgOverlayPreview: MockImgOverlayPreviewComponent
        beforeEach(() => {
          facade.isPresent$.next(true)
          facade.metadata$.next({})
          fixture.detectChanges()
          imgOverlayPreview = fixture.debugElement.query(
            By.directive(MockImgOverlayPreviewComponent)
          ).componentInstance
        })
        it('should send undefined as imageUrl to imgOverlayPreview component', () => {
          expect(imgOverlayPreview).toBeTruthy()
          expect(imgOverlayPreview.imageUrl).toBe(undefined)
        })
      })
      describe('if metadata with overview', () => {
        let imgOverlayPreview: MockImgOverlayPreviewComponent
        beforeEach(() => {
          facade.isPresent$.next(true)
          fixture.detectChanges()
          imgOverlayPreview = fixture.debugElement.query(
            By.directive(MockImgOverlayPreviewComponent)
          ).componentInstance
        })
        describe('and url defined', () => {
          it('should send the imageUrl to imgOverlayPreview component', () => {
            expect(imgOverlayPreview).toBeTruthy()
            expect(imgOverlayPreview.imageUrl).toBeDefined()
          })
        })
        describe('and url undefined', () => {
          beforeEach(() => {
            facade.metadata$.next({ overviews: [] })
            fixture.detectChanges()
          })
          it('should send the imagUrl as null to imgOverlayPreview component', () => {
            expect(imgOverlayPreview).toBeTruthy()
            expect(imgOverlayPreview.imageUrl).toBeNull()
          })
        })
      })
    })
  })

  describe('Preview', () => {
    describe('when no MAPAPI, GEODATA nor DATA link', () => {
      beforeEach(() => {
        fixture.detectChanges()
      })
      it('does not render preview content', () => {
        expect(fixture.debugElement.query(By.css('#preview'))).toBeFalsy()
      })
    })
  })
  describe('Map view', () => {
    let mapTab
    let tabGroup
    describe('when DATA link, but no MAPAPI and no GEODATA link', () => {
      beforeEach(() => {
        facade.dataLinks$.next(['link'])
        fixture.detectChanges()
        mapTab = fixture.debugElement.queryAll(By.css('mat-tab'))[0]
        tabGroup = fixture.debugElement.queryAll(By.css('mat-tab-group'))[0]
      })
      it('renders preview, map tab is disabled', () => {
        expect(mapTab.nativeNode.disabled).toBe(true)
      })
      it('renders preview, table tab is selected', () => {
        expect(tabGroup.nativeNode.selectedIndex).toBe(1)
      })
      it('does not render map component', () => {
        expect(
          fixture.debugElement.query(By.directive(MockDataMapComponent))
        ).toBeFalsy()
      })
    })
    describe('when a MAPAPI link present', () => {
      beforeEach(() => {
        facade.mapApiLinks$.next(['link'])
        fixture.detectChanges()
        mapTab = fixture.debugElement.queryAll(By.css('mat-tab'))[0]
      })
      it('renders preview, map tab is enabled', () => {
        expect(mapTab.nativeNode.disabled).toBe(false)
      })
      it('renders map component', () => {
        expect(
          fixture.debugElement.query(By.directive(MockDataMapComponent))
        ).toBeTruthy()
      })
    })
    describe('when a GEODATA link present', () => {
      beforeEach(() => {
        facade.geoDataLinksWithGeometry$.next(['link'])
        facade.geoDataLinks$.next(['link'])
        fixture.detectChanges()
        mapTab = fixture.debugElement.queryAll(By.css('mat-tab'))[0]
      })
      it('renders preview, map tab is enabled', () => {
        expect(mapTab.nativeNode.disabled).toBe(false)
      })
      it('renders map component', () => {
        expect(
          fixture.debugElement.query(By.directive(MockDataMapComponent))
        ).toBeTruthy()
      })
    })
  })
  describe('Data view - table and chart', () => {
    let tableTab
    let chartTab
    let tabGroup
    describe('when MAPAPI link, but no DATA and no GEODATA link', () => {
      beforeEach(() => {
        facade.mapApiLinks$.next(['link'])
        facade.dataLinks$.next(null)
        facade.geoDataLinksWithGeometry$.next(null)
        fixture.detectChanges()
        tableTab = fixture.debugElement.queryAll(By.css('mat-tab'))[1]
        chartTab = fixture.debugElement.queryAll(By.css('mat-tab'))[2]
        tabGroup = fixture.debugElement.queryAll(By.css('mat-tab-group'))[0]
      })
      it('renders preview, table tab is disabled', () => {
        expect(tableTab.nativeNode.disabled).toBe(true)
      })
      it('renders preview, chart tab is disabled', () => {
        expect(chartTab.nativeNode.disabled).toBe(true)
      })
      it('renders preview, map tab is selected', () => {
        expect(tabGroup.nativeNode.selectedIndex).toBe(0)
      })
      it('does not render any data view component', () => {
        expect(
          fixture.debugElement.query(By.directive(MockDataViewComponent))
        ).toBeFalsy()
      })
      it('does not render the permalink component', () => {
        expect(
          fixture.debugElement.query(By.directive(MockDataViewShareComponent))
        ).toBeFalsy()
      })
    })
    describe('when a DATA link present', () => {
      beforeEach(() => {
        facade.dataLinks$.next(['link'])
        fixture.detectChanges()
        tableTab = fixture.debugElement.queryAll(By.css('mat-tab'))[1]
        chartTab = fixture.debugElement.queryAll(By.css('mat-tab'))[2]
      })
      it('renders preview, table tab is enabled', () => {
        expect(tableTab.nativeNode.disabled).toBe(false)
      })
      it('renders preview, chart tab is enabled', () => {
        expect(chartTab.nativeNode.disabled).toBe(false)
      })
      it('renders two data view components (for table and chart tabs)', () => {
        expect(
          fixture.debugElement.queryAll(By.directive(MockDataViewComponent))
            .length
        ).toEqual(2)
      })
      it('does not render the permalink component', () => {
        expect(
          fixture.debugElement.query(By.directive(MockDataViewShareComponent))
        ).toBeFalsy()
      })
      describe('when selectedTabIndex$ is 2 (chart tab)', () => {
        beforeEach(() => {
          component.selectedTabIndex$.next(2)
          fixture.detectChanges()
        })
        it('renders the permalink component', () => {
          expect(
            fixture.debugElement.query(By.directive(MockDataViewShareComponent))
          ).toBeTruthy()
        })
      })
    })
    describe('when a GEODATA link present', () => {
      beforeEach(() => {
        facade.geoDataLinks$.next(['link'])
        fixture.detectChanges()
        tableTab = fixture.debugElement.queryAll(By.css('mat-tab'))[1]
        chartTab = fixture.debugElement.queryAll(By.css('mat-tab'))[2]
      })
      it('renders preview, table tab is enabled', () => {
        expect(tableTab.nativeNode.disabled).toBe(false)
      })
      it('renders preview, chart tab is enabled', () => {
        expect(chartTab.nativeNode.disabled).toBe(false)
      })
      it('renders two data view components (for table and chart tabs)', () => {
        expect(
          fixture.debugElement.queryAll(By.directive(MockDataViewComponent))
            .length
        ).toEqual(2)
      })
    })
  })
  describe('Downloads', () => {
    let downloadsComponent
    describe('when no DOWNLOAD link', () => {
      beforeEach(() => {
        fixture.detectChanges()
        downloadsComponent = fixture.debugElement.query(
          By.directive(MockDataDownloadsComponent)
        )
      })
      it('download component does not render', () => {
        expect(downloadsComponent).toBeFalsy()
      })
    })
    describe('when DOWNLOAD link', () => {
      beforeEach(() => {
        facade.downloadLinks$.next(['link'])
        fixture.detectChanges()
        downloadsComponent = fixture.debugElement.query(
          By.directive(MockDataDownloadsComponent)
        )
      })
      it('download component renders', () => {
        expect(downloadsComponent).toBeTruthy()
      })
    })
  })
  describe('Otherlinks', () => {
    let otherLinksComponent
    describe('when no OTHER link', () => {
      beforeEach(() => {
        fixture.detectChanges()
        otherLinksComponent = fixture.debugElement.query(
          By.directive(MockDataOtherlinksComponent)
        )
      })
      it('otherlink component does not render', () => {
        expect(otherLinksComponent).toBeFalsy()
      })
    })
    describe('when OTHER link', () => {
      beforeEach(() => {
        facade.otherLinks$.next(['link'])
        fixture.detectChanges()
        otherLinksComponent = fixture.debugElement.query(
          By.directive(MockDataOtherlinksComponent)
        )
      })
      it('otherlink component renders', () => {
        expect(otherLinksComponent).toBeTruthy()
      })
    })
  })
  describe('API', () => {
    let apiComponent
    describe('when no API link', () => {
      beforeEach(() => {
        fixture.detectChanges()
        apiComponent = fixture.debugElement.query(
          By.directive(MockDataApisComponent)
        )
      })
      it('API component does not render', () => {
        expect(apiComponent).toBeFalsy()
      })
    })
    describe('when API link', () => {
      beforeEach(() => {
        facade.apiLinks$.next(['link'])
        fixture.detectChanges()
        apiComponent = fixture.debugElement.query(
          By.directive(MockDataApisComponent)
        )
      })
      it('API component renders', () => {
        expect(apiComponent).toBeTruthy()
      })
    })
  })

  describe('related records', () => {
    let relatedComponent
    describe('when no related records', () => {
      beforeEach(() => {
        facade.related$.next([])
        fixture.detectChanges()
        relatedComponent = fixture.debugElement.query(
          By.directive(MockRelatedComponent)
        )
      })
      it('Related component does not render', () => {
        expect(relatedComponent).toBeFalsy()
      })
    })
    describe('when related records', () => {
      beforeEach(() => {
        facade.related$.next([{ title: 'title' }])
        fixture.detectChanges()
        relatedComponent = fixture.debugElement.query(
          By.directive(MockRelatedComponent)
        )
      })
      it('Related component renders', () => {
        expect(relatedComponent).toBeTruthy()
      })
    })
  })

  describe('#onInfoKeywordClick', () => {
    it('call searchService for any', () => {
      component.onInfoKeywordClick({
        thesaurus: { id: 'geonetwork.thesaurus.local' },
        type: 'other',
        label: 'international',
      })
      expect(searchService.updateFilters).toHaveBeenCalledWith({
        any: 'international',
      })
    })
  })
  describe('#onContactClick', () => {
    it('call update search for OrgForResource', () => {
      component.onOrganizationClick({
        name: 'MyOrganization',
        website: new URL('https://www.my.org/info'),
        logoUrl: new URL('https://www.my.org/logo.png'),
        description: 'A generic organization',
      })
      expect(searchService.updateFilters).toHaveBeenCalledWith({
        orgs: {
          MyOrganization: true,
        },
      })
    })
  })

  describe('error handling', () => {
    describe('normal', () => {
      it('does not show errors', () => {
        facade.otherLinks$.next([''])
        fixture.detectChanges()
        const result = fixture.debugElement.query(By.directive(ErrorComponent))
        expect(result).toBeFalsy()
      })
    })
    describe('record not found', () => {
      beforeEach(() => {
        facade.error$.next({ notFound: true })
        fixture.detectChanges()
      })
      it('shows error', () => {
        const result = fixture.debugElement.query(By.directive(ErrorComponent))

        expect(result).toBeTruthy()
        expect(result.componentInstance.type).toBe(ErrorType.RECORD_NOT_FOUND)
        expect(result.componentInstance.error).toBe(undefined)
        expect(result.componentInstance.recordId).toBe(
          SAMPLE_RECORD.uniqueIdentifier
        )
      })
    })
    describe('other error', () => {
      beforeEach(() => {
        facade.error$.next({ otherError: 'This is an Error!' })
        fixture.detectChanges()
      })
      it('shows error', () => {
        const result = fixture.debugElement.query(By.directive(ErrorComponent))

        expect(result).toBeTruthy()
        expect(result.componentInstance.type).toBe(ErrorType.RECEIVED_ERROR)
        expect(result.componentInstance.error).toBe('This is an Error!')
      })
    })

    describe('When there are no link (download, api or other links)', () => {
      beforeEach(() => {
        facade.apiLinks$.next([])
        facade.downloadLinks$.next([])
        facade.otherLinks$.next([])
        fixture.detectChanges()
      })
      it('shows the no link error block', () => {
        const result = fixture.debugElement.query(
          By.css('[data-test="dataset-has-no-link-block"]')
        )
        expect(result).toBeTruthy()
        expect(result.componentInstance.type).toBe(
          ErrorType.DATASET_HAS_NO_LINK
        )
      })
    })
  })
})
