import { Component, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { SourcesService } from '@geonetwork-ui/feature/catalog'
import { MapManagerService } from '@geonetwork-ui/feature/map'
import { SearchService } from '@geonetwork-ui/feature/search'
import {
  ErrorType,
  MetadataCatalogComponent,
  MetadataContactComponent,
  MetadataInfoComponent,
  SearchResultsErrorComponent,
  UiElementsModule,
} from '@geonetwork-ui/ui/elements'
import { RECORDS_FULL_FIXTURE } from '@geonetwork-ui/util/shared/fixtures'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of } from 'rxjs'
import { MdViewFacade } from '../state/mdview.facade'
import { RecordMetadataComponent } from './record-metadata.component'

class MdViewFacadeMock {
  isPresent$ = new BehaviorSubject(false)
  metadata$ = new BehaviorSubject(RECORDS_FULL_FIXTURE[0])
  mapApiLinks$ = new BehaviorSubject([])
  dataLinks$ = new BehaviorSubject([])
  geoDataLinks$ = new BehaviorSubject([])
  downloadLinks$ = new BehaviorSubject([])
  apiLinks$ = new BehaviorSubject([])
  otherLinks$ = new BehaviorSubject([])
  related$ = new BehaviorSubject(null)
  error$ = new BehaviorSubject(null)
}

const searchServiceMock = {
  setFilters: jest.fn(),
  updateFilters: jest.fn(),
}
const sourcesServiceMock = {
  getSourceLabel: jest.fn(() => of('catalog label')),
}

@Component({
  selector: 'gn-ui-map-view',
  template: '<div></div>',
})
export class MockDataMapComponent {}

@Component({
  selector: 'gn-ui-data-view',
  template: '<div></div>',
})
export class MockDataViewComponent {}

@Component({
  selector: 'gn-ui-data-view-permalink',
  template: '<div></div>',
})
export class MockDataViewPermalinkComponent {}

@Component({
  selector: 'gn-ui-data-downloads',
  template: '<div></div>',
})
export class MockDataDownloadsComponent {}

@Component({
  selector: 'gn-ui-data-otherlinks',
  template: '<div></div>',
})
export class MockDataOtherlinksComponent {}

@Component({
  selector: 'gn-ui-data-apis',
  template: '<div></div>',
})
export class MockDataApisComponent {}

@Component({
  selector: 'gn-ui-related-records',
  template: '<div></div>',
})
export class MockRelatedComponent {}

describe('RecordMetadataComponent', () => {
  let component: RecordMetadataComponent
  let fixture: ComponentFixture<RecordMetadataComponent>
  let facade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RecordMetadataComponent,
        MockDataMapComponent,
        MockDataViewComponent,
        MockDataViewPermalinkComponent,
        MockDataDownloadsComponent,
        MockDataOtherlinksComponent,
        MockDataApisComponent,
        MockRelatedComponent,
        SearchResultsErrorComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [UiElementsModule, TranslateModule.forRoot()],
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
          useValue: searchServiceMock,
        },
        {
          provide: SourcesService,
          useValue: sourcesServiceMock,
        },
      ],
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)
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
        expect(metadataContact.metadata).toHaveProperty('contact')
      })
      it('shows the metadata catalog', () => {
        expect(sourcesServiceMock.getSourceLabel).toBeCalledWith(
          RECORDS_FULL_FIXTURE[0].catalogUuid
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
        facade.geoDataLinks$.next(null)
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
          fixture.debugElement.query(
            By.directive(MockDataViewPermalinkComponent)
          )
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
          fixture.debugElement.query(
            By.directive(MockDataViewPermalinkComponent)
          )
        ).toBeFalsy()
      })
      describe('when selectedTabIndex$ is 2 (chart tab)', () => {
        beforeEach(() => {
          component.selectedTabIndex$.next(2)
          fixture.detectChanges()
        })
        it('renders the permalink component', () => {
          expect(
            fixture.debugElement.query(
              By.directive(MockDataViewPermalinkComponent)
            )
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
      component.onInfoKeywordClick('any')
      expect(searchServiceMock.updateFilters).toHaveBeenCalledWith({
        any: 'any',
      })
    })
  })
  describe('#onContactClick', () => {
    it('call update search for OrgForResource', () => {
      component.onContactClick('orgname')
      expect(searchServiceMock.updateFilters).toHaveBeenCalledWith({
        OrgForResource: {
          orgname: true,
        },
      })
    })
  })

  describe('error handling', () => {
    describe('normal', () => {
      it('does not show errors', () => {
        const result = fixture.debugElement.query(
          By.directive(SearchResultsErrorComponent)
        )
        expect(result).toBeFalsy()
      })
    })
    describe('record not found', () => {
      beforeEach(() => {
        facade.error$.next({ notFound: true })
        fixture.detectChanges()
      })
      it('shows error', () => {
        const result = fixture.debugElement.query(
          By.directive(SearchResultsErrorComponent)
        )

        expect(result).toBeTruthy()
        expect(result.componentInstance.type).toBe(ErrorType.RECORD_NOT_FOUND)
        expect(result.componentInstance.error).toBe(undefined)
        expect(result.componentInstance.recordId).toBe(
          RECORDS_FULL_FIXTURE[0].uuid
        )
      })
    })
    describe('other error', () => {
      beforeEach(() => {
        facade.error$.next({ otherError: 'This is an Error!' })
        fixture.detectChanges()
      })
      it('shows error', () => {
        const result = fixture.debugElement.query(
          By.directive(SearchResultsErrorComponent)
        )

        expect(result).toBeTruthy()
        expect(result.componentInstance.type).toBe(ErrorType.RECEIVED_ERROR)
        expect(result.componentInstance.error).toBe('This is an Error!')
      })
    })
  })
})
