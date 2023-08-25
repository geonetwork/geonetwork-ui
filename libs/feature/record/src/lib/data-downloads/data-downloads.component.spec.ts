import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { BehaviorSubject, of, throwError } from 'rxjs'
import { MdViewFacade } from '../state'
import { DataDownloadsComponent } from './data-downloads.component'
import { MetadataLink, MetadataLinkType } from '@geonetwork-ui/util-shared'
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core'
import { By } from '@angular/platform-browser'
import { DataService } from '@geonetwork-ui/feature/dataviz'

class MdViewFacadeMock {
  downloadLinks$ = new BehaviorSubject([])
}

class DataServiceMock {
  getDownloadLinksFromWfs = jest.fn((link) =>
    link.url.indexOf('error') > -1
      ? throwError(new Error('would not fetch links'))
      : of([
          {
            ...link,
            mimeType: 'application/geo+json',
          },
          {
            ...link,
            mimeType: 'text/csv',
          },
          {
            ...link,
            mimeType: 'gml',
          },
        ])
  )
  getDownloadLinksFromEsriRest = jest.fn((link) => [
    {
      ...link,
      mimeType: 'application/json',
      url: `${link.url}/query?f=json&where=1=1&outFields=*`,
    },
    {
      ...link,
      mimeType: 'application/geo+json',
      url: `${link.url}/query?f=geojson&where=1=1&outFields=*`,
    },
  ])
}

@Component({
  selector: 'gn-ui-download-item',
  template: '<div></div>',
})
export class MockDownloadsListItemComponent {
  @Input() link: MetadataLink
}

@Component({
  selector: 'gn-ui-popup-alert',
  template: '<div></div>',
})
export class MockPopupAlertComponent {}

describe('DataDownloadsComponent', () => {
  let component: DataDownloadsComponent
  let fixture: ComponentFixture<DataDownloadsComponent>
  let facade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DataDownloadsComponent,
        MockDownloadsListItemComponent,
        MockPopupAlertComponent,
      ],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
        {
          provide: DataService,
          useClass: DataServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDownloadsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('download links', () => {
    describe('when the WFS service fails', () => {
      beforeEach(() => {
        facade.downloadLinks$.next([
          {
            description: 'Lieu de surveillance (point)',
            name: 'surval_parametre_point.csv',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/surval_parametre_point.csv',
            type: MetadataLinkType.DOWNLOAD,
          },
          {
            description: 'Lieu de surveillance (ligne)',
            name: 'surval_parametre_ligne',
            protocol: 'OGC:WFS',
            url: 'https://error/wfs/surveillance_littorale',
            type: MetadataLinkType.WFS,
          },
        ])
        fixture.detectChanges()
      })
      it('emits the other links', fakeAsync(() => {
        let downloadLinks = []
        component.links$.subscribe((links: MetadataLink[]) => {
          downloadLinks = links
        })
        tick(200)
        expect(downloadLinks).toEqual([
          {
            description: 'Lieu de surveillance (point)',
            name: 'surval_parametre_point.csv',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/surval_parametre_point.csv',
            type: MetadataLinkType.DOWNLOAD,
          },
        ])
      }))
      // disable error handling in UI
      it.skip('shows an error', () => {
        const popup = fixture.debugElement.query(
          By.directive(MockPopupAlertComponent)
        )
        expect(popup).toBeTruthy()
      })
    })

    describe('with no link compatible with DOWNLOAD usage', () => {
      beforeEach(() => {
        facade.downloadLinks$.next([])
        fixture.detectChanges()
      })
      it('emits no links', () => {
        component.links$.subscribe((links: MetadataLink[]) => {
          expect(links).toEqual([])
        })
      })
    })

    describe('with links compatible with DOWNLOAD usage', () => {
      beforeEach(() => {
        facade.downloadLinks$.next([
          {
            description: 'Lieu de surveillance (point)',
            name: 'surval_parametre_point.csv',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/surval_parametre_point.csv',
            type: MetadataLinkType.DOWNLOAD,
          },
          {
            description: 'Lieu de surveillance (polygone)',
            name: 'surval_parametre_polygone.geojson',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/surval_parametre_polygone.geojson',
            type: MetadataLinkType.DOWNLOAD,
          },
          {
            description: 'Lieu de surveillance (ligne)',
            name: 'surval_parametre_ligne',
            protocol: 'OGC:WFS',
            url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
            type: MetadataLinkType.WFS,
          },
          {
            protocol: 'OGC:WFS',
            name: 'mes_hdf',
            description: 'ArcGIS GeoService Wfs',
            url: 'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf/WFSServer/0',
            type: MetadataLinkType.WFS,
          },
          {
            protocol: 'ESRI:REST',
            name: 'mes_hdf_journalier_poll_princ',
            description: 'ArcGIS GeoService',
            url: 'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf_journalier_poll_princ/FeatureServer/0',
            type: MetadataLinkType.ESRI_REST,
          },
        ])
        fixture.detectChanges()
      })
      it('emits download links once per format', fakeAsync(() => {
        let downloadLinks = []
        component.links$.subscribe((links: MetadataLink[]) => {
          downloadLinks = links
        })
        tick(200)
        expect(downloadLinks).toEqual([
          {
            description: 'Lieu de surveillance (point)',
            name: 'surval_parametre_point.csv',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/surval_parametre_point.csv',
            type: MetadataLinkType.DOWNLOAD,
          },
          {
            description: 'Lieu de surveillance (ligne)',
            mimeType: 'text/csv',
            name: 'surval_parametre_ligne',
            protocol: 'OGC:WFS',
            url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
            type: MetadataLinkType.WFS,
          },
          {
            description: 'ArcGIS GeoService Wfs',
            mimeType: 'text/csv',
            name: 'mes_hdf',
            protocol: 'OGC:WFS',
            url: 'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf/WFSServer/0',
            type: MetadataLinkType.WFS,
          },
          {
            description: 'Lieu de surveillance (polygone)',
            name: 'surval_parametre_polygone.geojson',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/surval_parametre_polygone.geojson',
            type: MetadataLinkType.DOWNLOAD,
          },
          {
            description: 'Lieu de surveillance (ligne)',
            name: 'surval_parametre_ligne',
            mimeType: 'application/geo+json',
            protocol: 'OGC:WFS',
            url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
            type: MetadataLinkType.WFS,
          },
          {
            description: 'ArcGIS GeoService Wfs',
            mimeType: 'application/geo+json',
            name: 'mes_hdf',
            protocol: 'OGC:WFS',
            url: 'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf/WFSServer/0',
            type: MetadataLinkType.WFS,
          },
          {
            description: 'ArcGIS GeoService',
            mimeType: 'application/json',
            name: 'mes_hdf_journalier_poll_princ',
            protocol: 'ESRI:REST',
            url: 'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf_journalier_poll_princ/FeatureServer/0/query?f=json&where=1=1&outFields=*',
            type: MetadataLinkType.ESRI_REST,
          },
          {
            description: 'ArcGIS GeoService',
            mimeType: 'application/geo+json',
            name: 'mes_hdf_journalier_poll_princ',
            protocol: 'ESRI:REST',
            url: 'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf_journalier_poll_princ/FeatureServer/0/query?f=geojson&where=1=1&outFields=*',
            type: MetadataLinkType.ESRI_REST,
          },
        ])
      }))
    })
    describe('with sorted links', () => {
      beforeEach(() => {
        facade.downloadLinks$.next([
          {
            description: 'KML Data',
            name: 'abc.kml',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/data.kml',
            type: MetadataLinkType.DOWNLOAD,
          },
          {
            description: 'Lieu de surveillance (point)',
            name: 'surval_parametre_point.csv',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/surval_parametre_point.csv',
            type: MetadataLinkType.DOWNLOAD,
          },
          {
            description: 'pdf file',
            name: 'abc.pdf',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/file.pdf',
            type: MetadataLinkType.DOWNLOAD,
          },
          {
            description: 'Lieu de surveillance (polygone)',
            name: 'surval_parametre_polygone.geojson',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/surval_parametre_polygone.geojson',
            type: MetadataLinkType.DOWNLOAD,
          },
          {
            description: 'excel data',
            name: 'data.xls',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/data.excel',
            type: MetadataLinkType.DOWNLOAD,
          },
        ])
        fixture.detectChanges()
      })
      it('sorts links', fakeAsync(() => {
        let downloadLinks = []
        component.links$.subscribe((links: MetadataLink[]) => {
          downloadLinks = links
        })
        tick(200)
        expect(downloadLinks).toEqual([
          {
            description: 'Lieu de surveillance (point)',
            name: 'surval_parametre_point.csv',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/surval_parametre_point.csv',
            type: MetadataLinkType.DOWNLOAD,
          },
          {
            description: 'excel data',
            name: 'data.xls',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/data.excel',
            type: MetadataLinkType.DOWNLOAD,
          },
          {
            description: 'Lieu de surveillance (polygone)',
            name: 'surval_parametre_polygone.geojson',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/surval_parametre_polygone.geojson',
            type: MetadataLinkType.DOWNLOAD,
          },
          {
            description: 'KML Data',
            name: 'abc.kml',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/data.kml',
            type: MetadataLinkType.DOWNLOAD,
          },
          {
            description: 'pdf file',
            name: 'abc.pdf',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/file.pdf',
            type: MetadataLinkType.DOWNLOAD,
          },
        ])
      }))
    })
  })
})
