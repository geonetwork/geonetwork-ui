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
import { BehaviorSubject, of } from 'rxjs'
import { RecordMetadataComponent } from './record-metadata.component'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { MockBuilder } from 'ng-mocks'
import { RecordDownloadsComponent } from '../record-downloads/record-downloads.component'
import { RecordOtherlinksComponent } from '../record-otherlinks/record-otherlinks.component'
import { RecordApisComponent } from '../record-apis/record-apis.component'
import { RecordInternalLinksComponent } from '../record-internal-links/record-internal-links.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

const SAMPLE_RECORD = {
  ...datasetRecordsFixture()[0],
  extras: {
    catalogUuid: 'catalog-0001',
  },
}

class MdViewFacadeMock {
  isPresent$ = new BehaviorSubject(false)
  metadata$ = new BehaviorSubject(SAMPLE_RECORD)
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
      providers: [
        provideI18n(),
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
      facade.metadata$.next({ ...SAMPLE_RECORD, ...{ kind: 'dataset' } })
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
    describe('if metadata present and kind is dataset', () => {
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
    describe('if metadata present and kind is service', () => {
      beforeEach(() => {
        facade.isPresent$.next(true)
        facade.metadata$.next({ ...SAMPLE_RECORD, ...{ kind: 'service' } })
        fixture.detectChanges()
      })
      it('does not display the metadata catalog component', () => {
        expect(
          fixture.debugElement.query(By.directive(MetadataCatalogComponent))
        ).toBeFalsy()
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
    describe('when DOWNLOAD link and kind is dataset', () => {
      beforeEach(() => {
        facade.metadata$.next({ ...SAMPLE_RECORD, ...{ kind: 'dataset' } })
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
    describe('when DOWNLOAD link and kind is other than dataset', () => {
      beforeEach(() => {
        facade.metadata$.next({ ...SAMPLE_RECORD, ...{ kind: 'service' } })
        facade.downloadLinks$.next(['link'])
        fixture.detectChanges()
        downloadsComponent = fixture.debugElement.query(
          By.directive(RecordDownloadsComponent)
        )
      })
      it('download component does not render', () => {
        expect(downloadsComponent).toBeFalsy()
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
    describe('when API link and kind is dataset', () => {
      beforeEach(() => {
        facade.metadata$.next({ ...SAMPLE_RECORD, ...{ kind: 'dataset' } })
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
    describe('when API link and kind is other than dataset', () => {
      beforeEach(() => {
        facade.metadata$.next({ ...SAMPLE_RECORD, ...{ kind: 'reuse' } })
        facade.apiLinks$.next(['link'])
        fixture.detectChanges()
        apiComponent = fixture.debugElement.query(
          By.directive(RecordApisComponent)
        )
      })
      it('API component does not render', () => {
        expect(apiComponent).toBeFalsy()
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
          By.directive(RecordInternalLinksComponent)
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
          By.directive(RecordInternalLinksComponent)
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
          facade.metadata$.next({ ...SAMPLE_RECORD, ...{ kind: 'dataset' } })
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
