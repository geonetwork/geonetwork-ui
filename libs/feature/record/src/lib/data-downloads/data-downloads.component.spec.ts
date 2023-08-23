import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { BehaviorSubject, of, throwError } from 'rxjs'
import { MdViewFacade } from '../state'
import { DataDownloadsComponent } from './data-downloads.component'
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core'
import { By } from '@angular/platform-browser'
import { DataService } from '@geonetwork-ui/feature/dataviz'
import { DatasetDistribution } from '@geonetwork-ui/common/domain/record'

// This is used to work around a very weird bug when comparing URL objects would fail
// if the `searchParams` of the object wasn't accessed beforehand in some cases...
const newUrl = (url: string) => {
  const obj = new URL(url)
  obj.searchParams // try commenting this out to see the bug
  return obj
}

class MdViewFacadeMock {
  downloadLinks$ = new BehaviorSubject([])
}

class DataServiceMock {
  getDownloadLinksFromWfs = jest.fn((link) =>
    link.url.toString().indexOf('error') > -1
      ? throwError(() => new Error('would not fetch links'))
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
      url: newUrl(`${link.url}/query?f=json&where=1=1&outFields=*`),
    },
    {
      ...link,
      mimeType: 'application/geo+json',
      url: newUrl(`${link.url}/query?f=geojson&where=1=1&outFields=*`),
    },
  ])
}

@Component({
  selector: 'gn-ui-download-item',
  template: '<div></div>',
})
export class MockDownloadsListItemComponent {
  @Input() link: DatasetDistribution
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
            url: newUrl('https://www.ifremer.fr/surval_parametre_point.csv'),
            type: 'download',
          },
          {
            description: 'Lieu de surveillance (ligne)',
            name: 'surval_parametre_ligne',
            url: newUrl('https://error/wfs/surveillance_littorale'),
            type: 'service',
            accessServiceProtocol: 'wfs',
          },
        ])
        fixture.detectChanges()
      })
      it('emits the other links', fakeAsync(() => {
        let downloadLinks = []
        component.links$.subscribe((links: DatasetDistribution[]) => {
          downloadLinks = links
        })
        tick(200)
        expect(downloadLinks).toEqual([
          {
            description: 'Lieu de surveillance (point)',
            name: 'surval_parametre_point.csv',
            url: newUrl('https://www.ifremer.fr/surval_parametre_point.csv'),
            type: 'download',
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
        component.links$.subscribe((links: DatasetDistribution[]) => {
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
            url: newUrl('https://www.ifremer.fr/surval_parametre_point.csv'),
            type: 'download',
          },
          {
            description: 'Lieu de surveillance (polygone)',
            name: 'surval_parametre_polygone.geojson',
            url: newUrl(
              'https://www.ifremer.fr/surval_parametre_polygone.geojson'
            ),
            type: 'download',
          },
          {
            description: 'Lieu de surveillance (ligne)',
            name: 'surval_parametre_ligne',
            url: newUrl(
              'https://www.ifremer.fr/services/wfs/surveillance_littorale'
            ),
            type: 'service',
            accessServiceProtocol: 'wfs',
          },
          {
            name: 'mes_hdf',
            description: 'ArcGIS GeoService Wfs',
            url: newUrl(
              'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf/WFSServer/0'
            ),
            type: 'service',
            accessServiceProtocol: 'wfs',
          },
          {
            name: 'mes_hdf_journalier_poll_princ',
            description: 'ArcGIS GeoService',
            url: newUrl(
              'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf_journalier_poll_princ/FeatureServer/0'
            ),
            type: 'service',
            accessServiceProtocol: 'esriRest',
          },
        ])
        fixture.detectChanges()
      })
      it('emits download links once per format', fakeAsync(() => {
        let downloadLinks = []
        component.links$.subscribe((links: DatasetDistribution[]) => {
          downloadLinks = links
        })
        tick(200)
        expect(downloadLinks).toEqual([
          {
            description: 'Lieu de surveillance (point)',
            name: 'surval_parametre_point.csv',
            url: newUrl('https://www.ifremer.fr/surval_parametre_point.csv'),
            type: 'download',
          },
          {
            description: 'Lieu de surveillance (ligne)',
            mimeType: 'text/csv',
            name: 'surval_parametre_ligne',
            url: newUrl(
              'https://www.ifremer.fr/services/wfs/surveillance_littorale'
            ),
            type: 'service',
            accessServiceProtocol: 'wfs',
          },
          {
            description: 'ArcGIS GeoService Wfs',
            mimeType: 'text/csv',
            name: 'mes_hdf',
            url: newUrl(
              'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf/WFSServer/0'
            ),
            type: 'service',
            accessServiceProtocol: 'wfs',
          },
          {
            description: 'Lieu de surveillance (polygone)',
            name: 'surval_parametre_polygone.geojson',
            url: newUrl(
              'https://www.ifremer.fr/surval_parametre_polygone.geojson'
            ),
            type: 'download',
          },
          {
            description: 'Lieu de surveillance (ligne)',
            name: 'surval_parametre_ligne',
            mimeType: 'application/geo+json',
            url: newUrl(
              'https://www.ifremer.fr/services/wfs/surveillance_littorale'
            ),
            type: 'service',
            accessServiceProtocol: 'wfs',
          },
          {
            description: 'ArcGIS GeoService Wfs',
            mimeType: 'application/geo+json',
            name: 'mes_hdf',
            url: newUrl(
              'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf/WFSServer/0'
            ),
            type: 'service',
            accessServiceProtocol: 'wfs',
          },
          {
            description: 'ArcGIS GeoService',
            mimeType: 'application/json',
            name: 'mes_hdf_journalier_poll_princ',
            url: newUrl(
              'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf_journalier_poll_princ/FeatureServer/0/query?f=json&where=1=1&outFields=*'
            ),
            type: 'service',
            accessServiceProtocol: 'esriRest',
          },
          {
            description: 'ArcGIS GeoService',
            mimeType: 'application/geo+json',
            name: 'mes_hdf_journalier_poll_princ',
            url: newUrl(
              'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf_journalier_poll_princ/FeatureServer/0/query?f=geojson&where=1=1&outFields=*'
            ),
            type: 'service',
            accessServiceProtocol: 'esriRest',
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
            url: newUrl('https://www.ifremer.fr/data.kml'),
            type: 'download',
          },
          {
            description: 'Lieu de surveillance (point)',
            name: 'surval_parametre_point.csv',
            url: newUrl('https://www.ifremer.fr/surval_parametre_point.csv'),
            type: 'download',
          },
          {
            description: 'pdf file',
            name: 'abc.pdf',
            url: newUrl('https://www.ifremer.fr/file.pdf'),
            type: 'download',
          },
          {
            description: 'Lieu de surveillance (polygone)',
            name: 'surval_parametre_polygone.geojson',
            url: newUrl(
              'https://www.ifremer.fr/surval_parametre_polygone.geojson'
            ),
            type: 'download',
          },
          {
            description: 'excel data',
            name: 'data.xls',
            url: newUrl('https://www.ifremer.fr/data.excel'),
            type: 'download',
          },
        ])
        fixture.detectChanges()
      })
      it('sorts links', fakeAsync(() => {
        let downloadLinks = []
        component.links$.subscribe((links: DatasetDistribution[]) => {
          downloadLinks = links
        })
        tick(200)
        expect(downloadLinks).toEqual([
          {
            description: 'Lieu de surveillance (point)',
            name: 'surval_parametre_point.csv',
            url: newUrl('https://www.ifremer.fr/surval_parametre_point.csv'),
            type: 'download',
          },
          {
            description: 'excel data',
            name: 'data.xls',
            url: newUrl('https://www.ifremer.fr/data.excel'),
            type: 'download',
          },
          {
            description: 'Lieu de surveillance (polygone)',
            name: 'surval_parametre_polygone.geojson',
            url: newUrl(
              'https://www.ifremer.fr/surval_parametre_polygone.geojson'
            ),
            type: 'download',
          },
          {
            description: 'KML Data',
            name: 'abc.kml',
            url: newUrl('https://www.ifremer.fr/data.kml'),
            type: 'download',
          },
          {
            description: 'pdf file',
            name: 'abc.pdf',
            url: newUrl('https://www.ifremer.fr/file.pdf'),
            type: 'download',
          },
        ])
      }))
    })
  })
})
