import { Component, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { MapManagerService } from '@geonetwork-ui/feature/map'
import { MdViewFacade } from '../state/mdview.facade'
import {
  MetadataInfoComponent,
  UiElementsModule,
} from '@geonetwork-ui/ui/elements'
import { RECORDS_SUMMARY_FIXTURE } from '@geonetwork-ui/ui/search'
import { BehaviorSubject } from 'rxjs'
import { RecordMetadataComponent } from './record-metadata.component'
import { TranslateModule } from '@ngx-translate/core'

class MdViewFacadeMock {
  isPresent$ = new BehaviorSubject(false)
  metadata$ = new BehaviorSubject(RECORDS_SUMMARY_FIXTURE[0])
  mapApiLinks$ = new BehaviorSubject([])
  dataLinks$ = new BehaviorSubject([])
  geoDataLinks$ = new BehaviorSubject([])
  downloadLinks$ = new BehaviorSubject([])
  apiLinks$ = new BehaviorSubject([])
  otherLinks$ = new BehaviorSubject([])
}

@Component({
  selector: 'gn-ui-data-view-map',
  template: '<div></div>',
})
export class MockDataMapComponent {}

@Component({
  selector: 'gn-ui-data-view-table',
  template: '<div></div>',
})
export class MockDataTableComponent {}

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

describe('RecordMetadataComponent', () => {
  let component: RecordMetadataComponent
  let fixture: ComponentFixture<RecordMetadataComponent>
  let facade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RecordMetadataComponent,
        MockDataMapComponent,
        MockDataTableComponent,
        MockDataDownloadsComponent,
        MockDataOtherlinksComponent,
        MockDataApisComponent,
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

  describe('if metadata present', () => {
    beforeEach(() => {
      facade.isPresent$.next(true)
      fixture.detectChanges()
    })
    it('shows the full metadata', () => {
      const dumb = fixture.debugElement.query(
        By.directive(MetadataInfoComponent)
      ).componentInstance
      expect(dumb.metadata).toHaveProperty('abstract')
    })
  })
  describe('if metadata not present', () => {
    beforeEach(() => {
      facade.isPresent$.next(false)
      fixture.detectChanges()
    })
    it('shows a placeholder', () => {
      const dumb = fixture.debugElement.query(
        By.directive(MetadataInfoComponent)
      ).componentInstance
      expect(dumb.metadata).not.toHaveProperty('abstract')
      expect(dumb.incomplete).toBeTruthy()
    })
  })

  describe('Preview', () => {
    let preview
    describe('when no MAPAPI, GEODATA nor DATA link', () => {
      beforeEach(() => {
        fixture.detectChanges()
        preview = fixture.debugElement.query(By.css('#preview'))
      })
      it('does not render preview content', () => {
        expect(preview.nativeNode.children.length).toBe(0)
      })
    })
  })
  describe('Map', () => {
    let mapTab
    describe('when DATA link, but no MAPAPI and no GEODATA link', () => {
      beforeEach(() => {
        facade.dataLinks$.next(['link'])
        fixture.detectChanges()
        mapTab = fixture.debugElement.queryAll(By.css('mat-tab'))[0]
      })
      it('renders preview, map tab is disabled', () => {
        expect(mapTab.nativeNode.disabled).toBe(true)
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
  describe('Table', () => {
    let tableTab
    describe('when MAPAPI link, but no DATA and no GEODATA link', () => {
      beforeEach(() => {
        facade.mapApiLinks$.next(['link'])
        facade.dataLinks$.next(null)
        facade.geoDataLinks$.next(null)
        fixture.detectChanges()
        tableTab = fixture.debugElement.queryAll(By.css('mat-tab'))[1]
      })
      it('renders preview, table tab is disabled', () => {
        expect(tableTab.nativeNode.disabled).toBe(true)
      })
      it('does not render table component', () => {
        expect(
          fixture.debugElement.query(By.directive(MockDataTableComponent))
        ).toBeFalsy()
      })
    })
    describe('when a DATA link present', () => {
      beforeEach(() => {
        facade.dataLinks$.next(['link'])
        fixture.detectChanges()
        tableTab = fixture.debugElement.queryAll(By.css('mat-tab'))[1]
      })
      it('renders preview, table tab is enabled', () => {
        expect(tableTab.nativeNode.disabled).toBe(false)
      })
      it('renders table component', () => {
        expect(
          fixture.debugElement.query(By.directive(MockDataTableComponent))
        ).toBeTruthy()
      })
    })
    describe('when a GEODATA link present', () => {
      beforeEach(() => {
        facade.geoDataLinks$.next(['link'])
        fixture.detectChanges()
        tableTab = fixture.debugElement.queryAll(By.css('mat-tab'))[1]
      })
      it('renders preview, table tab is enabled', () => {
        expect(tableTab.nativeNode.disabled).toBe(false)
      })
      it('renders table component', () => {
        expect(
          fixture.debugElement.query(By.directive(MockDataTableComponent))
        ).toBeTruthy()
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
})
