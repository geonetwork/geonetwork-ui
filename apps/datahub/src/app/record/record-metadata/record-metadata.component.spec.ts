import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { SourcesService } from '@geonetwork-ui/feature/catalog'
import { SearchService } from '@geonetwork-ui/feature/search'
import {
  ErrorComponent,
  ErrorType,
  ImageOverlayPreviewComponent,
  MetadataCatalogComponent,
  MetadataContactComponent,
  MetadataInfoComponent,
} from '@geonetwork-ui/ui/elements'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of } from 'rxjs'
import { RecordMetadataComponent } from './record-metadata.component'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import {
  DataViewComponent,
  DataViewShareComponent,
  MapViewComponent,
  MdViewFacade,
} from '@geonetwork-ui/feature/record'
import { MockBuilder } from 'ng-mocks'
import { RecordDownloadsComponent } from '../record-downloads/record-downloads.component'
import { RecordOtherlinksComponent } from '../record-otherlinks/record-otherlinks.component'
import { RecordApisComponent } from '../record-apis/record-apis.component'
import { RecordRelatedRecordsComponent } from '../record-related-records/record-related-records.component'
import { MatTab, MatTabGroup } from '@angular/material/tabs'

const SAMPLE_RECORD = {
  ...datasetRecordsFixture()[0],
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
  isMetadataLoading$ = new BehaviorSubject(false)
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

describe('RecordMetadataComponent', () => {
  let component: RecordMetadataComponent
  let fixture: ComponentFixture<RecordMetadataComponent>
  let facade
  let searchService: SearchService
  let sourcesService: SourcesService

  beforeEach(() => MockBuilder(RecordMetadataComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
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
    let metadataInfo: MetadataInfoComponent
    let metadataContact: MetadataContactComponent
    let catalogComponent: MetadataCatalogComponent

    beforeEach(() => {
      facade.isPresent$.next(true)
      fixture.detectChanges()
      metadataInfo = fixture.debugElement.query(
        By.directive(MetadataInfoComponent)
      ).componentInstance
      metadataContact = fixture.debugElement.query(
        By.directive(MetadataContactComponent)
      ).componentInstance
      catalogComponent = fixture.debugElement.query(
        By.directive(MetadataCatalogComponent)
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
          By.directive(MetadataInfoComponent)
        ).componentInstance
      })
      it('shows a placeholder', () => {
        expect(metadataInfo.metadata).not.toHaveProperty('abstract')
        expect(metadataInfo.incomplete).toBeTruthy()
      })
      it('does not display the metadata contact component', () => {
        expect(
          fixture.debugElement.query(By.directive(MetadataContactComponent))
        ).toBeFalsy()
      })
      it('does not display the metadata catalog component', () => {
        expect(
          fixture.debugElement.query(By.directive(MetadataCatalogComponent))
        ).toBeFalsy()
      })
      it('does not display the image overlay preview', () => {
        expect(
          fixture.debugElement.query(By.directive(ImageOverlayPreviewComponent))
        ).toBeFalsy()
      })
    })
    describe('Image Overlay Preview', () => {
      describe('if metadata without overview', () => {
        let imgOverlayPreview: ImageOverlayPreviewComponent
        beforeEach(() => {
          facade.isPresent$.next(true)
          facade.metadata$.next({})
          fixture.detectChanges()
          imgOverlayPreview = fixture.debugElement.query(
            By.directive(ImageOverlayPreviewComponent)
          ).componentInstance
        })
        it('should send undefined as imageUrl to imgOverlayPreview component', () => {
          expect(imgOverlayPreview).toBeTruthy()
          expect(imgOverlayPreview.imageUrl).toBe(undefined)
        })
      })
      describe('if metadata with overview', () => {
        let imgOverlayPreview: ImageOverlayPreviewComponent
        beforeEach(() => {
          facade.isPresent$.next(true)
          fixture.detectChanges()
          imgOverlayPreview = fixture.debugElement.query(
            By.directive(ImageOverlayPreviewComponent)
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
        mapTab = fixture.debugElement.queryAll(By.directive(MatTab))[0]
        tabGroup = fixture.debugElement.queryAll(By.directive(MatTabGroup))[0]
      })
      it('renders preview, map tab is disabled', () => {
        expect(mapTab.componentInstance.disabled).toBe(true)
      })
      it('renders preview, table tab is selected', () => {
        expect(tabGroup.componentInstance.selectedIndex).toBe(1)
      })
      it('does not render map component', () => {
        expect(
          fixture.debugElement.query(By.directive(MapViewComponent))
        ).toBeFalsy()
      })
    })
    describe('when a MAPAPI link present', () => {
      beforeEach(() => {
        facade.mapApiLinks$.next(['link'])
        fixture.detectChanges()
        mapTab = fixture.debugElement.queryAll(By.directive(MatTab))[0]
      })
      it('renders preview, map tab is enabled', () => {
        expect(mapTab.componentInstance.disabled).toBe(false)
      })
      it('renders map component', () => {
        expect(
          fixture.debugElement.query(By.directive(MapViewComponent))
        ).toBeTruthy()
      })
    })
    describe('when a GEODATA link present', () => {
      beforeEach(() => {
        facade.geoDataLinksWithGeometry$.next(['link'])
        facade.geoDataLinks$.next(['link'])
        fixture.detectChanges()
        mapTab = fixture.debugElement.queryAll(By.directive(MatTab))[0]
      })
      it('renders preview, map tab is enabled', () => {
        expect(mapTab.componentInstance.disabled).toBe(false)
      })
      it('renders map component', () => {
        expect(
          fixture.debugElement.query(By.directive(MapViewComponent))
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
        tableTab = fixture.debugElement.queryAll(By.directive(MatTab))[1]
        chartTab = fixture.debugElement.queryAll(By.directive(MatTab))[2]
        tabGroup = fixture.debugElement.queryAll(By.directive(MatTabGroup))[0]
      })
      it('renders preview, table tab is disabled', () => {
        expect(tableTab.componentInstance.disabled).toBe(true)
      })
      it('renders preview, chart tab is disabled', () => {
        expect(chartTab.componentInstance.disabled).toBe(true)
      })
      it('renders preview, map tab is selected', () => {
        expect(tabGroup.componentInstance.selectedIndex).toBe(0)
      })
      it('does not render any data view component', () => {
        expect(
          fixture.debugElement.query(By.directive(DataViewComponent))
        ).toBeFalsy()
      })
      it('does render the permalink component', () => {
        expect(
          fixture.debugElement.query(By.directive(DataViewShareComponent))
        ).toBeTruthy()
      })
    })
    describe('when a DATA link present', () => {
      beforeEach(() => {
        facade.dataLinks$.next(['link'])
        fixture.detectChanges()
        tableTab = fixture.debugElement.queryAll(By.directive(MatTab))[1]
        chartTab = fixture.debugElement.queryAll(By.directive(MatTab))[2]
      })
      it('renders preview, table tab is enabled', () => {
        expect(tableTab.componentInstance.disabled).toBe(false)
      })
      it('renders preview, chart tab is enabled', () => {
        expect(chartTab.componentInstance.disabled).toBe(false)
      })
      it('renders two data view components (for table and chart tabs)', () => {
        expect(
          fixture.debugElement.queryAll(By.directive(DataViewComponent)).length
        ).toEqual(2)
      })
      it('does render the permalink component', () => {
        expect(
          fixture.debugElement.query(By.directive(DataViewShareComponent))
        ).toBeTruthy()
      })
      describe('when selectedView$ is chart', () => {
        beforeEach(() => {
          component.selectedView$.next('chart')
          fixture.detectChanges()
        })
        it('renders the permalink component', () => {
          expect(
            fixture.debugElement.query(By.directive(DataViewShareComponent))
          ).toBeTruthy()
        })
      })
    })
    describe('when a GEODATA link present', () => {
      beforeEach(() => {
        facade.geoDataLinks$.next(['link'])
        fixture.detectChanges()
        tableTab = fixture.debugElement.queryAll(By.directive(MatTab))[1]
        chartTab = fixture.debugElement.queryAll(By.directive(MatTab))[2]
      })
      it('renders preview, table tab is enabled', () => {
        expect(tableTab.componentInstance.disabled).toBe(false)
      })
      it('renders preview, chart tab is enabled', () => {
        expect(chartTab.componentInstance.disabled).toBe(false)
      })
      it('renders two data view components (for table and chart tabs)', () => {
        expect(
          fixture.debugElement.queryAll(By.directive(DataViewComponent)).length
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
          By.directive(RecordDownloadsComponent)
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
          By.directive(RecordDownloadsComponent)
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
          By.directive(RecordOtherlinksComponent)
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
          By.directive(RecordOtherlinksComponent)
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
          By.directive(RecordApisComponent)
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
          By.directive(RecordApisComponent)
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
          By.directive(RecordRelatedRecordsComponent)
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
          By.directive(RecordRelatedRecordsComponent)
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
      describe('When the metadata is not fully loaded', () => {
        beforeEach(() => {
          facade.isMetadataLoading$.next(true)
          facade.apiLinks$.next([])
          facade.downloadLinks$.next([])
          facade.otherLinks$.next([])
          fixture.detectChanges()
        })
        it("doesn' show the no link error block", () => {
          const result = fixture.debugElement.query(
            By.css('[data-test="dataset-has-no-link-block"]')
          )
          expect(result).toBeFalsy()
        })
      })

      describe('When the metadata is not fully loaded', () => {
        beforeEach(() => {
          facade.isMetadataLoading$.next(false)
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
})
