import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { BehaviorSubject, of, throwError } from 'rxjs'
import { RecordDownloadsComponent } from './record-downloads.component'
import { By } from '@angular/platform-browser'
import { DataService } from '@geonetwork-ui/feature/dataviz'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { MockBuilder } from 'ng-mocks'
import { PopupAlertComponent } from '@geonetwork-ui/ui/widgets'

// This is used to work around this issue with URL in JSDom:
// https://github.com/jestjs/jest/issues/14012
const newUrl = (url: string) => {
  const obj = new URL(url)
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  obj.searchParams // calling the getter once to fill query params
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
  getDownloadLinksFromOgcApiFeatures = jest.fn((link) =>
    link.url.toString().indexOf('error') > -1
      ? Promise.reject(new Error('ogc.unreachable.unknown'))
      : Promise.resolve([
          {
            ...link,
            title: 'collection1',
            mimeType: 'application/geo+json',
          },
          {
            ...link,
            title: 'collection2',
            mimeType: 'application/json',
          },
        ])
  )
}

describe('RecordDownloadsComponent', () => {
  let component: RecordDownloadsComponent
  let fixture: ComponentFixture<RecordDownloadsComponent>
  let facade

  beforeEach(() => MockBuilder(RecordDownloadsComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordDownloadsComponent)
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
        component.links$.subscribe((links: DatasetOnlineResource[]) => {
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
          By.directive(PopupAlertComponent)
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
        component.links$.subscribe((links: DatasetOnlineResource[]) => {
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
          {
            name: 'Surveillance littorale OGC',
            description: 'OGC API service',
            url: newUrl(
              'https://demo.ldproxy.net/zoomstack/collections/airports/items'
            ),
            type: 'service',
            accessServiceProtocol: 'ogcFeatures',
          },
          {
            name: 'Some erroneous OGC API service',
            description: 'OGC API service',
            url: newUrl('https://error.org/collections/airports/items'),
            type: 'service',
            accessServiceProtocol: 'ogcFeatures',
          },
        ])
        fixture.detectChanges()
      })
      it('emits download links once per format', fakeAsync(() => {
        let downloadLinks = []
        component.links$.subscribe((links: DatasetOnlineResource[]) => {
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
            description: 'OGC API service',
            mimeType: 'application/geo+json',
            name: 'Surveillance littorale OGC',
            title: 'collection1',
            url: newUrl(
              'https://demo.ldproxy.net/zoomstack/collections/airports/items'
            ),
            type: 'service',
            accessServiceProtocol: 'ogcFeatures',
          },
          {
            description: 'OGC API service',
            mimeType: 'application/json',
            name: 'Surveillance littorale OGC',
            title: 'collection2',
            url: newUrl(
              'https://demo.ldproxy.net/zoomstack/collections/airports/items'
            ),
            type: 'service',
            accessServiceProtocol: 'ogcFeatures',
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
        component.links$.subscribe((links: DatasetOnlineResource[]) => {
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
