import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { Subject } from 'rxjs'
import { MdViewFacade } from '../state'
import { DataDownloadsComponent } from './data-downloads.component'
import { MetadataLink } from '@geonetwork-ui/util/shared'
import { Component, Input } from '@angular/core'
import { By } from '@angular/platform-browser'
import * as utils from '@geonetwork-ui/feature/search'

class MdViewFacadeMock {
  downloadLinks$ = new Subject()
}

@Component({
  selector: 'gn-ui-downloads-list',
  template: '<div></div>',
})
export class MockDownloadsListComponent {
  @Input() links: MetadataLink[]
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
        MockDownloadsListComponent,
        MockPopupAlertComponent,
      ],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)

    jest.spyOn(utils, 'getLinksWithWfsFormats').mockImplementation((link) =>
      Promise.resolve([
        {
          ...link,
          format: 'geojson',
        },
        {
          ...link,
          format: 'geojson',
        },
        {
          ...link,
          format: 'csv',
        },
        {
          ...link,
          format: 'gml',
        },
      ])
    )
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
    let downloadsListComponent: MockDownloadsListComponent

    beforeEach(() => {
      downloadsListComponent = fixture.debugElement.query(
        By.directive(MockDownloadsListComponent)
      ).componentInstance
    })

    describe('when the WFS service fails', () => {
      beforeEach(fakeAsync(() => {
        jest
          .spyOn(utils, 'getLinksWithWfsFormats')
          .mockImplementation(() =>
            Promise.reject(new Error('Something bad happened'))
          )
        facade.downloadLinks$.next([
          {
            description: 'Lieu de surveillance (point)',
            name: 'surval_parametre_point.csv',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/surval_parametre_point.csv',
          },
          {
            description: 'Lieu de surveillance (ligne)',
            name: 'surval_parametre_ligne',
            protocol: 'OGC:WFS',
            url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
          },
        ])
        tick()
        fixture.detectChanges()
      }))
      it('emits the other links', () => {
        expect(downloadsListComponent.links).toEqual([
          {
            description: 'Lieu de surveillance (point)',
            name: 'surval_parametre_point.csv',
            format: 'csv',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/surval_parametre_point.csv',
          },
        ])
      })
      it('shows an error', () => {
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
        expect(downloadsListComponent.links).toEqual([])
      })
    })

    describe('with links compatible with DOWNLOAD usage', () => {
      beforeEach(fakeAsync(() => {
        facade.downloadLinks$.next([
          {
            description: 'Lieu de surveillance (point)',
            name: 'surval_parametre_point.csv',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/surval_parametre_point.csv',
          },
          {
            description: 'Lieu de surveillance (polygone)',
            name: 'surval_parametre_polygone.geojson',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/surval_parametre_polygone.geojson',
          },
          {
            description: 'Lieu de surveillance (ligne)',
            name: 'surval_parametre_ligne',
            protocol: 'OGC:WFS',
            url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
          },
          {
            protocol: 'ESRI:REST',
            name: 'mes_hdf',
            format: 'arcgis geoservices rest api',
            description: 'ArcGIS GeoService Wfs',
            mediaType: 'application/json',
            url: 'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf/WFSServer/0',
          },
          {
            protocol: 'ESRI:REST',
            name: 'mes_hdf_journalier_poll_princ',
            format: 'arcgis geoservices rest api',
            description: 'ArcGIS GeoService',
            mediaType: 'application/json',
            url: 'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf_journalier_poll_princ/FeatureServer/0',
          },
        ])
        tick()
        fixture.detectChanges()
      }))
      it('emits download links once per format', () => {
        expect(downloadsListComponent.links).toEqual([
          {
            description: 'Lieu de surveillance (point)',
            name: 'surval_parametre_point.csv',
            format: 'csv',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/surval_parametre_point.csv',
          },
          {
            description: 'Lieu de surveillance (polygone)',
            name: 'surval_parametre_polygone.geojson',
            format: 'geojson',
            protocol: 'WWW:DOWNLOAD',
            url: 'https://www.ifremer.fr/surval_parametre_polygone.geojson',
          },
          {
            description: 'Lieu de surveillance (ligne)',
            name: 'surval_parametre_ligne',
            format: 'WFS:geojson',
            protocol: 'OGC:WFS',
            url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
          },
          {
            description: 'Lieu de surveillance (ligne)',
            name: 'surval_parametre_ligne',
            format: 'WFS:csv',
            protocol: 'OGC:WFS',
            url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
          },
          {
            protocol: 'ESRI:REST',
            name: 'mes_hdf',
            format: 'WFS:geojson',
            description: 'ArcGIS GeoService Wfs',
            mediaType: 'application/json',
            url: 'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf/WFSServer/0',
          },
          {
            protocol: 'ESRI:REST',
            name: 'mes_hdf',
            format: 'WFS:csv',
            description: 'ArcGIS GeoService Wfs',
            mediaType: 'application/json',
            url: 'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf/WFSServer/0',
          },
          {
            protocol: 'ESRI:REST',
            name: 'mes_hdf_journalier_poll_princ',
            format: 'REST:json',
            description: 'ArcGIS GeoService',
            mediaType: 'application/json',
            url: 'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf_journalier_poll_princ/FeatureServer/0/query?f=json&where=1=1&outFields=*',
          },
          {
            protocol: 'ESRI:REST',
            name: 'mes_hdf_journalier_poll_princ',
            format: 'REST:geojson',
            description: 'ArcGIS GeoService',
            mediaType: 'application/json',
            url: 'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/mes_hdf_journalier_poll_princ/FeatureServer/0/query?f=geojson&where=1=1&outFields=*',
          },
        ])
      })
    })
  })
})
